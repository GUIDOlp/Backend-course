const express = require('express')
const { engine } = require('express-handlebars');

const app = express()
app.engine("handlebars", engine())
// seteamos la configuracion para hbs
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//declaramos un array vacio
let productos= [];

//rutas
app.get('/', (req, res) => res.render('productos', { productos }));
app.get('/productos', (req, res) => res.render('formulario'));
app.post('/productos', (req, res) => {
	const { name, price, picture } = req.body;
	productos.push({ name, price, picture });
	res.render('formulario');
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))