const express = require('express');
const router = express.Router();

const moedasController = require('../controllers/moedas-controller')


router.get('/atualiza', moedasController.getAtualizaMoedas);


module.exports = router;