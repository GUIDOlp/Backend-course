// Realizar un proyecto en Node.js que acceda a una base de datos Firebase ya configurada.

// Agregar los colores red, green, blue dentro de una colección llamada ‘colores’ con el formato { nombre: color }
// Listar todos los colores disponibles.
// Modificar el color blue por navy.
// Borrar el color green

// A tener en cuenta:
// Implementar estas funciones utilizando Promises en las funciones de Firebase con sintaxis async/await, utilizando la importación en formato ES Modules (import)
// Verificar la información de la base de datos con la consola de Firebase.

import admin from "firebase-admin";
import fs from "fs";


let serviceAccount= JSON.parse(fs.readFileSync
("./codertest-a2dfb-firebase-adminsdk-8868s-e2cc432add.json", "utf-8"))


// conexion a firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://codertest-a2dfb.firebaseio.com"
    });

    console.log("base de datos conectada")
     
    const db= admin.firestore();
    const colores= db.collection("colores");

//1.- agregar colores
    const green=  await colores.add({nombre: "green"})
    
    const blue= await colores.add({nombre: "blue"})
    
    const red= await colores.add({nombre: "red"})

    console.log("colores insertados")

//2.- listar los colores
const colorList= await colores.get()

colorList.forEach(color => {
    console.log({
        id: color.id,
        ...color.data()
    })
})

//3.- modificar color
await colores.doc(blue.id).update({nombre: "navy"});
console.log("color modificado")

//4.- borrar color
await colores.doc(green.id).delete();
console.log("el color ha sido borrado")


