import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'El número de mesa es obligatorio'],
        unique: true, // No puede haber dos mesas con el mismo número
        min: [1, 'El número debe ser mayor a 0']
    },
    capacity: {
        type: Number,
        required: [true, 'La capacidad es obligatoria'],
        min: [1, 'La capacidad mínima es 1']
    },
    status: {
        type: String,
        enum: ['libre', 'ocupada'],
        default: 'libre'
    }
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);