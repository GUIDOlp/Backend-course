// Conectarse a la base MongoDB Atlas con los clientes CLI, Compass y Node.js
// Mediante la consola CLI insertar estos documentos en una base llamada ‘ecommerce’, colección ‘usuarios’:
// [
//     { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
//     { nombre: 'María', apellido: 'García', dni: '29575148' },
//     { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
//     { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
// ]
// A través de un proyecto Node.js, listar estos datos representándolos en la consola.
// Con el mismo proyecto, incorporar un usuario más: 
//  nombre: 'Federico', apellido: 'Perez', dni: '320118321' }
// Utilizar sintaxis de Promesas con async await e import para la importación de módulos.
// Con Compass borrar al usuario llamado Tomas.
// Con Mongo CLI actualizar el usuario llamado 'Carlos' al nombre 'Juan Carlos' y luego listar los documentos finales.

import mongoose from "mongoose";
import * as model from "./model/usuarios.js";

const URL= "mongodb+srv://coder:coder2023@cluster0.6crywmo.mongodb.net/ecommerce"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if(error) throw new Error(`Error en la conexion con la base de datos ${error}`)
    console.log("base de datos conectada")
})

try {
    let result= await model.usuarios.find({})
    console.log(result)

    const usuariosSave= model.usuarios.create({nombre: "Federico", apellido: "Perez", dni: "320118321"}).then(()=> {
        console.log("El usuario fue cargado correctamente")
    })
   
} catch (error){
console.log(error)
}