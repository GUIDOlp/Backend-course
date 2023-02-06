// Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello: 
// Definir una ruta “cookies”.
// Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
// Definir un método GET que devuelva todas las cookies presentes.
// Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

// NOTA 1: Utilizar la librería express como estructura de servidor.
// NOTA 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
// Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
// NOTA 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
// NOTA 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.

const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const cors = require('cors');


const app = express()
app.use(cookieParser('coderhouse'))
app.use(express.json())
app.use(express.static('public'))

//Ruta para cargar nuestro archivo index.html en la raiz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

// Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie
app.post('/cookies', (req, res) => {
    const { nombre, valor, tiempo } = req.body

    if (!nombre || !valor) {
        return res.json({ error: 'falta nombre ó valor' })
    }
    if (tiempo) {
        res.cookie(nombre, valor, { maxAge: 1000 * parseInt(tiempo) })
    } else {
        res.cookie(nombre, valor, { signed: true })
    }

    res.json({ process: "Ok" })
})

// Definir un método GET que devuelva todas las cookies presentes.
app.get('/cookies', (req, res) => {
    res.json({ normales: req.cookies, firmadas: req.signedCookies })
})

//Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine
app.delete('/cookies/:nombre', (req, res) => {
    const nombre = req.params.nombre
    if (nombre) {
        res.clearCookie(nombre)
        res.json({ proceso: "ok" })
    } else {
        res.json({ error: "falta el nombre de la cookie" })
    }
})

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
server.on("error", error => { console.log(`Error en servidor: ${error}`) })