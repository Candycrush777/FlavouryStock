const db = require('../config/bd')

exports.getEtiquetas = (req,res)=>{
    sql= "SELECT * FROM vista_etiqueta_detalle"
    db.query(sql,(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if(result.length===0){
            return res.status(404).json({error: "Etiquetas no encontradas"})
        }else{
            res.status(200).json({result})
        }
    })
}

exports.getCaducado=(req, res)=>{
    sql= "SELECT * FROM vista_etiqueta_detalle WHERE (fecha_caducidad - CURRENT_DATE) <0"
    db.query(sql,(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if(result.length===0){
            return res.status(404).json({error: "Etiquetas no encontradas"})
        }else{
            res.status(200).json({result})
        }
    })
}

exports.getCaducaPronto = (req, res)=>{
    sql= "SELECT * FROM vista_etiqueta_detalle WHERE (fecha_caducidad - CURRENT_DATE) >= 4 AND (fecha_caducidad - CURRENT_DATE) <= 7;"
    db.query(sql,(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if(result.length===0){
            return res.status(404).json({error: "Etiquetas no encontradas"})
        }else{
            res.status(200).json({result})
        }
    })
}


exports.getCaducaMuyPronto = (req, res)=>{
    sql= "SELECT * FROM vista_etiqueta_detalle WHERE (fecha_caducidad - CURRENT_DATE) <= 3 AND (fecha_caducidad - CURRENT_DATE) >= 0;"
    db.query(sql,(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if(result.length===0){
            return res.status(404).json({error: "Etiquetas no encontradas"})
        }else{
            res.status(200).json({result})
        }
    })
}



//todo crear vista de detalle recetas, que contenga al menos 1 ingredientes a caducar

exports.getRecetasPosibles = (req,res)=>{
    sql=`SELECT DISTINCT
    vrd.receta_id,
    vrd.receta_nombre,A
    vrd.receta_descripcion,
    vrd.receta_paso_paso,
    vrd.receta_tiempo_preparacion,
    vrd.receta_categoria,
    vrd.ingredientes_formato
FROM
    vista_receta_detalle vrd
JOIN
    ingredientes_de_receta ir ON vrd.receta_id = ir.id_receta
JOIN
    ingredientes i ON ir.id_ingrediente = i.id_ingrediente
JOIN
    etiquetas e ON i.id_ingrediente = e.id_ingrediente
WHERE
    e.fecha_caducidad >= CURRENT_DATE AND e.fecha_caducidad <= DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY);`
    db.query(sql, (err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if (result.length===0){
            return res.status(404).json({error: "No hay alimentos proximos a caducar, no se pueden sugerir recetas"})
        }else{
            return res.status(200).json({result})
        }
    })
}

exports.getRecetasPosiblesIdIng = (req, res)=>{
const {id} =req.params

    sql=`SELECT DISTINCT
            vrd.receta_id,
            vrd.receta_nombre,
            vrd.receta_descripcion,
            vrd.receta_paso_paso,
            vrd.receta_tiempo_preparacion,
            vrd.receta_categoria,
            vrd.ingredientes_formato
        FROM
            vista_receta_detalle vrd
        JOIN
            ingredientes_de_receta ir ON vrd.receta_id = ir.id_receta
        JOIN
            ingredientes i ON ir.id_ingrediente = i.id_ingrediente
        JOIN
            etiquetas e ON i.id_ingrediente = e.id_ingrediente
        WHERE
        e.fecha_caducidad >= CURRENT_DATE
        AND e.fecha_caducidad <= DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY)
        AND i.id_ingrediente = ?;`
        
    db.query(sql, [id],(err,result)=>{
        if (err){
            return res.status(500).json({error: err.message})
        }else if (result.length===0){
            return res.status(404).json({error: "No hay alimentos proximos a caducar con este Ingred, no se pueden sugerir recetas"})
        }else{
            return res.status(200).json({result})
        }
    })
}

//todo para caducado, crear una tabla que almacene etiquetas desechadas, y sean eliminadas de etiquetas normales

exports.buscarEtiquetas = (req, res) => {
    const busquedaNombre = req.query.busqueda || "";
    const valorLike = `%${busquedaNombre}%`;
  
    const sql = `
    SELECT
      e.id_etiqueta,
      e.id_ingrediente,
      i.nombre AS nombre,            
      i.categoria,
      i.unidad_medida,
      e.id_usuario,
      e.fecha_etiquetado,
      e.lugar_almacen,
      e.fecha_caducidad,
      e.cantidad
    FROM etiquetas e
    JOIN ingredientes i
      ON e.id_ingrediente = i.id_ingrediente
    WHERE i.nombre LIKE ?
    ORDER BY e.fecha_etiquetado DESC
  `;
  
    db.query(sql, [valorLike], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (result.length === 0) {
        return res.status(404).json({
          error: "No se encontraron etiquetas que coincidan con la búsqueda"
        });
      }
  
      res.status(200).json(result);
    });
  };