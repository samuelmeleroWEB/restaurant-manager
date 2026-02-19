import * as orderService from '../services/order.service.js';

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