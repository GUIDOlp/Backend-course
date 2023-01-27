// Considere la siguiente frase: ‘Frase inicial’
// Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:
// GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
// GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
// POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
// PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
// DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).

// Aclaraciones:
// Utilizar Postman para probar la funcionalidad.
// El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

const express= require("express");
const app= express();
app.use(express.json());

let frase= "frase inicial";

//1.-
app.get("/api/palabras", (req, res) => {
    res.send(frase)
})

//2.-
app.get("/api/palabras/:pos", (req, res) => {
    let{pos}= req.params
    res.send(frase[pos - 1])
})

//3.-
app.post("/api/palabras", (req, res) =>{
    let {palabra}= req.body
    frase+= " " + palabra
    res.send(`palabra: ${frase}`)
})

//4.-
app.put("/api/palabras/:pos", (req, res) => {
    let{pos}= req.params
    let{palabra}= req.body
    let palabras= frase.split(" ")
    let palabraAnterior= palabras[pos - 1]
    palabras[pos - 1]= palabra

    res.send(`palabra: ${palabraAnterior} fue actualizada por ${palabra}. Frase completa: ${palabras}`)
})

//5.- en delete no se pasa body
app.delete("/api/palabras/:pos", (req, res) => {
    let{pos}= req.params
    let palabras= frase.split(" ")
    let palabra= palabras.splice(pos - 1, 1)
    frase= palabras.join()
    res.send(`palabra borrada: ${palabra}`)
})

const PORT= 8080;

const server= app.listen(PORT, () => {
    console.log(`Servidor HTTP esta escuchando el puerto ${server.address().port}`)
})

//manejo de error
server.on("error", error=> console.log(`Error en el servidor ${error}`) )

