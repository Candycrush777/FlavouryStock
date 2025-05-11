const db = require("../config/bd");

exports.getAllRecipes = (req, res) => {
 
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  
  const countQuery = "SELECT COUNT(*) AS total From recetas";

  
  const dataQuery = "SELECT * FROM recetas LIMIT ? OFFSET ?";

  
  db.query(countQuery, (err, countResult) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }

    const total = countResult[0].total;
    const totlaPages = Math.ceil(total / limit);

    db.query(dataQuery, [limit, offset], (err, dataResult) => {
      if (err) {
        return res.status(500).json({ Error: err.message });
      }

      if (dataResult === 0) {
        return res.status(404).json({ Error: "Receta no encontrada" });
      }

      res.status(200).json({
        total,
        totlaPages,
        currentPage: page,
        limit,
        recetas: dataResult,
      });
    });
  });}

exports.registerRecipe = (req, res) => {
    const { nombre, descripcion, paso_paso, tiempo_preparacion, categoria, estacion } = req.body;

 
    const imagen = "/defaultImage.jpg";
 
 
    if (
      !nombre ||
      !descripcion ||
      !tiempo_preparacion ||
      !categoria ||
      !estacion
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    } 
 
    const insertQuery = `
      INSERT INTO recetas (nombre, imagen, descripcion, paso_paso,tiempo_preparacion, categoria, estacion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
 
    db.query(
      insertQuery,
      [nombre, imagen, descripcion, paso_paso, tiempo_preparacion, categoria, estacion],
      (err, result) => {
        if (err) {
          console.log("Nombre", nombre);
          
          
          console.log("Error sacado en recipe controller.js");
          
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          message: "Receta creada correctamente",
          result
        });
      }
    );
};

exports.getRecipeById = (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM vista_receta_detalle WHERE receta_id = ?";

    db.query(selectQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length == 0) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }

      res.status(200).json(result[0]);
    });
};

exports.searchRecipeName = (req, res) =>{
    const nombre = req.query.nombre
    
    if (!nombre) {
      return res.status(400).json({error: 'Falta el parametro nombre'})
    }

    const sql = 'SELECT * FROM recetas WHERE nombre LIKE ?'

    db.query(sql, [`%${nombre}%`], (err, result) => {
      if (err) {
        return res.status(500).json({error: err.message})
      }else if (result.length === 0) {
        return res.status(404).json({message: 'No se encontraron recetas con ese nombre'})
      }

      res.status(200).json(result)
    })
}

exports.getRecipesByIdIngredient = (req, res)=>{
    const id = req.params.id
    const sql = ` SELECT r.id_receta, r.nombre, r.imagen, r.descripcion, r.tiempo_preparacion, r.categoria, i.id_ingrediente
                  FROM recetas r
                  LEFT JOIN ingredientes_de_receta i
                  USING(id_receta)
                  WHERE i.id_ingrediente = ?
                  GROUP BY r.nombre, r.imagen, r.descripcion, r.tiempo_preparacion, r.categoria, i.id_ingrediente
                  ;`

    db.query(sql,[id],(err,result)=>{

      if(err){
        return res.status(500).json({error: err.message})
      }else if(result.length===0){
        return res.status(404).json({error: "Recetas no encontradas,(controller)"})
      }else{
        res.status(200).json({result})
      }

    })
}

exports.updateRecipe = (req, res) => {

    const { nombre, imagen, descripcion, paso_paso, tiempo_preparacion, categoria, estacion} = req.body
    const idReceta = req.params.id;


    sql = `
    UPDATE recetas
    SET nombre = ?, imagen = ?, descripcion = ?, paso_paso = ?, tiempo_preparacion = ?, categoria = ?, estacion = ?
    WHERE id_receta = ?
  `
    db.query(sql,[nombre, imagen, descripcion, paso_paso, tiempo_preparacion, categoria, estacion, idReceta],(err,result)=>{
      if(err){
        return res.status(500).json({ error: err.message });
      }else if(result.affectedRows===0){
        return res.status(404).json({ error: "No se actualizó la receta" });
      }else{
        res.status(200).json({ message: "Receta actualizada correctamente" });
      }
    })

}


exports.deleteRecipe = (req, res) => {
    const id = req.params.id;
    const deleteQuery = "DELETE FROM recetas WHERE id_receta = ?";
  
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Receta no encontrada o ya eliminada" });
      }
      res.status(200).json({ message: "Receta eliminada correctamente" });
    });
  };



exports.getAllRecipesList = (req, res) => {


    const sql = "SELECT * FROM recetas";

  db.query(sql, (err, dataResult) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }

    if (dataResult.length === 0) {
      return res.status(404).json({ Error: "No se encontraron recetas" });
    }

    res.status(200).json({
      total: dataResult.length,
      recetas: dataResult,
    });
  });
}
  









