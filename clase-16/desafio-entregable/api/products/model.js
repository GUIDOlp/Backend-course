const Contenedor = require('../../options/Contenedor');
const { config } = require('../../options/db_mysql/config');
const DB = new Contenedor(config, 'products');

function getAllProducts() {
  return DB.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }
  return DB.save(newProduct)
}

module.exports = {
  getAllProducts,
  addProduct,
}
