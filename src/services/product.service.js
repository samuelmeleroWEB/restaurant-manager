import Product from '../models/product.js';
import Category from '../models/category.js'; // Necesitamos importar Category para validar

export const createProduct = async (productData) => {
    // 1. Validar que la categoría exista antes de crear
    if (productData.category) {
        const categoryExists = await Category.findById(productData.category);
        if (!categoryExists) {
            throw new Error('La categoría seleccionada no existe');
        }
    }

    const newProduct = new Product(productData);
    return await newProduct.save();
};

export const getAllProducts = async () => {
    return await Product.find().populate('category', 'name'); // Te añado el populate para que el listado sea más útil
};

export const updateProduct = async (id, updateData) => {
    // 1. Si se intenta actualizar la categoría, validamos que la nueva exista
    if (updateData.category) {
        const categoryExists = await Category.findById(updateData.category);
        if (!categoryExists) {
            throw new Error('La categoría seleccionada no existe');
        }
    }

    // 2. runValidators: true asegura que si pones un precio negativo al editar, Mongoose lo bloquee
    return await Product.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};