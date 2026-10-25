CREATE DATABASE loja;

USE loja;

CREATE TABLE clientes (
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL);

CREATE TABLE produtos (
	id_produto INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL);
    
CREATE TABLE compras (
	id_compra INT AUTO_INCREMENT PRIMARY KEY,
	forma_pgto VARCHAR(50) NOT NULL,
    data_compra DATE NOT NULL,
    qtd INT NOT NULL,
    id_cliente_compra INT,
    id_produto_compra INT,
    FOREIGN KEY (id_cliente_compra) REFERENCES clientes(id_cliente) ON UPDATE CASCADE,
    FOREIGN KEY (id_produto_compra) REFERENCES produtos(id_produto) ON UPDATE CASCADE);
    
INSERT INTO clientes(nome) VALUES
('Gabriel Santos'),
('Jorge Emauel Silva'),
('Melissa de Sá'),
('Carlos de Castro');

INSERT INTO produtos(descricao,preco) VALUES
('Cimento', 64.99),
('Massa Corrida', 24.99),
('enxada',39.99),
('Porcelanato Tipo B 30x30', 19.99),
('Porcelanato Tipo A 60x60', 49.99),
('Tinta Suvinil 20L', 69.99);

INSERT INTO compras(forma_pgto,data_compra,qtd,id_cliente_compra,id_produto_compra) VALUES
('Cartao','2025-06-25',6,4,1),
('A vista','2025-06-25',2,4,2),
('Cartao','2025-06-15',6,3,5),
('Cartao','2025-06-07',6,1,3);

SELECT cl.id_cliente,
	cl.nome,
    co.forma_pgto,
    co.data_compra,
    co.qtd
    FROM clientes cl INNER JOIN compras co ON cl.id_cliente = co.id_cliente_compra;
    


    