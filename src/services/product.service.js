import Product from '../models/product.js';

export const createProduct = async (productData) => {
    // El precio > 0 lo valida Mongoose, pero aquí podríamos añadir más lógica
    const newProduct = new Product(productData);
    return await newProduct.save();
};

export const getAllProducts = async () => {
    return await Product.find();
};

export const updateProduct = async (id, updateData) => {
    // runValidators: true es vital para que vuelva a validar el precio > 0 al editar
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};