import Table from '../models/table.js';

export const createTable = async (tableData) => {
    const table = new Table(tableData);
    return await table.save();
};

export const getTables = async () => {
    return await Table.find().sort({ number: 1 }); // Listar todas las mesas
};
export const updateTable = async (id, updateData) => {
    return await Table.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};

export const deleteTable = async (id) => {
    return await Table.findByIdAndDelete(id);
};