
const db = require("../config/bd") 

exports.registerBasket = (req, res) => {
  const fechaEtiqueta = new Date();
  const { id_ingrediente, cantidad_almacen, cantidad_nevera, cantidad_congelador } = req.body;
  // Asegúrate de poblar req.user.id_usuario en tu middleware
  const id_usuario = req.user?.id_usuario;

  if (!id_usuario) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  obtenerCaducidad(db, id_ingrediente)
    .then(caducidades => {
      const lugaresInvalidos = [];
      const promesas = [];

      const operaciones = [
        ['almacen',    cantidad_almacen,   caducidades.almacen],
        ['nevera',     cantidad_nevera,    caducidades.nevera],
        ['congelador', cantidad_congelador,caducidades.congelador],
      ];

      for (const [lugar, cantidad, dias] of operaciones) {
        if (cantidad > 0) {
          if (dias == null) {
            lugaresInvalidos.push(lugar);
          } else {
            const fecha_caducidad = new Date(fechaEtiqueta);
            fecha_caducidad.setDate(fecha_caducidad.getDate() + dias);

            const sql = `
              INSERT INTO etiquetas
                (id_ingrediente, id_usuario, fecha_etiquetado, lugar_almacen, fecha_caducidad, cantidad)
              VALUES(?,?,?,?,?,?)
            `;

            promesas.push(new Promise((resolve, reject) => {
              db.query(
                sql,
                [id_ingrediente, id_usuario, fechaEtiqueta, lugar, fecha_caducidad, cantidad],
                (err, result) => {
                  if (err) return reject(err);
                  if (result.affectedRows === 0) {
                    return reject(new Error(`No se insertó en ${lugar}`));
                  }
                  resolve();
                }
              );
            }));
          }
        }
      }

      // Ejecutamos todas las inserciones en paralelo
      return Promise.all(promesas)
        .then(() => ({ lugaresInvalidos }))
        .catch(err => { throw err; });
    })
    .then(({ lugaresInvalidos }) => {
      let message = 'Etiquetas generadas en BD correctamente';
      if (lugaresInvalidos.length) {
        message += `. Pero no se pudieron almacenar en: ${lugaresInvalidos.join(', ')}`;
      }
      res.status(200).json({ message, lugaresInvalidos });
    })
    .catch(error => {
      console.error('Error en registerBasket:', error);
      res.status(500).json({ error: error.message });
    });
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


exports.getIngredientById = (req, res) => {
  const ingredientId = req.params.id;
  sql = "SELECT * FROM ingredientes WHERE id_ingrediente = " + ingredientId;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error completo:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }
    res.status(200).json(result[0]);
  });
};

exports.getIngredientsByCategory = (req, res)=>{
    const category = req.params.category
    sql = `SELECT * FROM ingredientes WHERE categoria = ${category}`

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Ingredientes por categoria no encontrados" });
    }
    res.status(200).json(result);
  });
};

exports.getIngredientByNombre = (req, res) => {
  const nombre = req.params.nombre;
  sql = `SELECT * FROM ingredientes WHERE nombre = ${nombre}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "El ingrediente no encontrado o está mal escrito" });
    }
    res.status(200).json(result);
  });
};

exports.updateIngredient = (req, res) => {
  const {
    nombre,
    categoria,
    imagen,
    unidad_medida,
    caducidad_almacen,
    caducidad_nevera,
    caducidad_congelador,
  } = req.body;
  const id_ingrediente = req.params.id_ingrediente;

  sql =
    "UPDATE Ingredientes " +
    "SET nombre = ?, categoria = ?, imagen = ?, unidad_medida = ?, caducidad_almacen = ?, caducidad_nevera = ?, caducidad_congelador = ? " +
    `WHERE id_ingrediente = ${id_ingrediente}`;

  db.query(
    sql,
    [
      nombre,
      categoria,
      imagen,
      unidad_medida,
      caducidad_almacen,
      caducidad_nevera,
      caducidad_congelador,
      id_ingrediente,
    ],
    (err, result) => {
      if (err) {
        console.error("Error completo:", err);
        return res.status(500).json({ error: err.message });
      } else if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No se realizaron los cambios en Ingrediente" });
      } else {
        res
          .status(200)
          .json({ result, message: "Ingrediente actualizado correctamente" });
      }
    }
  );
};

async function obtenerCaducidad(db, ingredienteId) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT caducidad_almacen, caducidad_nevera, caducidad_congelador FROM ingredientes WHERE id_ingrediente = ?";
    db.query(sql, [ingredienteId], (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject({ message: "Ingrediente no encontrado" });
      } else {
        resolve({
          almacen: result[0].caducidad_almacen,
          nevera: result[0].caducidad_nevera,
          congelador: result[0].caducidad_congelador,
        });
      }
    });
  });
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

