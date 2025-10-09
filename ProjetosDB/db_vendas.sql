SHOW DATABASES;

CREATE DATABASE vendas;

USE vendas;

CREATE TABLE produto(
codigo_produto INTEGER PRIMARY KEY AUTO_INCREMENT,
descricao_produto VARCHAR(30) NOT NULL,
preco_produto FLOAT NOT NULL);

CREATE TABLE nota_fiscal(
numero_nf INTEGER PRIMARY KEY AUTO_INCREMENT,
data_nf DATE NOT NULL,
valor_nf FLOAT NOT NULL);

CREATE TABLE itens(
produto_codigo_produto INTEGER PRIMARY KEY AUTO_INCREMENT,
nota_fiscal_numero_nf INTEGER ,
num_item INTEGER NOT NULL,
qtde_item INTEGER NOT NULL);  

ALTER TABLE produto MODIFY COLUMN descricao_produto VARCHAR(50);

ALTER TABLE nota_fiscal ADD COLUMN icms FLOAT AFTER numero_nf;

select *FROM nota_fiscal;

ALTER TABLE produto ADD COLUMN peso FLOAT;

ALTER TABLE itens DROP COLUMN nota_fiscal_numero_nf;
ALTER TABLE itens DROP COLUMN produto_codigo_produto;

ALTER TABLE itens MODIFY COLUMN num_item INTEGER PRIMARY KEY;

SELECT *FROM produto;

SELECT *FROM nota_fiscal;

ALTER TABLE nota_fiscal CHANGE COLUMN valor_nf valortotal_nf FLOAT;
ALTER TABLE nota_fiscal DROP COLUMN data_nf;

DROP TABLE itens;

RENAME TABLE nota_fiscal TO vendas;