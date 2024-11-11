const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userService = {
  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({ 
        ...userData, 
        password: hashedPassword 
      });
      return user;
    } catch (error) {
      throw new Error('Ошибка при создании пользователя: ' + error.message);
    }
  },

  async getAllUsers() {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });
      return users;
    } catch (error) {
      throw new Error('Ошибка при получении пользователей: ' + error.message);
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) throw new Error('Пользователь не найден');
      return user;
    } catch (error) {
      throw new Error('Ошибка при получении пользователя: ' + error.message);
    }
  },

  async updateUser(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Пользователь не найден');
      
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      await user.update(updateData);
      return user;
    } catch (error) {
      throw new Error('Ошибка при обновлении пользователя: ' + error.message);
    }
  },

  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Пользователь не найден');
      await user.destroy();
      return { message: 'Пользователь успешно удален' };
    } catch (error) {
      throw new Error('Ошибка при удалении пользователя: ' + error.message);
    }
  }
};

module.exports = userService;
