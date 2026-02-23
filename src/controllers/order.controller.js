import * as orderService from '../services/order.service.js';
import Order from '../models/order.js';
import Table from '../models/table.js'; // Necesario para liberar la mesa
import { ORDER_STATUS } from '../constants/orderStatus.js'; 

export const create = async (req, res) => {
    try {
        const { items, table } = req.body; // Extraemos 'table' del body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "El pedido debe tener al menos un plato" });
        }

        if (!table) {
            return res.status(400).json({ message: "Es obligatorio asignar una mesa al pedido" });
        }

        // Pasamos req.user.id, items y table al servicio
        const order = await orderService.createOrder(req.user.id, items, table);
        
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

        if (!ORDER_STATUS.includes(status)) {
            return res.status(400).json({ message: "Estado no válido" });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

        // Lógica automática: Si el pedido se marca como 'servido', liberamos la mesa
        if (status === 'servido') {
            await Table.findByIdAndUpdate(order.table, { status: 'libre' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};