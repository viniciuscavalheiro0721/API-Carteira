const express = require('express');
const router = express.Router();


const usuariosController = require('../controllers/usuarios-controller');


router.post('/cadastro', usuariosController.postCadastro);
router.post('/login', usuariosController.postLogin );


module.exports = router;