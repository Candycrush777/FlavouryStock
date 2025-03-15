const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

//conexion a la bbdd
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(err => {
    if (err) {
        console.log("Error al conectar a Mysql: ", err);
        
    }

    console.log("Conectado a la base de datos Mysql")
})

module.exports = db

