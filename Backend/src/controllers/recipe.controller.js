const db = require('../config/bd')

exports.getAllRecipes= (req, res)=>{
    sql = "SELECT * FROM recetas"
    db.query(sql, (err, result)=>{
        if (err) {
            return res.status(500).json({Error: err.message})
        }

        if (result === 0) {
            return res.status(404).json({Error: "Receta no encontrada"})
        }

        res.status(200).json({result})
    })
}