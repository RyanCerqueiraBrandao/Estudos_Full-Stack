-- CRIAR BANCO
CREATE DATABASE techvendas;
USE techvendas;

-- TABELA PRODUTOS
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    estoque INT
);

-- TABELA VENDEDORES
CREATE TABLE vendedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    salario DECIMAL(10,2)
);

-- TABELA VENDAS
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    id_vendedor INT,
    quantidade INT,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produtos(id),
    FOREIGN KEY (id_vendedor) REFERENCES vendedores(id)
);

-- TABELA LOG
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA BACKUP DE EXCLUSÕES
CREATE TABLE backup_produtos (
    id INT,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    estoque INT,
    data_backup TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);