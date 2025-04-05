const db = require('../config/bd')

exports.getAllRecipes= (req, res)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const offset = (page - 1) * limit

    //consulta para obtener el total de recetas
    const countQuery = "SELECT COUNT(*) AS total From recetas"

    //consulta para obtener las recetas pagonadas
    const dataQuery = "SELECT * FROM recetas LIMIT ? OFFSET ?"

    //primero obtenemos el total de las recetas
    db.query(countQuery, (err, countResult)=>{
        if (err) {
            return res.status(500).json({Error: err.message})
        }

        const total = countResult[0].total
        const totlaPages = Math.ceil(total/limit)
        

        //obtenemos las recetas paginada
        db.query(dataQuery,[limit, offset] ,(err, dataResult)=>{
            if (err) {
                return res.status(500).json({Error: err.message})
            }
    
            if (dataResult === 0) {
                return res.status(404).json({Error: "Receta no encontrada"})
            }
    
            res.status(200).json({
                total,
                totlaPages,
                currentPage: page,
                limit,
                recetas: dataResult
            })
        })
    })
    
    
}