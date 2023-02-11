// Modificar el resultado del desafío de session de la clase anterior para que almacene las sesiones de usuario en el file system; en vez de que su persistencia sea en la memoria del servidor.
// La carpeta destino será 'sesiones' y estará creada en el directorio anterior al proyecto.
// Verificar que con las distintas sesiones de usuario se crean archivos dentro de esa carpeta, cuyos nombres corresponden a las cookies de sesión activas.
// Fijar la duración del tiempo de vida de la sesión y de su cookie de 1 minuto. 
// Analizar los resultados.

const express= require("express");
const cookieParser= require("cookie-parser");
const session= require("express-session");
//persistencia de filestore
const Filestore= require("session-file-store")(session);

const app= express();
app.use(cookieParser());

app.use(session({
    store: new Filestore({path: "./sesiones", ttl: 60 }),
    secret: 'shhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

const getNombreSession = req => req.session.nombre ?? ''

// rutas
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

