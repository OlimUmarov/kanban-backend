const Card = require('../models/cardModel');

const cardService = {
  async createCard(cardData) {
    try {
      const card = await Card.create(cardData);
      return card;
    } catch (error) {
      throw new Error('Ошибка при создании карточки: ' + error.message);
    }
  },

  async getCardsByTable(tableId) {
    try {
      const cards = await Card.findAll({ where: { tableId } });
      return cards;
    } catch (error) {
      throw new Error('Ошибка при получении карточек: ' + error.message);
    }
  },

  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) throw new Error('Карточка не найдена');
      return card;
    } catch (error) {
      throw new Error('Ошибка при получении карточки: ' + error.message);
    }
  },

  async updateCard(cardId, updateData) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) throw new Error('Карточка не найдена');
      await card.update(updateData);
      return card;
    } catch (error) {
      throw new Error('Ошибка при обновлении карточки: ' + error.message);
    }
  },

  async deleteCard(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      if (!card) throw new Error('Карточка не найдена');
      await card.destroy();
      return { message: 'Карточка удалена успешно' };
    } catch (error) {
      throw new Error('Ошибка при удалении карточки: ' + error.message);
    }
  }
};

module.exports = cardService;
