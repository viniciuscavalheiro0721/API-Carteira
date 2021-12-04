const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;



exports.getAtualizaCarteira = (req, res, next) =>{


    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(

            'SELECT * FROM carteira WHERE id_usuario = 1;',
            (error, result, field) => {
                conn.release();



                if (error) {

                    res.status(500).send({

                        error: error,
                        response: null

                    });

                }

                const response = {

                    quantidade: result.length,
                    carteiras: result.map(cart => {

                        return {

                            id_carteira: cart.id_carteira,
                            valor_base: cart.valor_base,
                            id_moeda: cart.id_moeda,
                            

                        }


                    })

                }

                return res.status(200).send(response)


            }


        )



    });

}

exports.getProdutosId = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(

            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.idproduto],
            (error, result, field) => {
                conn.release();

                if (error) {

                    return res.status(500).send({

                        error: error,
                        response: null

                    });

                }

                if(result.length == 0){

                    return res.status(404).send({

                        mensagem: "Não foi encontrado produto com este ID"

                    })


                }

                const response = {

                 
                    produto: {

                        id_produto: result[0].id_produtos,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {

                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                        

                    }

                }

                return res.status(200).send(response);


            }


        )



    });





}


exports.postProdutos = (req, res, next) => {
    const produto = {

        nome: req.body.nome,
        preco: req.body.preco

    };

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(

            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();

                if (error) {

                    return res.status(500).send({

                        error: error
                    

                    });

                }
         
              

                const response = {

                    mansagem: 'produto inserido com sucesso',
                    produtoCriado: {
                      
                        id_produto: result.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {

                            tipo: 'POST',
                            STATUS: '201',
                            
                        }
                        

                    }

                }

                const ipCliente = (req.headers['x-forwarded-for'] || '').split(',')[0] 
                || req.socket.remoteAddress;
    
           logs(req.usuario,response, ipCliente);
           
               return res.status(201).send(response);

            }


        );

    });



}

exports.patchProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
       
        if(req.body.id_produto == undefined){

            return res.status(404).send({

                mensagem: "Campo 'id_produto' nao foi Atribuido"

            })


        }

        if(req.body.nome == undefined){

            return res.status(404).send({

                mensagem: "Campo 'nome' nao foi Atribuido"

            })


        }

        if(req.body.preco == undefined){

            return res.status(404).send({

                mensagem: "Campo 'preco' nao foi Atribuido"

            })


        }
     
        conn.query(

            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produtos = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, field) => {
                conn.release();
       
                if(result.affectedRows == 0){

                    return res.status(404).send({

                        mensagem: "Não foi encontrado produto com este IDww"

                    })


                }


                if (error) {

                   
                    return res.status(500).send({
                        error: error
                   
                    });

                }

                const response = {

                    mansagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {

                        id_produto: req.body.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {

                            tipo: 'PATCH',
                         
                          
                        }
                        

                    }

                }

                const ipCliente = (req.headers['x-forwarded-for'] || '').split(',')[0] 
                || req.socket.remoteAddress;
    
           logs(req.usuario,response, ipCliente);
               return res.status(201).send(response);

            }


        );
        
    });



}