import * as orderService from '../services/order.service.js';
import Order from '../models/order.js';
export const create = async (req, res) => {
    try {
        const { items } = req.body;

        // Criterio: Al menos un plato
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "El pedido debe tener al menos un plato" });
        }

        // Usamos req.user.id (inyectado por tu middleware authRequired)
        const order = await orderService.createOrder(req.user.id, items);
        
        res.status(201).json({
            message: "Pedido generado con éxito",
            order
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const estadosValidos = ['pendiente', 'en cocina', 'listo', 'servido'];

        if (!estadosValidos.includes(status)) {
            return res.status(400).json({ message: "Estado no válido" });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};