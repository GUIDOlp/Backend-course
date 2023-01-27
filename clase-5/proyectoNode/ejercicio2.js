//Desarrollar un proyecto en node.js que declare un array de objetos de este tipo:

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
    ]

// Y obtenga la siguiente información de dicho array
// A) Los nombres de los productos en un string separados por comas.
// B) El precio total
// C) El precio promedio
// D) El producto con menor precio
// E) El producto con mayor precio
// F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola

// Aclaración: todos los valores monetarios serán expresados con 2 decimales

// A
const getNombres = () => productos.map(prod => prod.nombre).join(",")

//B
const getPrecioTotal= () => {
    let total= 0
    // recorremos el array por medio de for each
    productos.forEach(prod => {
        total+= prod.precio
    })
    return total
}

//C
const getPrecioPromedio= () => getPrecioTotal() / productos.length

//D
const getMenorPrecio= () => {
    let minimo= productos[0].precio;
    let prod= productos[0].nombre;
    for(let producto of productos) {
        if(producto.precio < minimo) {
            minimo= producto.precio
            prod= producto.nombre
        }
    }
    return prod;
}

//E
const getPrecioMaximo= ()=> {
    let maximo= productos[0].precio;
    let prod= productos[0].nombre;
    for(let producto of productos) {
        if(producto.precio > maximo) {
            maximo= producto.precio
            prod= producto.nombre
        }
    }
    return prod;   
}

//F
let infoProd= {
    nombre: getNombres(),
    total:  to2Decimales(getPrecioTotal()),
    promedio: to2Decimales(getPrecioPromedio()),
    "Producto con el precio minimo" : getMenorPrecio(),
    "Producto con el precio maximo" : getPrecioMaximo(),
}
console.log(infoProd);

function to2Decimales(precio) {
    return Number(precio.toFixed(2))
}

console.log(getNombres());
console.log(getPrecioTotal());
console.log(getPrecioPromedio());
console.log(getMenorPrecio());
console.log(getPrecioMaximo());