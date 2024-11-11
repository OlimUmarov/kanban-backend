const workspaceService = require('../services/workspaceService');

exports.createWorkspace = async (req, res, next) => {
    try {
        const { userId, title, description } = req.body;
        
        if (!userId || !title) {
            return res.status(400).json({ error: 'userId и title обязательны' });
        }

        const workspace = await workspaceService.createWorkspace({ userId, title, description });
        res.status(201).json(workspace);
    } catch (error) {
        next(error);
    }
};

exports.getAllWorkspaces = async (req, res, next) => {
    try {
        const workspaces = await workspaceService.getAllWorkspaces();
        res.status(200).json(workspaces);
    } catch (error) {
        next(error);
    }
};

exports.getWorkspaceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const workspace = await workspaceService.getWorkspaceById(id);
        if (!workspace) {
            return res.status(404).json({ error: 'Рабочая область не найдена' });
        }
        res.status(200).json(workspace);
    } catch (error) {
        next(error);
    }
};

exports.updateWorkspace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedWorkspace = await workspaceService.updateWorkspace(id, { title, description });
        if (!updatedWorkspace) {
            return res.status(404).json({ error: 'Рабочая область не найдена' });
        }
        res.status(200).json(updatedWorkspace);
    } catch (error) {
        next(error);
    }
};

exports.deleteWorkspace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await workspaceService.deleteWorkspace(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Рабочая область не найдена' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
