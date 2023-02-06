// Dado el objeto en formato JSON holding.json (disponible en la carpeta de la clase) que representa la información correspondiente a un grupo de empresas:

// Definir el esquema de normalización.
// Obtener el objeto normalizado e imprimirlo por consola.
// Desnormalizar el objeto obtenido en el punto anterior.
// Imprimir la longitud del objeto original, del normalizado y del desnormalizado
// Imprimir el porcentaje de compresión del proceso de normalización.

// Comparar y analizar los resultados.


const fs= require("fs");

const holding= JSON.parse(fs.readFileSync("./holding.json"));
const util = require('util')
const {normalize, schema, denormalize}= require("normalizr");

// esquema empleados
const empleado= new schema.Entity("empleado")

//esquema organigrama
const organigrama= new schema.Entity("organigrama", {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
})

// definir esquema de empresas
const grupo= new schema.Entity("grupo", {
   empresas: [organigrama] 
})

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}


// normalizacion
console.log("objeto normalizado")
const normalizar= normalize(holding, grupo);
print(normalizar);


//desnormaliazcion
console.log("objeto desnormalizado")
const desnormalizar= denormalize(normalizar.result, grupo, normalizar.entities)
print(desnormalizar)

//longitudes
const longOriginal= JSON.stringify(holding).length;
const longNormalizada= JSON.stringify(normalizar).length;
const longDesnormalizar= JSON.stringify(desnormalizar).length;

console.log("longitud de objeto original", longOriginal)
console.log("longitud de objeto normalizado", longNormalizada);
console.log("longitud de objeto desnormalizado", longDesnormalizar);


//porcentaje de compresion
const porcentaje= (longNormalizada *100)/ longOriginal
console.log("porcentaje de compresion", porcentaje.toFixed(2) + "%");

