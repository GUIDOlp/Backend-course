let productos= [];

class Producto {
	constructor(title, price, thumbnail) {
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

module.exports = { Producto, productos };