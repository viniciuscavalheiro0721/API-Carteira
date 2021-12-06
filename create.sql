CREATE TABLE `carteira` (
  `id_carteira` int(11) NOT NULL AUTO_INCREMENT,
  `valor` float NOT NULL,
  `valor_atual` float NOT NULL,
  `valor_moeda` float NOT NULL,
  `sigla_moeda` char(10) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `ajuste` float DEFAULT NULL,
  `ultatu` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_carteira`,`sigla_moeda`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

CREATE TABLE `moedas` (
  `sigla_moeda` char(10) NOT NULL,
  `nome_moeda` varchar(15) NOT NULL,
  `valor_moeda` float NOT NULL,
  `ultatu` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`sigla_moeda`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
