import * as tableService from '../services/table.service.js';

export const createTable = async (req, res) => {
    try {
        const table = await tableService.createTable(req.body);
        res.status(201).json(table);
    } catch (error) {
        // Si el número está duplicado, Mongo lanzará un error que capturamos aquí
        res.status(400).json({ message: error.message });
    }
};

export const getTables = async (req, res) => {
    try {
        const tables = await tableService.getTables();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateTable = async (req, res) => {
    try {
        const table = await tableService.updateTable(req.params.id, req.body);
        if (!table) return res.status(404).json({ message: "Mesa no encontrada" });
        res.json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTable = async (req, res) => {
    try {
        const table = await tableService.deleteTable(req.params.id);
        if (!table) return res.status(404).json({ message: "Mesa no encontrada" });
        res.json({ message: "Mesa eliminada con éxito" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};