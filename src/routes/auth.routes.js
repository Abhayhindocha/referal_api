const express = require('express');
const router = express.Router();
const { register, login, forgotPassword } = require('../controllers/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validation.middleware');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/forgot-password', forgotPassword);

module.exports = router; 