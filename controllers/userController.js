const userService = require('../services/userService');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'username, password, и email обязательны' });
        }
        if (password.length < 6 || password.length > 30) {
            return res.status(400).json({ error: 'Пароль должен содержать от 6 до 30 символов' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userService.createUser({ username, password: hashedPassword, email });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) {
            if (password.length < 6 || password.length > 30) {
                return res.status(400).json({ error: 'Пароль должен содержать от 6 до 30 символов' });
            }
            updates.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userService.updateUser(id, updates);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
