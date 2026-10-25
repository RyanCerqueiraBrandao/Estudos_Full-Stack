CREATE DATABASE LojaDB;
USE LojaDB;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cidade VARCHAR(50),
    estado VARCHAR(2)
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    categoria VARCHAR(50),
    preco DECIMAL(10,2)
);

CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_produto INT,
    quantidade INT,
    data_venda DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Inserindo dados de exemplo
INSERT INTO clientes (nome, cidade, estado) VALUES
('João Silva', 'São Paulo', 'SP'),
('Maria Souza', 'Rio de Janeiro', 'RJ'),
('Carlos Lima', 'Belo Horizonte', 'MG'),
('Ana Costa', 'Curitiba', 'PR'),
('Fernanda Dias', 'Salvador', 'BA');

INSERT INTO produtos (nome, categoria, preco) VALUES
('Notebook', 'Informática', 3500.00),
('Mouse', 'Informática', 80.00),
('Geladeira', 'Eletrodoméstico', 2500.00),
('TV 50"', 'Eletrônico', 3200.00),
('Cafeteira', 'Eletrodoméstico', 300.00);

INSERT INTO vendas (id_cliente, id_produto, quantidade, data_venda) VALUES
(1, 1, 1, '2025-01-10'),
(2, 2, 2, '2025-01-12'),
(3, 3, 1, '2025-02-05'),
(4, 4, 1, '2025-02-10'),
(5, 5, 3, '2025-03-01');



-- VIEW 1 – Todos os clientes
CREATE VIEW vw1 AS 
SELECT * FROM CLIENTES;

-- VIEW 2 – Produtos e seus preços
CREATE VIEW vw2 AS 
SELECT nome,preco FROM produtos;

-- VIEW 3 – Clientes de São Paulo
CREATE VIEW vw3 AS
SELECT nome,cidade FROM clientes
WHERE cidade LIKE 'são paulo';

-- VIEW 4 – Vendas com nome do cliente
CREATE VIEW vw4 AS
SELECT c.nome, COUNT(v.id_cliente) FROM vendas v 
JOIN clientes c ON c.id = v.id_cliente
GROUP BY c.nome
ORDER BY  COUNT(v.id_cliente);

-- VIEW 5 – Vendas detalhadas (cliente + produto + quantidade)
CREATE VIEW vw5 AS
SELECT c.nome AS NOME_CLIENTE,p.nome AS NOME_PRODUTO,v.quantidade 
FROM vendas v JOIN clientes c ON c.id = v.id_cliente
JOIN produtos p ON p.id = v.id_produto
GROUP BY NOME_CLIENTE; 

-- VIEW 6 – Total vendido por cliente
CREATE VIEW vw6 AS
SELECT c.nome, SUM(p.preco) FROM vendas v
JOIN clientes c ON c.id = v.id_cliente
JOIN produtos p ON p.id = v.id_produto
GROUP BY c.nome;

-- VIEW 7 – Produtos mais caros que R$ 1000
CREATE VIEW vw7 AS
SELECT nome,preco FROM produtos 
WHERE preco > 1000;

-- VIEW 8 – Quantidade total vendida por produto
CREATE VIEW vw8 AS
SELECT p.nome,SUM(v.id_produto) FROM vendas v
JOIN produtos p ON v.id_produto = p.id
GROUP BY p.nome;

-- VIEW 9 – Clientes e número de compras
CREATE VIEW vw9 AS
SELECT c.nome, COUNT(v.id_cliente) FROM vendas v 
JOIN clientes c ON v.id_cliente = c.id
GROUP BY c.nome;

-- VIEW 10 – Vendas realizadas em fevereiro
CREATE VIEW vw10 AS
SELECT * FROM vendas WHERE MONTH(data_venda) = '02';

-- VIEW 11 – Produtos da categoria Informática
CREATE VIEW vw11 AS
SELECT nome,categoria,preco FROM produtos 
WHERE categoria LIKE 'INFORMATICA';
 
-- VIEW 12 – Média de preço dos produtos
CREATE VIEW vw12 AS
SELECT AVG(preco) AS Media_preco FROM produtos;

-- VIEW 13 – Clientes da região Sudeste
CREATE VIEW vw13 AS
SELECT nome,estado FROM clientes
WHERE estado LIKE 'SP' OR estado LIKE 'MG' OR estado LIKE'RJ' OR estado LIKE 'ES'
GROUP BY nome;

-- VIEW 14 – Produtos e valor total vendido
CREATE VIEW vw14 AS
SELECT p.nome, SUM(v.quantidade * p.preco) FROM vendas v
JOIN produtos p ON p.id = v.id_produto
GROUP BY p.nome;

-- VIEW 15 – Produtos nunca vendidos
CREATE VIEW vw15 AS
SELECT p.nome FROM vendas v 
JOIN produtos p ON p.id = v.id_produto
WHERE v.id_produto IS NULL;

-- VIEW 16 – Clientes que compraram mais de uma vez
CREATE VIEW vw16 AS
SELECT c.nome, COUNT(v.id) FROM vendas v
JOIN clientes c ON c.id = v.id_cliente
GROUP BY c.nome
HAVING COUNT(v.id)  > 1;

-- VIEW 17 – Faturamento total da loja
CREATE VIEW vw17 AS
SELECT SUM(v.quantidade * p.preco) FROM vendas v
JOIN produtos p ON p.id = v.id_produto;

-- VIEW 18 – Última venda registrada
CREATE VIEW vw18 AS
SELECT id,quantidade,data_venda FROM vendas 
ORDER BY data_venda DESC LIMIT 1;

-- VIEW 19 – Clientes e produtos comprados
CREATE VIEW vw19 AS
SELECT c.nome,p.nome AS produto FROM vendas v
JOIN clientes c ON c.id = v.id_cliente
JOIN produtos p ON p.id = v.id_produto;

-- VIEW 20 – Ranking de clientes por valor gasto
CREATE VIEW vw20 AS
SELECT c.nome, SUM(v.quantidade * p.preco) FROM vendas v 
JOIN clientes c ON c.id = v.id_cliente
JOIN produtos p ON p.id = v.id_produto
GROUP BY c.nome
ORDER BY SUM(v.quantidade * p.preco) DESC;