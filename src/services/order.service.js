import Order from '../models/order.js';
import Product from '../models/product.js';
import Table from '../models/table.js';

export const createOrder = async (userId, items, tableId) => {
    // 1. Validar si la mesa existe y si está libre
    const table = await Table.findById(tableId);
    if (!table) throw new Error('La mesa seleccionada no existe');
    if (table.status === 'ocupada') throw new Error('La mesa ya tiene un pedido activo');

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
        table: tableId, // Guardamos la referencia a la mesa
        total
    });

    const savedOrder = await newOrder.save();

    // 2. Criterio de aceptación: Marcar mesa como ocupada
    table.status = 'ocupada';
    await table.save();

    return savedOrder;
};

export const getOrders = async (query = {}) => {
    return await Order.find(query)
        .populate('user', 'email')
        .populate('table', 'number') // Añadimos populate para ver el número de mesa
        .populate('items.product', 'name price');
};