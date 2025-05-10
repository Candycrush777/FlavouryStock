//const result = require("underscore/cjs/result.js")
const db = require("../config/bd") //importar la conex
//const { ingredienteModel: Ingrediente } = require("../models/ingredient.model")

/* AQUI VAN TODAS LAS FUNCIONES A USAR DEL CRUD */

//funcion para registrar productos adquiridos recientemente

exports.registerBasket2 = (req, res) =>{//todo original sin fechas calculadas
// todo: hay que modificar el user_activo, 
// todo: quizas cambiar id_ingrediente, por nombre 
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
  


  /* exports.registerBasket = async (req, res) =>{//todo ver posibles cambios dentro de la funct. NECESITA EL ASYNC
    // todo: hay que modificar el user_activo, 
    // todo: quizas cambiar id_ingrediente, por nombre 
    // esta funcion necesita para postman id_ingrediente, y cantidades
    try{

        const fechaEtiqueta = new Date
        const id_usuario = 3
        const {id_ingrediente, cantidad_almacen,cantidad_nevera, cantidad_congelador } = req.body
    
            //aqui llamamos a la funcion de calculo de fechas
        const caducidades = await obtenerCaducidad(db,id_ingrediente)
        console.log(caducidades) 

        const insertarEtiquetaFunct = (lugar_almacen, cantidad,diasCaducidad)=>{
            if (cantidad>0 && diasCaducidad !== null && diasCaducidad !== undefined) {
                 // todo calcular sumandole los dias ( sacados de otra consulta en id_ing.lugar)
                const fecha_caducidad = new Date(fechaEtiqueta)
                fecha_caducidad.setDate(fecha_caducidad.getDate()+ diasCaducidad)

                console.log(`Insertando ${cantidad} en ${lugar_almacen} con diasCaducidad=`, diasCaducidad)


                const sql = "INSERT INTO etiquetas "+ 
                "(id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad) "+
                `VALUES(?,?,?,?,?,?)`
                db.query(sql, [id_ingrediente, id_usuario, fechaEtiqueta, lugar_almacen, fecha_caducidad, cantidad], (err, result)=>{
                    if (err) {
                        console.log(`Error al insertar etiqueta de ${lugar_almacen}:`+ err)
                        return res.status(500).json({error: err.message})
                    }else if(result.affectedRows===0){
                        return res.status(404).json({err:"No se han insertado los datos en Etiqueta"})
                    }else{
                        console.log(`Etiquetas generadas para ${lugar_almacen} correctamente`);
                        
                    }
                }) 
            }
            
            
            
            //res.status(200).json({message:` Etiquetas generada para ${lugar_almacen} en BD correctamente`})
        }
        insertarEtiquetaFunct("almacen", cantidad_almacen, caducidades.almacen)
        insertarEtiquetaFunct("nevera", cantidad_nevera, caducidades.nevera)
        insertarEtiquetaFunct("congelador", cantidad_congelador, caducidades.congelador)
        
        res.status(200).json({message:` Etiquetas generadas en BD correctamente`})

    }catch (error){
        console.error("Error al registrar las etiquetas:", error)
        return res.status(500).json({error: error.message || "Error al procesar la solicitud"})
    }
        
    }  */

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

//todo Hacer parecido en recetas para filtrado en recetas
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

