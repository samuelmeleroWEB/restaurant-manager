import * as categoryService from '../services/category.service.js';

export const getAll = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
};

export const create = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body.name);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body.name);
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};