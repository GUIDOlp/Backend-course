const Contenedor = require('../../options/Contenedor');
const { config } = require('../../options/db_sqlite/config');
const DB = new Contenedor(config, 'messages');

function getAllMessages() {
  return DB.getAll()
}

function addMessage({ email, message }) {
  const newMessage = { email, message }
  return DB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
}
