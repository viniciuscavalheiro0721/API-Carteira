const express = require('express');
const router = express.Router();


const carteiraController = require('../controllers/carteira-controller');


router.get('/atualiza', carteiraController.getAtualizaCarteira);

module.exports = router;