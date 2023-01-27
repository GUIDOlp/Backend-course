const { Router } = require("express");

const {
    getProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
  } = require("../controller/productosController");

const productosRouter = Router();

productosRouter.get(`/`, getProducts);
productosRouter.get(`/:id`, getProductById);
productosRouter.post(`/`, addProduct);
productosRouter.put(`/:id`, updateProductById);
productosRouter.delete(`/:id`, deleteProductById);

module.exports = productosRouter;