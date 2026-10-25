-- Criar o banco de dados
CREATE DATABASE LojaTech;
USE LojaTech;

-- Tabela de Clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2),
    data_cadastro DATE
);

-- Tabela de Produtos
CREATE TABLE Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    preco DECIMAL(10,2),
    estoque INT
);

-- Tabela de Pedidos
CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    data_pedido DATE,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Tabela de Itens do Pedido (ligação entre Pedidos e Produtos)
CREATE TABLE Itens_Pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    subtotal DECIMAL(10,2),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);


-- Inserir Clientes
INSERT INTO Clientes (nome, email, cidade, estado, data_cadastro) VALUES
('Ana Beatriz', 'ana.b@gmail.com', 'São Paulo', 'SP', '2024-01-15'),
('Carlos Lima', 'carlos.l@gmail.com', 'Belo Horizonte', 'MG', '2024-02-10'),
('Fernanda Souza', 'fernanda.s@gmail.com', 'Curitiba', 'PR', '2024-03-20'),
('João Pedro', 'joao.p@gmail.com', 'Rio de Janeiro', 'RJ', '2024-01-25'),
('Mariana Costa', 'mariana.c@gmail.com', 'Porto Alegre', 'RS', '2024-04-05');

-- Inserir Produtos
INSERT INTO Produtos (nome_produto, categoria, preco, estoque) VALUES
('Notebook Dell XPS', 'Informática', 8500.00, 15),
('Mouse Logitech MX', 'Periféricos', 350.00, 80),
('Teclado Mecânico HyperX', 'Periféricos', 600.00, 50),
('Monitor LG 27"', 'Monitores', 1500.00, 25),
('Headset Razer Kraken', 'Áudio', 700.00, 30),
('Impressora HP Ink Tank', 'Impressoras', 1200.00, 10);

-- Inserir Pedidos
INSERT INTO Pedidos (id_cliente, data_pedido, valor_total) VALUES
(1, '2024-02-20', 9200.00),
(2, '2024-03-01', 1850.00),
(3, '2024-03-18', 1500.00),
(1, '2024-04-02', 4200.00),
(4, '2024-04-10', 2400.00),
(5, '2024-04-18', 1800.00);

-- Inserir Itens_Pedido
INSERT INTO Itens_Pedido (id_pedido, id_produto, quantidade, subtotal) VALUES
(1, 1, 1, 8500.00),
(1, 2, 2, 700.00),
(2, 3, 2, 1200.00),
(2, 2, 1, 350.00),
(3, 4, 1, 1500.00),
(4, 5, 3, 2100.00),
(4, 2, 6, 2100.00),
(5, 6, 2, 2400.00),
(6, 3, 3, 1800.00);