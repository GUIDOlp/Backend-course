// Normalizar la estructura del objeto en formato JSON empresa.json (disponible en la carpeta de la clase) que describe el organigrama de una empresa. El gerente y el encargado figuran en el array de empleados de la empresa.
// Imprimir por consola el objeto normalizado y la longitud del objeto original y del normalizado. Comparar los resultados.

// Nota: En adelante, utilizar la siguiente función 'print' para imprimir el contenido de un objeto:

// const util = require('util')
// function print(objeto) {
//     console.log(util.inspect(objeto,false,12,true))
// }




//accedemos al json empresa por medio de fs
const fs= require("fs");
const util = require('util')
const empresa= JSON.parse(fs.readFileSync("./empresa.json"));

const {normalize, schema}= require("normalizr");

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



