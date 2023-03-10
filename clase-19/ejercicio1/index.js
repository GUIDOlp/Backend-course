// Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB local llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.
// Crear una colección llamada ‘estudiantes’ que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
// nombre: tipo string
// apellido: tipo string
// edad: tipo number
// dni: tipo string (campo único)
// curso: tipo string
// nota: tipo number
// Todos los campos deben ser requeridos obligatoriamente ({ required: true })

// Tomar los valores del siguiente array de objetos
// [
//     { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
//     { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
//     { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
//     { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
//     { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
//     { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
//     { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
//     { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
//     { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
//     { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
// ]

// Verificar con el cliente Mongo Shell (CLI) que los datos estén almacenados en la base y colección que corresponda.

import mongoose from "mongoose";
import * as model from "./model/estudiante.js";

CRUD()

async function CRUD() {
    try {
         //Conexion con la DB
         const url= 'mongodb://localhost:27017/colegio';
         let rta = await mongoose.connect(url, {
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')

        console.log("create")
        const estudiantes=  [
            { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
            { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
            { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
            { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
            { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
            { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
            { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
            { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
            { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
            { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        ]

        const estudianteSaveModel = model.estudiantes.create(estudiantes)
        .then(() => {
            console.log("Estudiantes creados correctamente");
        })

    } catch (error) {
        console.log(error)
    }
}