const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes )
const PORT = process.env.PORT

app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));


