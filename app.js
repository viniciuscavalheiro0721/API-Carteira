const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const rotaUsuarios = require('./routes/usuarios');
const rotaCarteira = require('./routes/carteira');
const rotaMoedas = require('./routes/moedas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //receber apenas dados simples 
app.use(bodyParser.json());//apenas json

app.use((req, res, next) => {

    res.header('Acces-Cotrol-Allow-Origin', '*');//http://servidor expecifico
    res.header('Acces-Cotrol-Allow-Header',

        'Origin, X-Requrested-With, Accept, Authorization, Content-Type'
    );

    if(req.method === 'OPTIONS'){

        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
        return res.status(200).send({});
    }

    next();
});


app.use('/usuario', rotaUsuarios);
app.use('/carteira', rotaCarteira);
app.use('/moedas', rotaMoedas);


app.use((req, res, next) => {

    const erro = new Error('Rota nao encontrada :/');
    erro.status = 404;
    next(erro);

});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    return res.send({

        mensagem: error.message

    });

});
module.exports = app;