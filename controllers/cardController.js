const cardService = require('../services/cardService');

exports.createCard = async (req, res, next) => {
    try {
        const { tableId, title } = req.body;
        if (!tableId || !title) {
            return res.status(400).json({ error: 'tableId и title обязательны' });
        }
        const card = await cardService.createCard({ tableId, title });
        res.status(201).json(card);
    } catch (error) {
        next(error);
    }
};

exports.getAllCards = async (req, res, next) => {
    try {
        const cards = await cardService.getAllCards();
        res.status(200).json(cards);
    } catch (error) {
        next(error);
    }
};

exports.getCardById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await cardService.getCardById(id);
        if (!card) {
            return res.status(404).json({ error: 'Карточка не найдена' });
        }
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

exports.updateCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedCard = await cardService.updateCard(id, { title });
        if (!updatedCard) {
            return res.status(404).json({ error: 'Карточка не найдена' });
        }
        res.status(200).json(updatedCard);
    } catch (error) {
        next(error);
    }
};

exports.deleteCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await cardService.deleteCard(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Карточка не найдена' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}