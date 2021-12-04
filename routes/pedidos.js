const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.status(200).send({

        mensagem: 'Usando o GET da nova rota'

    });

});

router.get('/:idpedidos', (req, res, next) => {

    const id = req.params.idpedidos;
    res.status(200).send({

        mensagem: 'Usando GET da nova rota passando variavel via url',
        variavel: id

    });

});


router.post('/', (req, res, next) => {

    const pedido ={

        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade

    };

    res.status(201).send({

        mensagem: 'Usando Post da nova rota',
        pedidoCriado: pedido

    });

});

module.exports = router;