const db = require("../config/bd");


exports.getAllStockage = (req, res) => {
  const sql = `
  SELECT
    vista_stockage.id_ingrediente,
    vista_stockage.ingrediente,
    vista_stockage.cantidad_almacen,
    vista_stockage.cantidad_nevera,
    vista_stockage.cantidad_congelador,
    vista_stockage.qty_total,
    ingredientes.categoria,
    unidad_medida
  FROM vista_stockage
  JOIN ingredientes
    ON vista_stockage.id_ingrediente = ingredientes.id_ingrediente
`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No se encuentran registros" });
    }

    res.status(200).json(result);
  });
};

exports.buscarStockage = (req, res) => {
  const busquedaNombre = req.query.busqueda || "";

  const sql = `SELECT
    vista_stockage.id_ingrediente,
    vista_stockage.ingrediente,
    vista_stockage.cantidad_almacen,
    vista_stockage.cantidad_nevera,
    vista_stockage.cantidad_congelador,
    vista_stockage.qty_total,
    ingredientes.categoria,
    unidad_medida
    FROM vista_stockage
    JOIN ingredientes
    ON vista_stockage.id_ingrediente = ingredientes.id_ingrediente
  WHERE ingrediente LIKE ? `;
  const valorLike = `%${busquedaNombre}%`; //asi eliminamos injecciones de sql

  db.query(sql, [valorLike], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontraron ingredientes que coincidan con la búsqueda",
        });
    }

    res.status(200).json(result);
  });
};


exports.getStockageById = (req, res) => {
  const id = req.params.id; 
  const selectQuery = "SELECT * FROM stockages WHERE id_ingrediente = ?"; 

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); 
    }

    if (result.length == 0) {
      return res.status(404).json({ error: "Ingrediente no encontrado" }); 
    }

    res.status(200).json(result[0]); 
  });
};




exports.clearStockage = (req, res) => {
  const idIngrediente = req.params.id; 

  const sql = `
    UPDATE stockages
    SET cantidad_almacen    = 0,
        cantidad_nevera     = 0,
        cantidad_congelador = 0
    WHERE id_ingrediente = ?
  `;

  db.query(sql, [idIngrediente], (err, result) => {
    if (err) {
      
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {

      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }

    res.status(200).json({ message: "Cantidades reseteadas a 0 correctamente." });
  });
};




exports.deleteIngredientById = (req, res) => {
  const { id } = req.params; 

  const deleteQuery = "DELETE FROM stockages WHERE id_ingrediente = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Ingrediente no encontrado para eliminar" });
    }

    res.status(200).json({ message: "Ingrediente eliminado correctamente" });
  });
};

exports.updateStockage = (req, res) => {

  const { cantidad_almacen, cantidad_nevera, cantidad_congelador } = req.body;
  const idIngrediente = req.params.id; 

  if (!cantidad_almacen && !cantidad_nevera && !cantidad_congelador) {
    return res
      .status(400)
      .json({
        error: "Debe proporcionar al menos una cantidad para actualizar",
      });
  }

  
  const checkQuery = "SELECT * FROM stockages WHERE id_ingrediente = ?";
  db.query(checkQuery, [idIngrediente], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }


    const existing = results[0];

    const newCantAlmacen =
      (Number(existing.cantidad_almacen) || 0) +
      (Number(cantidad_almacen) || 0);
    const newCantNevera =
      (Number(existing.cantidad_nevera) || 0) + (Number(cantidad_nevera) || 0);
    const newCantCongelador =
      (Number(existing.cantidad_congelador) || 0) +
      (Number(cantidad_congelador) || 0);

    const sql = `
        UPDATE stockages
        SET cantidad_almacen = ?,
            cantidad_nevera = ?,
            cantidad_congelador = ?
        WHERE id_ingrediente = ?
      `;

    db.query(
      sql,
      [newCantAlmacen, newCantNevera, newCantCongelador, idIngrediente],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "No se actualizó el ingrediente" });
        } else {
          res
            .status(200)
            .json({ message: "Ingrediente actualizado correctamente" });
        }
      }
    );
  });
};

exports.obtenerStockagePorcentajes = (req, res) => {
  const sql = `
    SELECT 
      SUM(cantidad_almacen) AS total_almacen,
      SUM(cantidad_nevera) AS total_nevera,
      SUM(cantidad_congelador) AS total_congelador,
      (SUM(cantidad_almacen) + SUM(cantidad_nevera) + SUM(cantidad_congelador)) AS total_general,
      ROUND((SUM(cantidad_almacen) / NULLIF((SUM(cantidad_almacen) + SUM(cantidad_nevera) + SUM(cantidad_congelador)), 0)) * 100, 2) AS porcentaje_almacen,
      ROUND((SUM(cantidad_nevera) / NULLIF((SUM(cantidad_almacen) + SUM(cantidad_nevera) + SUM(cantidad_congelador)), 0)) * 100, 2) AS porcentaje_nevera,
      ROUND((SUM(cantidad_congelador) / NULLIF((SUM(cantidad_almacen) + SUM(cantidad_nevera) + SUM(cantidad_congelador)), 0)) * 100, 2) AS porcentaje_congelador
    FROM vista_stockage;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: "No hay datos de stock disponibles" });
    }

    // Devuelve un solo objeto con los totales y porcentajes
    res.status(200).json(result[0]);
  });
};

