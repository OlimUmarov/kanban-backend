const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const tableRoutes = require('./routes/tableRoutes');
const cardRoutes = require('./routes/cardRoutes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/cards', cardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Database connection failed:', err);
    process.exit(1);
  });
