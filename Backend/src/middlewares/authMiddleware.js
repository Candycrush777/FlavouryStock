
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
  
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = { verificarToken };