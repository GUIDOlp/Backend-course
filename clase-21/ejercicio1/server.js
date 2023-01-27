// Desarrollar un servidor basado en Node.js y express que para la ruta '/test' responda con un array de 10 objetos, con el siguiente formato:
// {
//     nombre: '',
//     apellido: '',
//     color: ''
// }

// Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
// const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
// const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
// const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

// Con cada request se obtendrán valores diferentes.


const express= require("express");
const app= express();

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

const PORT= 8080

app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));

//ruta
app.get("/test", (req, res)=> {
    let objetos= [];
    // como la consigna nos indica que debemos responder con un array de 10 objetos, utilizamos for para iterar
    for (let index = 0; index < 10; index++) {
        let nombre= nombres[Math.floor(Math.random() * nombres.length)]
        let apellido= apellidos[Math.floor(Math.random() * apellidos.length)]
        let color= colores[Math.floor(Math.random() * colores.length)]
        
        objetos.push({nombre, apellido, color})
    }
    res.json(objetos)
})