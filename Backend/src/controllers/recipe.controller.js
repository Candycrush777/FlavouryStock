const db = require("../config/bd");

exports.getAllRecipes = (req, res) => {
  /*Para probar en POSTMAN 
  http://localhost:3000/api/recipes/getRecipes?page=1&limit=6*/
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  //consulta para obtener el total de recetas
  const countQuery = "SELECT COUNT(*) AS total From recetas";

  //consulta para obtener las recetas pagonadas
  const dataQuery = "SELECT * FROM recetas LIMIT ? OFFSET ?";

  //primero obtenemos el total de las recetas
  db.query(countQuery, (err, countResult) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }

    const total = countResult[0].total;
    const totlaPages = Math.ceil(total / limit);

    //obtenemos las recetas paginada
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
 
    // momentaneo, hasta decidir donde guardar las imagenes
 
    const imagen = "ruta/por/cualquierruta.jpg";
 
    // tiene que rellenar todos los campos obligatorio
 
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

  //Obtener una receta por ID

  exports.getRecipeById = (req, res) => {
    const id = req.params.id;
    const selectQuery = "SELECT * FROM vista_receta_detalle WHERE receta_id = ?";

    db.query(selectQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).jason({ error: err.message });
      }
      if (result.length == 0) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }

      res.status(200).json(result[0]);
    });
  };

  //Actualizar una receta, puede dejar campos sin rellenar, y solo se deberia actualizar los campos rellenos

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

// Eliminar una receta
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









