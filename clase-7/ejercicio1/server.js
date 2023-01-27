// Dada la siguiente constante: const frase = 'Hola mundo cómo están'
// Realizar un servidor con API Rest usando node.js y express que contenga los siguientes endpoints get:

// 1) '/api/frase' -> devuelve la frase en forma completa en un campo ‘frase’.
// 2) '/api/letras/:num  -> devuelve por número de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo ‘letra’.
// 3) '/api/palabras/:num  -> devuelve por número de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo ‘palabra’.

// - En el caso de las consignas 2) y 3), si se ingresa un parámetro no numérico o que esté fuera del rango de la cantidad total de letras o palabras (según el caso), el servidor debe devolver un objeto con la descripción de dicho error. Por ejemplo:
// { error: "El parámetro no es un número" } cuando el parámetro no es numérico
// { error: "El parámetro está fuera de rango" } cuando no está entre 1 y el total de letras/palabras
// - El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

const express= require("express");
const app= express();

const frase= "Hola mundo como estan";

//1.-
app.get("/api/frase", (req, res) => {
    res.send(frase)
})

//2.-
//cuando estan los dos puntos luego de la barra, se accede al mismo a traves del campo params; desde el lado del cliente, no hay que poner los dos puntos
app.get("/api/letras/:num", (req, res)=> {
    let num= parseInt(req.params.num) 
    if(!isNaN(num)) {
       if(num >= 1 & num <= frase.length) {
        res.send(frase[num - 1])
       }
    } else{
        res.send({error: "El parametro ingresado no es numerico"})
    }
})

//3.-
// metodo split divide un objeto de tipo string en un array. en nuestro caso, al metodo split le agregamos comillas y un espacio en blanco, porque asi esta separado la totalidad de las palabras en la variable frase
app.get("/api/palabras/:num", (req, res) => {
    let num= parseInt(req.params.num) 
    if(!isNaN(num)) {
       let palabras= frase.split(" ")
       if(num >= 1 & num <= palabras.length) {
         res.send(palabras[num - 1])
       } else{
        res.send({error: `El parametro ${num} esta fuera del rango de la frase`})
       }
    } else{
        res.send({error: "El parametro ingresado esta fuera de rango"})
    }
})

const PORT= 8080;

const server= app.listen(PORT, () => {
    console.log(`Servidor HTTP esta escuchando el puerto ${server.address().port}`)
})

//manejo de error
server.on("error", error=> console.log(`Error en el servidor ${error}`) )