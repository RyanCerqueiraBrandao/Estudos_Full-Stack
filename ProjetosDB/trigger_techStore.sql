USE techvendas;

DROP DATABASE techvendas;

INSERT INTO produtos (nome, preco, estoque) VALUES
('Notebook Dell Inspiron', 3500.00, 15),
('Smartphone Samsung A34', 1800.00, 30),
('Monitor LG 24"', 899.90, 20),
('Teclado Mecânico Redragon', 250.00, 40),
('Mouse Gamer Logitech', 150.00, 50),
('Headset HyperX Cloud', 320.00, 25),
('Impressora HP LaserJet', 780.00, 12),
('Pendrive 64GB Kingston', 45.00, 100),
('SSD NVMe 1TB', 420.00, 18),
('Roteador TP-Link AC1200', 199.90, 22);

INSERT INTO vendedores (nome, salario) VALUES
('Carlos Silva', 2500.00),
('Ana Paula Santos', 2700.00),
('João Almeida', 2600.00),
('Fernanda Costa', 2800.00),
('Ricardo Martins', 3000.00),
('Juliana Rocha', 2550.00),
('Marcos Pereira', 2900.00),
('Patrícia Gomes', 2650.00),
('Gustavo Oliveira', 3100.00),
('Larissa Nunes', 2750.00);

INSERT INTO vendas (id_produto, id_vendedor, quantidade) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 2, 4),
(4, 5, 3),
(5, 4, 2),
(6, 7, 1),
(7, 6, 2),
(8, 8, 5),
(9, 9, 1),
(10, 10, 3);

INSERT INTO logs (descricao) VALUES
('Produto cadastrado no sistema'),
('Venda registrada'),
('Estoque atualizado'),
('Vendedor cadastrado'),
('Tentativa de login'),
('Produto removido'),
('Backup realizado'),
('Erro de validação'),
('Atualização de preço'),
('Relatório gerado');

INSERT INTO backup_produtos (id, nome, preco, estoque) VALUES
(11, 'Webcam Full HD Logitech', 220.00, 10),
(12, 'Caixa de Som JBL Go', 150.00, 25),
(13, 'Cabo HDMI 2.0 2m', 35.00, 60),
(14, 'Mousepad Gamer', 40.00, 70),
(15, 'HD Externo 1TB', 320.00, 12),
(16, 'Fonte Corsair 550W', 420.00, 8),
(17, 'Placa de Vídeo GTX 1650', 1200.00, 5),
(18, 'Cooler Fan RGB', 55.00, 30),
(19, 'Teclado Semi-mecânico', 120.00, 45),
(20, 'Hub USB 3.0', 75.00, 20);


DELIMITER $$
CREATE TRIGGER tgr_valida_estoque
BEFORE INSERT ON vendas
FOR EACH ROW
BEGIN
	DECLARE estoque_atual INT;
    SELECT estoque INTO estoque_atual
    FROM produtos 
    WHERE id = NEW.id_produto;
    IF estoque_atual < NEW.quantidade THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'ERRO: quantidade da venda maior que o estoque disponível';
    END IF;
    
    END $$
    DELIMITER;
