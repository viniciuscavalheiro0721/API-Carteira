const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

/*
Inclui carteira 
Altera Carteira 
Deleta Carteira 

*/
exports.getAtualizaCarteira = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(

            'UPDATE carteira c SET ajuste = ((((SELECT valor_moeda FROM moedas m  WHERE m.sigla_moeda = c.sigla_moeda )*100)/c.valor_moeda)-100), valor_atual = ((ajuste/100)*valor)+valor WHERE id_usuario = ?;',
            [req.params.id_usuario],
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

                        mensagem: "Não foi encontrado usuario com este ID"

                    })


                }

                const response = {

                 
                    response: {

                       

                    tipo: 'GET',
                    mensagem: 'Carteira Atualizada com sucesso!'
                   
                        
                        

                    }

                }

                return res.status(200).send(response);


            }


        )



    });





}


exports.postIncluiCarteira = (req, res, next) => {
  
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(

            'INSERT INTO carteira (valor, valor_atual, valor_moeda, sigla_moeda, id_usuario) VALUES (?,?,?,?,?)',
            [req.body.valor, req.body.valor,req.body.valor_moeda, req.body.sigla, req.body.id_usuario],
            (error, result, field) => {
                conn.release();

                if (error) {

                    return res.status(500).send({

                        error: error
                    

                    });

                }
         
              

                const response = {

                    mansagem: 'carteira inserida com sucesso',
                    produtoCriado: {
                        valor: result.valor,
                        sigla: req.body.sigla,
                        id_usuario: req.body.id_usuario,
                        request: {

                            tipo: 'POST',
                            STATUS: '201',
                            
                        }
                        

                    }

                }

    
           
               return res.status(201).send(response);

            }


        );

    });



}

exports.postExcluiCarteira = (req, res, next) => {
  
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
       
        if(req.body.id_carteira == undefined){

            return res.status(404).send({

                mensagem: "Campo 'id_carteira' nao foi Atribuido"

            })


        }

 

     
        conn.query(

            'DELETE FROM carteira WHERE id_carteira = ?;',
            [req.body.id_carteira],
            (error, result, field) => {
                conn.release();
       
                if(result.affectedRows == 0){

                    return res.status(404).send({

                        mensagem: "Não foi encontrada carteira com este ID"

                    })


                }


                if (error) {

                   
                    return res.status(500).send({
                        error: error
                   
                    });

                }

                const response = {

                    mansagem: 'Carteira Excluida com sucesso'

                }

         
    
               return res.status(201).send(response);

            }


        );
        
    });


}

exports.patchAlteraCarteira = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
       
        if(req.body.id_carteira == undefined){

            return res.status(404).send({

                mensagem: "Campo 'id_carteira' nao foi Atribuido"

            })


        }

 

        if(req.body.valor == undefined){

            return res.status(404).send({

                mensagem: "Campo 'valor' nao foi Atribuido"

            })


        }
     
        conn.query(

            'UPDATE carteira SET valor = ?, valor_atual = ? WHERE id_carteira = ?',
            [req.body.valor, req.body.valor,  req.body.id_carteira],
            (error, result, field) => {
                conn.release();
    
                if(result.affectedRows == 0){

                    return res.status(404).send({

                        mensagem: "Não foi encontrada carteira com este ID"

                    })


                }


                if (error) {

                   
                    return res.status(500).send({
                        error: error
                   
                    });

                }

                const response = {

                    mansagem: 'Carteira atualizada com sucesso',
                    Carteira: {

                        valor: req.body.valor,
                        sigla: req.body.sigla,
                        id_usuario: req.body.id_usuario,
                        request: {

                            tipo: 'PATCH',
                         
                          
                        }
                        

                    }

                }

         
    
               return res.status(201).send(response);

            }


        );
        
    });
}