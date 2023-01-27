const carrito = require(`../dataBase/dbCarrito`);
const productos = require(`../dataBase/dbProductos`);

let cart = new carrito(`./dataBase/carrito.txt`);
let prods = new productos(`./database/productos.txt`);

const getProductsByIdCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productosbyId = await cart.getProductsByID(idCart);
        if (productosbyId.length == 0) {
            return res.json(`El carrito se encuentra vacío`);
        } else {
            return res.json(productosbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const createCart = async (req, res) => {
    try {
        const id = await cart.createCart();
        return res.json(`Nuevo carrito asignado, ID: ${id}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const addProduct = async (req, res) => {
    try {
        let idCart = Number(req.params.idCar);
        let idProduct = req.params.idProd;

        let allCarts = await cart.getAll();

        const cartIndex = allCarts.findIndex(cart => cart.id === idCart);

        if (cartIndex < 0) {
            return res.status(401).json({
                error: "carrito no encontrado"
            });
        };

        let carrito = await cart.getCartById(idCart);

        if (carrito.length == 0) {
            return res.status(404).json({
                error: `Error no se encontro el carrito`
            });
        };

        let productbyId = await prods.getById(idProduct);

        if (productbyId.length == 0) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        };

        allCarts[cartIndex].productos.push(productbyId[0]);

        await cart.write(allCarts, `producto agregado al carrito`);
        return res.json(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);

    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = Number(req.params.id);

        await cart.deleteCartById(idCart);
        return res.json(`Se eliminó de forma correcta el carrito con ID:${idCart}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idCart = Number(req.params.id);
        const idProduct = Number(req.params.id_prod);

        await cart.deleteProductById(idCart, idProduct);

        return res.json(`Producto  con ID: ${idProduct} del carrito con ID ${idCart} fue eliminado`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

module.exports = {
    getProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
};