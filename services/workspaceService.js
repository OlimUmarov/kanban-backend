const Workspace = require('../models/workspaceModel.js'); // Импорт модели рабочего пространства

const workspaceService = {
  // Создание нового рабочего пространства
  async createWorkspace(workspaceData) {
    try {
      const workspace = await Workspace.create(workspaceData);
      return workspace;
    } catch (error) {
      throw new Error('Ошибка при создании рабочего пространства: ' + error.message);
    }
  },

  async getWorkspacesByUser(userId) {
    try {
      const workspaces = await Workspace.findAll({ where: { userId } });
      return workspaces;
    } catch (error) {
      throw new Error('Ошибка при получении рабочих пространств: ' + error.message);
    }
  },

  async getWorkspaceById(workspaceId) {
    try {
      const workspace = await Workspace.findByPk(workspaceId);
      if (!workspace) throw new Error('Рабочее пространство не найдено');
      return workspace;
    } catch (error) {
      throw new Error('Ошибка при получении рабочего пространства: ' + error.message);
    }
  },

  async updateWorkspace(workspaceId, updateData) {
    try {
      const workspace = await Workspace.findByPk(workspaceId);
      if (!workspace) throw new Error('Рабочее пространство не найдено');
      await workspace.update(updateData);
      return workspace;
    } catch (error) {
      throw new Error('Ошибка при обновлении рабочего пространства: ' + error.message);
    }
  },

  async deleteWorkspace(workspaceId) {
    try {
      const workspace = await Workspace.findByPk(workspaceId);
      if (!workspace) throw new Error('Рабочее пространство не найдено');
      await workspace.destroy();
      return { message: 'Рабочее пространство успешно удалено' };
    } catch (error) {
      throw new Error('Ошибка при удалении рабочего пространства: ' + error.message);
    }
  }
};

module.exports = workspaceService;
