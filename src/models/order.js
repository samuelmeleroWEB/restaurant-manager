import mongoose from 'mongoose';
import { ORDER_STATUS } from '../constants/orderStatus.js';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'La cantidad mínima es 1']
        }
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
    type: String,
    enum: ORDER_STATUS, 
    default: 'pendiente'
},
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;