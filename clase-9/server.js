// Realizar una página web que permita mostrar datos personales de la siguiente forma:
/* <h1>Datos Personales</h1>
<ul>
    <li>(nombre)</li>
    <li>(apellido)</li>
    <li>(edad)</li>
    <li>(email)</li>
    <li>(teléfono)</li>
</ul> */
// Con los datos que provienen desde un objeto:
// {
//     nombre: '...',
//     apellido: '...',
//     edad: ...,
//     email: '...',
//     telefono: '...'
// } 
// Importar Handlebars vía CDN en el frontend para crear dicha vista en forma dinámica. Esta página será servida desde el espacio público de un servidor basado en node.js y express.

const express = require('express')
const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

// utilizamos la funcion express.static(es un middleware) para crear servicios estaticos
app.use(express.static('public'))
