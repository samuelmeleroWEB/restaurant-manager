import Category from '../models/category.js';

export const createCategory = async (name) => {
    const category = new Category({ name });
    return await category.save();
};

export const getAllCategories = async () => {
    return await Category.find();
};

export const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};
export const updateCategory = async (id, name) => {
    return await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
};