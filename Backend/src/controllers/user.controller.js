const db = require('../config/bd')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = (req, res) =>{

    const {nombre, apellido1, apellido2, empresa, email, passwd, id_rol}= req.body


    const hashedPassword = bcrypt.hashSync(passwd, 10)

    const sql = "INSERT INTO Usuarios (id_rol, nombre, apellido1, apellido2, empresa, email, passwd) values (?,?,?,?,?,?,?)"
    db.query(sql, [id_rol,nombre,apellido1,apellido2,empresa,email,hashedPassword], (err, result) => {
        if(err){
            return res.status(500).json({erro: err.message})
        }
        res.status(201).json({message: "Usuario registrado correctamente", rol: id_rol})
    } )
}




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

        if (result.length === 0) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        const userLogin = result[0]
        
        const passMatch = bcrypt.compareSync(passwd, userLogin.passwd)
        if (!passMatch) {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }

        const token = jwt.sign(
            {
                id_usuario: userLogin.id_usuario,
                nombre: userLogin.nombre,
                email: userLogin.email,
                id_rol: userLogin.id_rol
            },
            process.env.SECRET_JWT_KEY
        )

        if (!userLogin.passwd) {
            return res.status(500).json({ error: "Error en la base de datos: el campo password está vacío" });
        }

        
        res.status(200).json({
            message: 'Login exitoso', 
            token,
            id_rol: userLogin.id_rol,
            id_user: userLogin.id_usuario
        })
    })
}



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

exports.getUsers = (req, res)=>{
    sql = "SELECT id_usuario, id_rol, nombre, apellido1, apellido2, empresa, email FROM Usuarios "
    db.query(sql, (err, result) =>{
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }
        res.status(200).json({result})
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
        res.status(200).json(result[0])
    })
}

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

