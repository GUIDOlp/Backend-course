// Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.
// Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'.
// El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip
// Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080.

// importamos la dependencia express
const express= require("express")
// importamos la dependencia multer
const multer= require("multer");

const app= express();
app.use(express.static("public"))

// lo de aqui abajo, sirve para que nuestro servidor express pueda interpretar en forma automatica mensajes de tipo json en formato urlencoded
app.use(express.urlencoded({ extended: true }))

//configuracion de multer
const storge= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload= multer({storage: storge})

app.post("/subir", upload.single("miArchivo"), (req, res, next) => {
    // guardamos el archivo en una variable
    const file= req.file
    if(!file) {
        const error= new Error("error subiendo al archivo")
        error.httpStatusCode= 400
        return next(error)
    } res.send(`Archivo ${file.originalname} subido exitosamente`)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))



