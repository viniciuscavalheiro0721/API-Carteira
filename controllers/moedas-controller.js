const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();



exports.getAtualizaMoedas = (req, res, next) =>{
    var func = async() => {
        const data = await CoinGeckoClient.coins.markets();
        const dados = data.data;
         
        var moeda = [];
        for(i in dados){
            moeda.push([dados[i].symbol, dados[i].name, dados[i].current_price]);
        }

    
        mysql.getConnection((error, conn) => {
    
            if (error) { return res.status(500).send({ error: error }) } // valida o mysql
            conn.query(
    
                'REPLACE INTO moedas (sigla_moeda, nome_moeda, valor_moeda) VALUES ?',
                [moeda],
                (error, result, field) => {
                    conn.release();
    
                    if (error) {
    
                        return res.status(500).send({
    
                            error: error
                        
    
                        });
    
                    }
             
                  
    
    
    
                }
    
    
            );
    
        });
    
        return res.status(200).send("ok")

    };
    func();

}

