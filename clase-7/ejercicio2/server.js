// Desarrollar un servidor que permita realizar la suma entre dos números utilizando tres rutas en estos formatos (Ejemplo con números 5 y 6)
// a) Ruta get '/api/sumar/5/6
// b) Ruta get '/api/sumar?num1=5&num2=62) 
// c) Ruta get '/api/operacion/5+6
// No hace falta validar los datos a sumar, asumimos que los ingresamos correctamente.
// Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. Probar estas rutas con Postman, verificando que el servidor responda con el mensaje correcto.
// El servidor escuchará en el puerto 8080 y mostrará todos los mensajes de conexión/error que correspondan.

const express= require("express");
const app= express();

//a.- la clase number posibilita que no se concatene los numeros y obliga a sumar los mismos
app.get("/api/sumar/:num1/:num2", (req, res) => {
    let{num1, num2}= req.params
    res.send({suma: Number(num1) + Number(num2)})
})

//b.-cuando aparece el signo de interrogacion en la ruta, utilizar query en lugar de params. en este caso. en la ruta, desde el lado del cliente ponemos el signo de interrogacion mas las claves propiedad valor y el ampersand si son dos operaciones. desde el lado del servidor no se pone eso, y accedemos por medio de los query
app.get("/api/sumar", (req, res) => {
    let{num1, num2}= req.query
    res.send({suma: Number(num1) + Number(num2)})
})

//c.- el metodo eval evalua una cadena de caracteres
app.get("/api/operacion/:num", (req, res) => {
    let{num}= req.params
    res.send({operacion: eval(num)})
})

app.post("/api", (req, res) => {
    res.send("ok post")
})
app.put("/api", (req, res) => {
    res.send("ok put")
})
app.delete("/api", (req, res) => {
    res.send("ok delete")
})

const PORT= 8080;

const server= app.listen(PORT, () => {
    console.log(`Servidor HTTP esta escuchando el puerto ${server.address().port}`)
})

//manejo de error
server.on("error", error=> console.log(`Error en el servidor ${error}`) )
