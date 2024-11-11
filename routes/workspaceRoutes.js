const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');

router.post('/', workspaceController.createWorkspace);

router.get('/user/:userId', workspaceController.getWorkspacesByUser);

router.get('/:id', workspaceController.getWorkspaceById);

router.put('/:id', workspaceController.updateWorkspace);

router.delete('/:id', workspaceController.deleteWorkspace);

module.exports = router;
