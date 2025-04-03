const db = require('../config/bd')//importar la conexion 
const bcrypt = require('bcryptjs')//para encriptar constraseña



//exportamos la funcion

exports.register = (req, res) =>{

    const {nombre, apellido1, apellido2, empresa, email, passwd, id_rol}= req.body

    //encriptar contraseña 
    const hashedPassword = bcrypt.hashSync(passwd, 10)

    const sql = "INSERT INTO Usuarios (id_rol, nombre, apellido1, apellido2, empresa, email, passwd) values (?,?,?,?,?,?,?)"
    db.query(sql, [id_rol,nombre,apellido1,apellido2,empresa,email,hashedPassword], (err, result) => {
        if(err){
            return res.status(500).json({erro: err.message})
        }
        res.status(201).json({message: "Usuario registrado correctamente", rol: id_rol})
    } )
}


//funcion de login

exports.login = (req, res) =>{
    const {email, passwd} = req.body

    if (!email || !passwd) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const sql = "SELECT * FROM Usuarios WHERE email = ?"
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        console.log("Resultado de la consulta:", result); // Debug
        if (result.length === 0) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        const userLogin = result[0]//email
        console.log("Datos del usuario:", userLogin); // Debug

        if (!userLogin.passwd) {
            return res.status(500).json({ error: "Error en la base de datos: el campo password está vacío" });
        }

        //comparamos contraseñas
        const passMatch = bcrypt.compareSync(passwd, userLogin.passwd)
        if (!passMatch) {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }
        res.status(200).json({message: 'Login exitoso', id_rol: userLogin.id_rol})
    })
}

 //funcion de borrar usuario

exports.deleteUser = (req, res) =>{
    const {id} = req.params

    sql = "DELETE FROM Usuarios WHERE id_usuario = ?"
    db.query(sql, [id], (err, result) =>{
        if (err) {
            return  res.status(500).json({error: err.message})
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'Usuario no encontrado'})
        }
        res.status(200).json({message: 'Usuario eliminado correctamente'})
    })
}

exports.getUser = (req, res)=>{
    sql = "SELECT id_usuario, id_rol, nombre, apellido1, apellido2, empresa, email FROM Usuarios "
    db.query(sql, (err, result) =>{
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }
        res.status(200).json(result)
    })
}


exports.getUserId = (req, res)=>{
    const userId = req.params.id;
    sql = "SELECT id_rol, nombre, apellido1, apellido2, empresa, email FROM Usuarios WHERE id_usuario =" + userId;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({error: 'Usuario no encontrado'})
        }
        res.status(200).json(result[0])//devuelve los datos del usuario
    })
}

//funcion de modificar 
exports.updateUser =(req, res) =>{
    const { id_rol, nombre, apellido1, apellido2, empresa, email } = req.body;
    const userId = req.params.id;

    sql = `UPDATE Usuarios 
            SET id_rol = ?, nombre = ?, apellido1 = ?, apellido2 = ?, empresa = ?, email = ?
            WHERE id_usuario = ?`;
    db.query(sql,[id_rol, nombre, apellido1, apellido2, empresa, email, userId], (err, result) =>{
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'No se realizaron cambios en el usuario'})
        }
        res.status(200).json({message: 'Usuario actualizado correctamente'})
    })

}

