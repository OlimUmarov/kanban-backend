const tableService = require('../services/tableService');

exports.createTable = async (req, res, next) => {
    try {
        const { workspaceId, title, description } = req.body;
        if (!workspaceId || !title) {
            return res.status(400).json({ error: 'workspaceId и title обязательны' });
        }
        const table = await tableService.createTable({ workspaceId, title, description });
        res.status(201).json(table);
    } catch (error) {
        next(error);
    }
};

exports.getAllTables = async (req, res, next) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json(tables);
    } catch (error) {
        next(error);
    }
};

exports.getTableById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const table = await tableService.getTableById(id);
        if (!table) {
            return res.status(404).json({ error: 'Таблица не найдена' });
        }
        res.status(200).json(table);
    } catch (error) {
        next(error);
    }
};

exports.updateTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTable = await tableService.updateTable(id, { title, description });
        if (!updatedTable) {
            return res.status(404).json({ error: 'Таблица не найдена' });
        }
        res.status(200).json(updatedTable);
    } catch (error) {
        next(error);
    }
};

exports.deleteTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await tableService.deleteTable(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Таблица не найдена' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
