const { faker } = require('@faker-js/faker')
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

function getProductsTest(num) {
  const products = []

  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.business(),
    })
  }

  return products
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductsTest,
}
