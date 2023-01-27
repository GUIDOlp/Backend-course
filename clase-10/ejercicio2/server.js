// Realizar el mismo ejercicio que en el desafío anterior(ejercicio1), utilizando ejs.


const express = require('express')
const app = express()

// seteamos la configuracion para ejs
app.set("views", "./views");
app.set("view engine", "ejs");

//ruta
app.get("/datos", (req, res) => {
    const queryParams= req.query
    res.render("nivel", queryParams)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))
