import { Router } from 'express';
import * as categoryService from '../services/category.service.js';
import { authRequired, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Listar categorías (Público)
router.get('/', async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
});

// Crear categoría (Solo Admin)
router.post('/', [authRequired, isAdmin], async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body.name);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar categoría (Solo Admin)
router.delete('/:id', [authRequired, isAdmin], async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Actualizar categoría (Solo Admin)
router.put('/:id', [authRequired, isAdmin], async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body.name);
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;