const app = require('./app');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    await app.listen(process.env.PORT || 3000);
    logger.info(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
