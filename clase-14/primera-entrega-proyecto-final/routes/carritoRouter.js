const { Router } = require("express");

const {
    getProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
  } = require("../controller/CarritoController");

const carritoRouter = Router();

carritoRouter.get(`/:id/productos`, getProductsByIdCart);
carritoRouter.post(`/`, createCart);
carritoRouter.post(`/:idCar/:idProd`,addProduct);
carritoRouter.delete(`/:id`, deleteCartById);
carritoRouter.delete(`/:id/productos/:id_prod`, deleteProductById);

module.exports = carritoRouter;