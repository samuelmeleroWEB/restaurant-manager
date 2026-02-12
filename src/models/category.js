import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        trim: true,
        unique: true, 
        lowercase: true
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;