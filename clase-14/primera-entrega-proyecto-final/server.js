const express = require(`express`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const productosRouter = require("./routes/productosRouter");
const carritoRouter = require("./routes/carritoRouter");

//Rutas base
app.use(`/api/productos`, productosRouter);
app.use(`/api/carrito`, carritoRouter);


app.use((req, res, next) => {
    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`El Servidor HTTP esta corriendo en el puerto ${PORT}`));

server.on(`error`, err => console.log(`error en el servidor ${err}`));


