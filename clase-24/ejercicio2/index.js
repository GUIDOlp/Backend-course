// Poner en marcha el servidor de base de datos Redis y conectar su cliente CLI.

// Realizar las siguientes tareas:
// Listar la información total en la base.
// Crear 5 claves sin tiempo de expiración que contengan nombres de productos.
// Listar nuevamente toda la información.
// Mostrar el contenido de cada una de las claves de productos.
// Agregar un producto más, fijando un tiempo de vida de 30 segundos.
// Listar el nuevo producto y su tiempo de expiración.
// Verificar que al transcurrir ese tiempo, el producto desaparezca del listado general.

// LA PRIMERA PARTE SE REALZIA EN LA CONSOLA CMD DE REDIS


// Realizar nuevamente el desafío “Guardar datos en File System” pero esta vez persistiendo las sesiones de usuario en Redis.
// Fijar un tiempo de vida de la sesión de 1 minuto que será recargada en cada visita del cliente al sitio.
// Acceder con dos clientes distintos y verificar que las sesiones respectivas hayan sido creadas en la base.
// Comprobar los datos y el tiempo de vida de las sesiones en la base verificando que cuando se extingan desaparezcan de la misma y que el usuario quede automáticamente deslogueado de su sesión.

const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const redis = require('redis')
const client = redis.createClient({ legacyMode: true });
const RedisStore = require('connect-redis')(session)

client.connect()

const app = express()

app.use(cookieParser())

app.use(session({
    store: new RedisStore({
        host: "localhost",
        port: 6379,
        client: client,
        ttl: 60
    }),
    secret: 'shhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

const getNombreSession = req => req.session.nombre ?? ''

app.get('/', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`${getNombreSession(req)} visitaste la pagina ${req.session.contador} veces`)
    } else {
        let { nombre } = req.query
        req.session.nombre = nombre
        req.session.contador = 1
        res.send(`Te damos la bienvenida ${getNombreSession(req)}`)
    }
})

app.get('/olvidar', (req, res) => {
    let nombre = getNombreSession(req)
    req.session.destroy(err => {
        if (!err) res.send(`Hasta luego ${nombre}`)
        else res.send({ error: 'olvidar', body: err })
    })
})
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor esta corriendo en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))