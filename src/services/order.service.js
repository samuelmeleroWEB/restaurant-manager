import Order from '../models/order.js';
import Product from '../models/product.js';

export const createOrder = async (userId, items) => {
    let total = 0;

    // Calculamos el total buscando el precio actual de cada producto
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`El producto con ID ${item.product} no existe`);
        
        total += product.price * item.quantity;
    }

    const newOrder = new Order({
        user: userId,
        items,
        total
    });

    return await newOrder.save();
};

export const getOrders = async (query = {}) => {
    // Usamos .populate para que en lugar de solo el ID, nos traiga el nombre del plato y del usuario
    return await Order.find(query)
        .populate('user', 'email')
        .populate('items.product', 'name price');
};