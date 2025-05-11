
const db = require("../config/bd") 



// ingredient.controller.js

exports.registerBasket = async (req, res) => {
    try {
      const fechaEtiqueta = new Date();
     
      const { id_ingrediente, cantidad_almacen, cantidad_nevera, cantidad_congelador,id_usuario } = req.body;
  
      // obtenemos caducidades (pueden venir null)
      const caducidades = await obtenerCaducidad(db, id_ingrediente);
      console.log('Caducidades antes de fallback:', caducidades);
  
      const insertarEtiquetaFunct = (lugar_almacen, cantidad, diasCaducidad) => {
        // sólo chequeamos cantidad
        if (cantidad > 0) {
          // fallback: si caducidad es null|undefined, pongo 0 días
          const dias = diasCaducidad ?? 0;
  
          const fecha_caducidad = new Date(fechaEtiqueta);
          fecha_caducidad.setDate(fechaEtiqueta.getDate() + dias);
  
          console.log(`Insertando ${cantidad} en ${lugar_almacen} con diasCaducidad=${dias}`);
  
          const sql = `
            INSERT INTO etiquetas
              (id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          db.query(
            sql,
            [id_ingrediente, id_usuario, fechaEtiqueta, lugar_almacen, fecha_caducidad, cantidad],
            (err, result) => {
              if (err) {
                console.error(`Error al insertar etiqueta de ${lugar_almacen}:`, err);
                return res.status(500).json({ error: err.message });
              }
              console.log(`✔ Etiquetas generadas para ${lugar_almacen}`);
            }
          );
        }
      };
  
      // llamamos siempre las tres, aunque caducidad sea null
      insertarEtiquetaFunct("almacen",   cantidad_almacen,   caducidades.almacen);
      insertarEtiquetaFunct("nevera",    cantidad_nevera,    caducidades.nevera);
      insertarEtiquetaFunct("congelador",cantidad_congelador,caducidades.congelador);
  
      // respondemos – el INSERT ocurre (o no) dentro del callback
      return res.status(200).json({ message: 'Etiquetas generadas en BD correctamente' });
    } catch (error) {
      console.error("Error al registrar las etiquetas:", error);
      return res.status(500).json({ error: error.message || "Error al procesar la solicitud" });
    }
  };


exports.getAllIngredients = (req, res)=>{
    const sql= "SELECT * FROM Ingredientes"
    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
        if(result.length===0){
            return res.status(404).json({error: 'Ingrediente no encontrado'})
        }
        res.status(200).json(result)
    })
}

exports.getIngredientById = (req,res)=>{
    const ingredientId = req.params.id
    sql = "SELECT * FROM ingredientes WHERE id_ingrediente = "+ ingredientId
    db.query(sql, (err, result)=>{

        if (err) {
            console.error("Error completo:", err);
            return res.status(500).json({error: err.message})
        }
        if(result.length=== 0){
            return res.status(404).json({error: "Ingrediente no encontrado"})
        }
        res.status(200).json(result[0])
    })

}

exports.getIngredientsByCategory = (req, res)=>{
    const category = req.params.category
    sql = `SELECT * FROM ingredientes WHERE categoria = ${category}`

    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
        if(result.length===0){
            return res.status(404).json({error: "Ingredientes por categoria no encontrados"})
        }
        res.status(200).json(result)
    })

}

exports.getIngredientByNombre = (req, res)=>{
    const nombre = req.params.nombre
    sql = `SELECT * FROM ingredientes WHERE nombre = ${nombre}`

    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
        if(result.length===0){
            return res.status(404).json({error:"El ingrediente no encontrado o está mal escrito"})
        }
        res.status(200).json(result)
        
    })
}

exports.updateIngredient = (req,res)=>{
    const {nombre, categoria, imagen, unidad_medida, caducidad_almacen, caducidad_nevera, caducidad_congelador}= req.body
    const id_ingrediente= req.params.id_ingrediente

    sql="UPDATE Ingredientes "+
    "SET nombre = ?, categoria = ?, imagen = ?, unidad_medida = ?, caducidad_almacen = ?, caducidad_nevera = ?, caducidad_congelador = ? "+
    `WHERE id_ingrediente = ${id_ingrediente}`

    db.query(sql,[nombre, categoria, imagen, unidad_medida, caducidad_almacen, caducidad_nevera, caducidad_congelador, id_ingrediente],(err, result)=>{
        if (err){
            console.error("Error completo:", err);
            return res.status(500).json({error: err.message})
        }
        else if (result.affectedRows===0){
            return res.status(404).json({error: "No se realizaron los cambios en Ingrediente"})
        }else{

            res.status(200).json({result, message: "Ingrediente actualizado correctamente"})
        }
    })
}

async function obtenerCaducidad(db, ingredienteId){
    return new Promise((resolve,reject)=>{
        const sql="SELECT caducidad_almacen, caducidad_nevera, caducidad_congelador FROM ingredientes WHERE id_ingrediente = ?"
        db.query(sql, [ingredienteId], (err, result)=>{
            if (err){
                reject(err)
            }else if(result.length===0){
                reject({message: "Ingrediente no encontrado"})
            }else{
                resolve({
                    almacen: result[0].caducidad_almacen,
                    nevera: result[0].caducidad_nevera,
                    congelador: result[0].caducidad_congelador
                })
            }
        })
    })

}

