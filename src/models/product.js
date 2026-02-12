import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del plato es obligatorio'],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: {
            values: ['entrantes', 'principales', 'postres', 'bebidas'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;