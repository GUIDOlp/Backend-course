const express = require('express')
const app = express()

// seteamos la configuracion para ejs
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//declaramos un array vacio
let productos= [];

//rutas
app.get('/', (req, res) => res.render('productos', {productos}));
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