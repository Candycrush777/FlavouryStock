//const result = require("underscore/cjs/result.js")
const db = require("../config/bd") //importar la conex
//const { default: Ingrediente } = require("../models/ingredient.model")

/* AQUI VAN TODAS LAS FUNCIONES A USAR DEL CRUD */

//funcion para registrar productos adquiridos recientemente

exports.registerBasket = (req, res) => {
  // req es el request, peticion HTTP que el servidor recibe del cliente (front)

  // res el response, representa la respuesta HTTP que server envia al front

  //todo esta funcion lo que hace es generar una etiqueta del producto
  //al clicar el boton enviar, guarda los  datos en estas variables, y acto seguido lanza las querys
  const {
    id_ingrediente,
    cantidad_almacen,
    cantidad_nevera,
    cantidad_congelador
  } = req.body
  const usuarioActivo = null
  const fechaActual = new Date()

  //Para obtener las caducidades desde la db
  /* let caducidadAlmacen = fechaActual - Ingrediente.caducidad_almacen 
    let caducidadNevera = fechaActual - Ingrediente.caducidad_nevera 
    let caducidadCongelador = fechaActual - Ingrediente.caducidad_congelador  */

  db.query(
    "SELECT caducidad_almacen, caducidad_nevera, caducidad_congelador FROM Ingredientes WHERE id = ?",
    [id_ingrediente],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Ingrediente no encontrado" })
      }

      const ingrediente = results[0]
      const caducidadAlmacen = new Date(
        fechaActual.getTime() +
          ingrediente.caducidad_almacen * 24 * 60 * 60 * 1000
      ) // Ejemplo: caducidad en días
      const caducidadNevera = new Date(
        fechaActual.getTime() +
          ingrediente.caducidad_nevera * 24 * 60 * 60 * 1000
      )
      const caducidadCongelador = new Date(
        fechaActual.getTime() +
          ingrediente.caducidad_congelador * 24 * 60 * 60 * 1000
      )

      if (cantidad_almacen > 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
        ;("( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)")
        ;("VALUES (?,?,?,?,?,?)")
        db.query(
          sql1,
          [
            id_ingrediente,
            usuarioActivo,
            fechaActual,
            "almacen",
            caducidadAlmacen,
            cantidad_almacen
          ],
          (err, result) => {
            if (err) {
              return res.status(500).json({ erro: err.message })
            }
            res.status(201).json({ message: "Etiqueta generada correctamente" })
          }
        )
      }
      if (cantidad_nevera > 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
        ;("( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)")
        ;("VALUES (?,?,?,?,?,?)")
        db.query(
          sql1,
          [
            id_ingrediente,
            usuarioActivo,
            fechaActual,
            "nevera",
            caducidadNevera,
            cantidad_almacen
          ],
          (err, result) => {
            if (err) {
              return res.status(500).json({ erro: err.message })
            }
            res.status(201).json({ message: "Etiqueta generada correctamente" })
          }
        )
      }
      if (cantidad_congelador > 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
        ;("( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)")
        ;("VALUES (?,?,?,?,?,?)")
        db.query(
          sql1,
          [
            id_ingrediente,
            usuarioActivo,
            fechaActual,
            "congelador",
            caducidadCongelador,
            cantidad_almacen
          ],
          (err, result) => {
            if (err) {
              return res.status(500).json({ erro: err.message })
            }
            res.status(201).json({ message: "Etiqueta generada correctamente" })
          }
        )
      }
    }
  )
}

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
    /* CATEGORIAS ACTUALES, no son una clase aún:
    aceites, bebidas, carnes, cereales, condimentos, dulces, 
    endulzantes, especias, frutas, frutos secos, hongos, 
    huevos, lácteos, legumbres, panadería, pescados, salsas, 
    tortillas, tubérculos, vegano, y vegetales.
    */
    const category = req.params.category
    sql = `SELECT * FROM ingredientes WHERE categoria = ${category}`

    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
        if(result.length===0){
            return res.status(404).json({eror: "Ingredientes por categoria no encontrados"})
        }
        res.status(200).json(result)
    })

}

exports.updateIngredient = (req,res)=>{
    const {nombre, categoria, imagen, unidad_medida, caducidad_almacen, caducidad_nevera, caducidad_congelador}= req.body
    const{ id_ingrediente}= req.params.id_ingrediente

    sql="UPDATE Ingredientes "+
    "SET nombre = ?, categoria = ?, imagen = ?, unidad_medida = ?, caducidad_almacen = ?, caducidad_nevera = ?, caducidad_congelador = ? "+
    `WHERE id_ingrediente = ${id_ingrediente}`

    //ojo meterle id_ingrediente al array...esto en orden 
    db.query(sql,[nombre, categoria, imagen, unidad_medida, caducidad_almacen, caducidad_nevera, caducidad_congelador, id_ingrediente],(err, result)=>{
        if (err){
            console.error("Error completo:", err);
            return res.status(500).json({error: err.message})
        }
        if (result.affectedRows===0){
            return res.status(404).json({error: "No se realizaron los cambios en Ingrediente"})
        }
        res.status(200).json({message: "Ingrediente actualizado correctamente"})
    })
}