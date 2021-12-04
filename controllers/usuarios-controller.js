
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postCadastro = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query('SELECT * FROM usuarios WHERE nome = ?',
            [req.body.nome],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) {
                    res.status(409).send({ mensagem: 'Usuario Já Cadastrado' })
                } else {

                    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                        conn.query(
                            'INSERT INTO usuarios (nome,password) VALUES (?,?)',
                            [req.body.nome, hash],
                            (error, results) => {

                                if (error) { return res.status(500).send({ error: error }) }

                                const response = {

                                    mensagem: "Usuario Criado com Sucesso!",
                                    usuarioCriado: {
                                        id_usuario: results.insertId,
                                        nome: req.body.nome
                                    }
                                }
                                return res.status(201).send(response);
                            }
                        )
                    })

                }


            })



    });



}

exports.postLogin = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query('SELECT * FROM usuarios WHERE nome = ?',
            [req.body.nome],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length < 1) {
                    return res.status(401).send({ mensagem: 'Falha na Autenticação' })
                } 

               if(bcrypt.compareSync(req.body.password, results[0].password)){

        

                const token = jwt.sign({
                    id_usuario: results[0].id_usuarios,
                    nome: results[0].nome
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "180d"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token
                });


               }else{

              return  res.status(401).send({ mensagem: 'Falha na Autenticação' })

               }

                   


            })



    });



}