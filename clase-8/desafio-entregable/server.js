// importamos la dependencia express
const express= require("express");
let {productos } = require("./claseApiRest")

const app= express()

// utilizamos la funcion de express.static para crear servicios estaticos
app.use(express.static("public"))

//Routes
const routeExpress= express.Router();
routeExpress.use(express.json());
routeExpress.use(express.urlencoded({ extended: true }));

// Seteamos nuestras rutas principales
app.use("/api/productos", routeExpress)

//Subrutas
routeExpress.get("", (req, res) => {
    res.json(productos)
})

routeExpress.get("/:id", (req, res) => {
    let producto = productos.find(producto => producto.id === Number(req.params.id));
	if (producto) {
		res.json(producto);
	} else {
		res.status(404).json({ error: 'Producto no encontrado' });
	}
})

routeExpress.post("", (req, res) => {
	let producto = req.body;
	producto.id = productos.length + 1;
	productos.push(producto);
	res.json(productos);
})

routeExpress.put("/:id", (req, res) => {
	let { title, price, thumbnail } = req.body;
	let index = productos.findIndex(
		producto => producto.id === Number(req.params.id)
	);
	if (index >= 0) {
		productos[index] = { title, price, thumbnail };
		productos[index].id = Number(req.params.id);
		res.json(productos[index]);
	} else {
		res.status(404).send({ error: 'Producto no encontrado' });
	}

})

routeExpress.delete("/:id", (req, res) => {
	let id = productos.findIndex(
		producto => producto.id === Number(req.params.id)
	);
	if (id >= 0) {
		productos.splice(id, 1);
		res.json('Producto eliminado' );
	} else {
		res.status(404).json({ error: 'Producto no encontrado' });
	}
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${server.address().port}`)
})
// manejo de errores
server.on('error', error => console.log(`Error en el servidor ${error}`))
