const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const produtosController = require('../controllers/produtos-controller');


router.get('/',login, produtosController.getProdutos);
router.get('/:idproduto',login, produtosController.getProdutosId);
router.post('/',login, produtosController.postProdutos);
router.patch('/',login, produtosController.patchProdutos);




module.exports = router;