const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.postUsers);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id', userController.updateUser);
router.put('/users/:id', userController.updateUserById);
module.exports = router;
