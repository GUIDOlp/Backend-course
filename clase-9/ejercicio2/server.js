// Desarrollar un motor de plantillas custom para un servidor basado en express, que permita representar en la ruta '/cte1' el siguiente archivo de plantilla 'plantilla1.cte':
/* <h1>^^titulo$$</h1>
<p>^^mensaje$$</p>
<b>^^autor$$</b>
<hr>
<i><b>Versión: ^^version$$</b></i> */

// Con los datos que provienen desde un objeto:
// { 
//     titulo: (algún título en string),
//     mensaje:(algún mensaje en string),
//     autor: (algun autor en string),
//     version: (numerica)
// }
// Este motor personalizado debe permitir parsear objetos de datos con claves dinámicas y volcar sus valores en la plantilla seleccionada.
// Crear otra ruta '/cte2' que represente otro archivo de plantilla: 'plantilla2.cte' con los datos nombre, apellido y la fecha/hora provenientes de un objeto.

const express = require('express')
// llamamos a la dependencia fs para acceder a archivos
const fs= require("fs")
const app = express()



// creamos nuestro motor de plantilla
app.engine("cte", (filePath, options, callback) => {
fs.readFile(filePath, (error, content) => {
    if(error) return callback(error);
    const render= content.toString()
                         .replace("^^titulo$$", options.titulo)
                         .replace("^^mensaje$$", options.mensaje)
                         .replace("^^autor$$", options.autor)
                         .replace("^^version$$", options.version)
                         .replace('^^nombre$$', options.nombre)
                         .replace('^^apellido$$', options.apellido)
                         .replace('^^fecha$$', options.fecha);
      return callback(null, render)
   })
})

//declaramos las rutas
app.get("/cte1", (req, res) => {
    const datos= {
      titulo: "coderhouse",
      mensaje:"hola como estas",
      autor: "Guido Eliggi",
      version: 45455
    };
    res.render("plantilla1", datos)
  })
app.get("/cte2", (req, res) => {
    const datosPersona= {
        nombre: "Guido",
        apellido: "Eliggi",
        fecha: new Date()
      };
      res.render("plantilla2", datosPersona)
})

// esto es para la vista
app.set("views", "./views" )
// esto es para el motor
app.set("view engine", "cte")

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))
