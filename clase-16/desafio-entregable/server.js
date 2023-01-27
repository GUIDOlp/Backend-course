require('dotenv').config()
const express = require('express')
const productsRouter = require('./api/products/controller')
const chatRouter = require('./api/chat/controller')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productsDB = require('./api/products/model')
const chatDB = require('./api/chat/model')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'pug')
app.use('/products', productsRouter)
app.use('/chat', chatRouter)
app.get('/', viewProductPage)

io.on('connection', main)
httpServer.listen(PORT, () => console.log(`Servidor http esta corriendo en el puerto ${PORT}`))

const data = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  CHAT_MESSAGES: 'CHAT_MESSAGES',
  CHAT_ADD_MESSAGE: 'CHAT_ADD_MESSAGE',
}

async function main(socket) {
  console.log('Se ha conectado un cliente')
  try {
    const messages = await chatDB.getAllMessages()
    const products = await productsDB.getAllProducts()
    socket.emit(data.PRODUCTS, products)
    socket.emit(data.CHAT_MESSAGES, messages)
    socket.on(data.ADD_PRODUCT, sendProducts)
    socket.on(data.CHAT_ADD_MESSAGE, sendMessages)
  } catch (error) {
    console.error(error)
  }
}

function viewProductPage(req, res) {
  res.render('productPage.pug')
}

function sendProducts() {
  productsDB.getAllProducts().then((data) => {
    io.sockets.emit(data.PRODUCTS, data)
  })
}

function sendMessages() {
  chatDB.getAllMessages().then((data) => {
    io.sockets.emit(data.CHAT_MESSAGES, data)
  })
}
