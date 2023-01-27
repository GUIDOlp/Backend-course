// Reformar el ejercicio anterior utilizado Faker para generar los objetos con datos aleatorios en español.
// A la ruta '/test' se le podrá pasar por query params la cantidad de objetos a generar.
// Ej: '/test?cant=30'. 
// De no pasarle ningún valor, producirá 10 objetos.
// Incorporarle id a cada uno de los objetos generados en forma incremental, empezando por 1.


import { faker } from "@faker-js/faker";
import express from "express";

faker.locale = 'es'

const app = express()

app.get('/test', (req, res) => {
    let objetos = []
    let cantidad = 10
    let id = 1

    if (req.query.cantidad) {
        cantidad = req.query.cantidad
    }

    for (let i = 0; i < cantidad; i++) {
        let nombre = faker.name.firstName()
        let apellido = faker.name.lastName()
        let color = faker.color.human()

        objetos.push({ id, nombre, apellido, color })

        id++
    }

    res.json(objetos)
})

const PORT = 8080

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))