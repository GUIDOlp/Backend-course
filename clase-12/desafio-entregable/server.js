const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const fs = require('fs');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//indicamos que queremos cargar archivos estaticos
app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

let productos= [];

//"connection" se ejecuta la primera vez que se abre una nueva conexion
io.on('connection', socket => {
	console.log("nuevo usuario conectado")
	io.sockets.emit('productos', productos);

	fs.promises.readFile('chat/chat.txt', 'utf-8').then(data => {
		io.sockets.emit('messages', JSON.parse(data));
	});
  // escucho los mensajes del cliente
	socket.on('newProduct', newProduct => {
		productos.push(newProduct);
		io.sockets.emit('productos', productos);
	});

	socket.on('newMessage', async newMessage => {
		let data = await fs.promises.readFile('chat/chat.txt', 'utf-8');
		let messages = JSON.parse(data);
		messages.push(newMessage);
		fs.writeFileSync('chat/chat.txt', JSON.stringify(messages));
		io.sockets.emit('messages', messages);
	});

});

//Ruta para cargar nuestro archivo
app.get('/', (req, res) => res.render('formulario', { productos }));

const PORT = 8080;
const connectServer = httpServer.listen(PORT, () => console.log(`Servidor http con WebSocket escuchando el puerto ${connectServer.address().port}`))
connectServer.on("error", error => console.log(`Error en servidor ${error}`))
