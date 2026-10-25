CREATE DATABASE aws;
USE aws;

CREATE TABLE pedidos(
	id_pedidos INT PRIMARY KEY AUTO_INCREMENT,
	produto VARCHAR(50),
	quantidade INT,
	preco_unitario DECIMAL(10,2),
	valor_total DECIMAL(10,2)
);

INSERT INTO pedidos(produto,quantidade,preco_unitario) VALUES
('teclado',2,150.00),
('mouse',3,80.00);

DELIMITER //
CREATE PROCEDURE calcular_valor_total(IN p_id INT)
BEGIN 
	UPDATE pedidos
    SET valor_total = quantidade * preco_unitario
    WHERE id_pedidos = p_id;
    END
//DELIMITER    

CALL calcular_valor_total(1);

SELECT *FROM pedidos;