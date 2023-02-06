// Desnormalizar el objeto del ejercicio anterior, imprimiéndolo por consola junto a su longitud.
// Comparar el objeto original con el desnormalizado.

//accedemos al json empresa por medio de fs
const fs= require("fs");
const util = require('util')
const empresa= JSON.parse(fs.readFileSync("./empresa.json"));

const {normalize, schema, denormalize}= require("normalizr");

//definimos esquema empleados
const empleado= new schema.Entity("empleado")

//definimos esquema organigrama empresa
const organigrama= new schema.Entity("organigrama", {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
})

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

console.log("objeto normalizado")
const normalizeEmpresa= normalize(empresa, organigrama);
print(normalizeEmpresa);

console.log("longitud de objeto original:", JSON.stringify(empresa).length);
console.log("longitud de objeto normalizado", JSON.stringify(normalizeEmpresa).length);


// desnormalizacion
console.log("objeto desnormalizado")
const desnormalizar= denormalize(normalizeEmpresa.result, organigrama, normalizeEmpresa.entities);
print(desnormalizar);

console.log("longitud de objeto original:", JSON.stringify(empresa).length);
console.log("longitud de objeto desnormalizado", JSON.stringify(desnormalizar).length);
