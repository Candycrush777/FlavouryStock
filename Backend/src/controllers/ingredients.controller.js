const result = require('underscore/cjs/result.js')
const db = require('../config/bd')//importar la conex
const { default: Ingrediente } = require('../models/ingredient.model')

/* AQUI VAN TODAS LAS FUNCIONES A USAR DEL CRUD */

//funcion para registrar productos adquiridos recientemente

exports.registerBasket = (req, res)=>{
    /* req es el request, peticion HTTP que el servidor recibe 
    del cliente (front)
    */    

    /* 
    res el response, representa la respuesta HTTP que server 
    envia al front
    */
    //todo esta funcion lo que hace es generar una etiqueta del producto
    const {id_ingrediente, cantidad_almacen, cantidad_nevera, cantidad_congelador}=req.body
    const usuarioActivo=null
    const fechaActual=new Date()
    let caducidadAlmacen = fechaActual - Ingrediente.caducidad_almacen 
    let caducidadNevera = fechaActual - Ingrediente.caducidad_nevera 
    let caducidadCongelador = fechaActual - Ingrediente.caducidad_congelador 
    
    if (cantidad_almacen> 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
                        "( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)"
                        "VALUES (?,?,?,?,?,?)"
        db.query(sql1, [id_ingrediente, usuarioActivo, fechaActual, "almacen", caducidadAlmacen, cantidad_almacen], (err, result)=>{

            if(err){
                return res.status(500).json({erro: err.message})
            }
            res.status(201).json({message: "Etiqueta generada correctamente"})
        })
    }
    if (cantidad_nevera> 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
                        "( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)"
                        "VALUES (?,?,?,?,?,?)"
        db.query(sql1, [id_ingrediente, usuarioActivo, fechaActual, "almacen", caducidadNevera, cantidad_almacen], (err, result)=>{

            if(err){
                return res.status(500).json({erro: err.message})
            }
            res.status(201).json({message: "Etiqueta generada correctamente"})
        })
    }
    if (cantidad_congelador> 0) {
        //todo aqui recoger el usuario activo
        const sql1 = "INSERT INTO Etiquetas "
                        "( id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)"
                        "VALUES (?,?,?,?,?,?)"
        db.query(sql1, [id_ingrediente, usuarioActivo, fechaActual, "almacen", caducidadCongelador, cantidad_almacen], (err, result)=>{

            if(err){
                return res.status(500).json({erro: err.message})
            }
            res.status(201).json({message: "Etiqueta generada correctamente"})
        })
    }


}