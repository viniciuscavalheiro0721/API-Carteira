const mysql = require('../mysql').pool;

module.exports = (logUser, desc, ip) => {


    mysql.getConnection((error, conn) => {
      

        if (error) { return res.status(500).send({ error: error }) } // valida o mysql
        conn.query(
            'INSERT INTO log_atualiza_merc (cd_login, id_usuario, tx_descricao, ip_usuario) VALUES (?,?,?,?)',
            [logUser.nome, logUser.id_usuario, JSON.stringify(desc), ip ],
            (error, result, field) => {
                conn.release();

            }


        );

    });


}
