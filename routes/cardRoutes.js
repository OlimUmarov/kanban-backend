const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.post('/', cardController.createCard);

router.get('/table/:tableId', cardController.getCardsByTable);

router.get('/:id', cardController.getCardById);

router.put('/:id', cardController.updateCard);

router.delete('/:id', cardController.deleteCard);

module.exports = router;
