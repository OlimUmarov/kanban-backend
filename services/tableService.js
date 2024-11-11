const Table = require('../models/tableModel');

const tableService = {
  async createTable(tableData) {
    try {
      const table = await Table.create(tableData);
      return table;
    } catch (error) {
      throw new Error('Ошибка при создании таблицы: ' + error.message);
    }
  },

  async getTablesByWorkspace(workspaceId) {
    try {
      const tables = await Table.findAll({ where: { workspaceId } });
      return tables;
    } catch (error) {
      throw new Error('Ошибка при получении таблиц: ' + error.message);
    }
  },

  async getTableById(tableId) {
    try {
      const table = await Table.findByPk(tableId);
      if (!table) throw new Error('Таблица не найдена');
      return table;
    } catch (error) {
      throw new Error('Ошибка при получении таблицы: ' + error.message);
    }
  },

  async updateTable(tableId, updateData) {
    try {
      const table = await Table.findByPk(tableId);
      if (!table) throw new Error('Таблица не найдена');
      await table.update(updateData);
      return table;
    } catch (error) {
      throw new Error('Ошибка при обновлении таблицы: ' + error.message);
    }
  },

  async deleteTable(tableId) {
    try {
      const table = await Table.findByPk(tableId);
      if (!table) throw new Error('Таблица не найдена');
      await table.destroy();
      return { message: 'Таблица удалена успешно' };
    } catch (error) {
      throw new Error('Ошибка при удалении таблицы: ' + error.message);
    }
  }
};

module.exports = tableService;
