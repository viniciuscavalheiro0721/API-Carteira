const express = require('express');
const router = express.Router();


const carteiraController = require('../controllers/carteira-controller');


router.get('/atualiza/:id_usuario', carteiraController.getAtualizaCarteira);
router.post('/inclui', carteiraController.postIncluiCarteira);
router.post('/exclui', carteiraController.postExcluiCarteira);
router.patch('/altera', carteiraController.patchAlteraCarteira);


module.exports = router;