const express = require('express');
const router = express.Router();
//const login = require('../middleware/login');

const usuariosController = require('../controllers/usuarios-controller');


router.post('/cadastro', usuariosController.postCadastro);
router.post('/token', usuariosController.postGeraToken );
router.post('/login', usuariosController.postlogin );

module.exports = router;