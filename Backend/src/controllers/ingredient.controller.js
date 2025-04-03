//const result = require("underscore/cjs/result.js")
const db = require("../config/bd") //importar la conex
//const { default: Ingrediente } = require("../models/ingredient.model")

/* AQUI VAN TODAS LAS FUNCIONES A USAR DEL CRUD */

//funcion para registrar productos adquiridos recientemente

exports.registerBasket = (req, res) =>{//todo hay que modificar el user_activo
    const fechaEtiqueta = new Date
    const id_usuario = 3
    const {id_ingrediente, cantidad_almacen,cantidad_nevera, cantidad_congelador } = req.body

    const insertarEtiquetaFunct = (lugar_almacen, cantidad)=>{
        if (cantidad>0) {
             // todo calcular sumandole los dias ( sacados de otra consulta en id_ing.lugar)
            const fecha_caducidad = new Date

            const sql = "INSERT INTO etiquetas "+ 
            "(id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad) "+
            `VALUES(?,?,?,?,?,?)`
            db.query(sql, [id_ingrediente, id_usuario, fechaEtiqueta, lugar_almacen, fecha_caducidad, cantidad], (err, result)=>{
                if (err) {
                    console.log("Error completo:"+ err)
                    return res.status(500).json({error: err.message})
                }else if(result.affectedRows===0){
                    return res.status(404).json({err:"No se han insertado los datos en Etiqueta"})
                }else{
                    res.status(200).json({message:` Etiquetas generadas en BD correctamente`})
                }
            }) 
        }
        
        
        
        //res.status(200).json({message:` Etiquetas generada para ${lugar_almacen} en BD correctamente`})
    }
        insertarEtiquetaFunct("almacen", cantidad_almacen)
        insertarEtiquetaFunct("nevera", cantidad_nevera)
        insertarEtiquetaFunct("congelador", cantidad_congelador)
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

    //ojo meterle id_ingrediente al array...esto en orden 
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