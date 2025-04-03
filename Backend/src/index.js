const express = require("express")
const app = express()
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const ingredientRoutes = require("./routes/ingredientRoutes")

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/ingredients", ingredientRoutes)
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
