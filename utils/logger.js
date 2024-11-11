const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

function logMessage(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Ошибка при записи в лог-файл', err);
    }
  });
}

const logger = {
  info: (message) => logMessage('info', message),
  warn: (message) => logMessage('warn', message),
  error: (message) => logMessage('error', message),
  debug: (message) => logMessage('debug', message)
};

module.exports = logger;
