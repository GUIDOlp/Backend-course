import ClientSQL from "./sql.js";
import { options } from "./options/sqlLite3.js";

const sql= new ClientSQL(options);

const articulos= [{
    nombre: "harina", codigo: "123", precio: 80.00, stock: 50
},
{
    nombre: "fideos", codigo: "345", precio: 60.00, stock: 20
},
{
    nombre: "leche", codigo: "555", precio: 50.00, stock: 60
},
{
    nombre: "arroz", codigo: "777", precio: 120.00, stock: 80
},
{
    nombre: "cereales", codigo: "888", precio: 30.00, stock: 90
}
]

sql.crearTabla()
.then(()=> {
    console.log("tabla creada");

    return sql.insertarArticulos(articulos)
})
   .then(()=> {
    console.log("articulos insertados")

    return sql.listarArticulos()
})
.then(()=> {
    console.log("articulos listados")

    return sql.borrarArticulosPorId(3)
})
.then(()=> {
    console.log("articulo con id 3 borrado")

    return sql.actualizarStock(0,2)
})
.then(()=> {
    console.log("articulo con id 2 actualziado correctamente")

    return sql.listarArticulos()
})
.catch((error) => {
    console.log(error); throw(error)
})
.finally(()=> sql.close)