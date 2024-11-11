function errorHandler(err, req, res, next) {
    console.error(err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ error: 'Ошибка базы данных. Попробуйте снова.' });
    }
  
    if (err.message.includes('не найден')) {
      return res.status(404).json({ error: err.message });
    }
  
    return res.status(500).json({ error: 'Что-то пошло не так. Попробуйте снова позже.' });
  }
  
  module.exports = errorHandler;
  