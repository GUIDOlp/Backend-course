// Transformar el primer desafío, pero esta vez la página dinámica la creará el servidor desde handlebars instalado y configurado para trabajar con express.
// Utilizar la misma estructura de plantilla HTML dentro de una pagina web con encabezado y el mismo objeto de datos.
// El servidor escuchará en el puerto 8080 y el resultado lo ofrecerá en su ruta root.

const express = require('express')
const {engine}= require("express-handlebars")

const app = express()
//configuramos handlebars
app.engine("handlebars", engine())

//seteamos las rutas
app.set("views", "./views")
app.set("view engine", "handlebars")

//rutas
app.get("/", (req, res) => {
    const datosPersona= {
        nombre: "Guido",
        apellido: "Eliggi",
        edad: 31,
        email: "eliggiguido@gmail.com",
        telefono: "34587585"
    }
    res.render("datos", datosPersona)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))
