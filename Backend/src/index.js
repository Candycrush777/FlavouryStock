require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const { verificarToken } = require("./middlewares/authMiddleware"); // 👈 Añade esto

// Configuración CORS personalizada
const corsOptions = {
  origin: 'http://localhost:4200', // URL de tu frontend Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'], // 👈 Permite el header de autenticación
  credentials: true
};

app.use(cors(corsOptions)); //Usa la configuración personalizada
app.use(express.json());

// Importación de rutas
const userRoutes = require("./routes/userRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const etiquetaRoutes = require("./routes/etiquetaRoutes");
const stockageRoutes = require("./routes/stockageRoutes");

// Rutas públicas (sin autenticación)
app.use("/api/users", userRoutes);

// 👇 Rutas protegidas (con autenticación)
app.use("/api/ingredients", verificarToken, ingredientRoutes); //Añade middleware aquí
app.use("/api/recipes",recipeRoutes);
app.use("/api/etiquetas", verificarToken, etiquetaRoutes);
app.use("/api/stockage", verificarToken, stockageRoutes);

const PORT = process.env.PORT || 3000; //Añade valor por defecto, mirar si quitar

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
