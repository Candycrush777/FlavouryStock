const express = require("express")
const app = express()
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const ingredientRoutes = require("./routes/ingredientRoutes")
const recipeRoutes = require('./routes/recipeRoutes')

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/ingredients", ingredientRoutes)
app.use("/api/recipes", recipeRoutes)
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
