// 1) - Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
// 	GET: devolverá la lista requerida en formato objeto.
// POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
// Persona -> { "nombre": ..., "apellido": ..., "edad":... }
// Mascota -> { "nombre":..., "raza":..., "edad":... }
// - Utilizar el Router de express para definir las rutas base, implementando las subrutas en los métodos correspondientes.
// - Probar la funcionalidad con Postman.
// - El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

// 2) Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html. 
// En ese archivo se encontrarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post
// Probar el ingreso de datos mediante los formularios y con Postman
// Verificar los datos cargados en cada caso.


const express = require('express')
const app = express()


// declaramos las rutas para las personas y para las mascotas
const routePersona = express.Router()
const routeMascota = express.Router()

routeMascota.use(express.json())
routePersona.use(express.json())
routeMascota.use(express.urlencoded({ extended: true }))
routePersona.use(express.urlencoded({ extended: true }))

// aqui seteamos nuestras rutas principales
app.use('/mascota', routeMascota)
app.use('/persona', routePersona)

/// Mascotas
let mascotas = []
routeMascota.get('/listar', (req, res) => {
    res.json(mascotas)
})

routeMascota.post('/guardar', (req, res) => {
    mascotas.push(req.body)
    res.json(mascotas)
})

// Personsas
let personas = []
routePersona.get('/listar', (req, res) => {
    res.json(personas)
})

routePersona.post('/guardar', (req, res) => {
    personas.push(req.body)
    res.json(personas)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

//2). utilizamos la funcion express.static(es un middleware) para crear servicios estaticos
app.use(express.static('public'))