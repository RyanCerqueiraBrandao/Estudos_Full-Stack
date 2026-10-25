SELECT c.nome,c.cidade, COUNT(p.id_pedido) 
FROM clientes c 
JOIN pedidos p ON c.id_cliente = p.id_cliente
GROUP BY c.id_cliente;

SELECT nome_produto,preco FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos)
GROUP BY preco;

SELECT c.nome,SUM(p.valor_total) FROM pedidos p
JOIN clientes c ON c.id_cliente = p.id_cliente
GROUP BY (SELECT SUM(p.valor_total) FROM produtos p); 

SELECT p.nome_produto,SUM(i.quantidade)
FROM itens_pedido i
JOIN produtos p ON i.id_produto = p.id_produto
GROUP BY p.id_produto, p.nome_produto
HAVING SUM(i.quantidade) > 2
ORDER BY SUM(i.quantidade) DESC;

SELECT c.nome AS Nome_Cliente,p.data_pedido
FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
WHERE p.data_pedido BETWEEN '2024-03-01' AND '2024-04-30'
ORDER BY p.data_pedido;

SELECT p.nome_produto,p.categoria, COUNT(i.id_produto) FROM produtos p 
JOIN itens_pedido i ON p.id_produto = i.id_produto
GROUP BY p.categoria; 

SELECT nome,email FROM clientes WHERE nome LIKE 'M%' AND estado = 'RS' OR 'SP';

SELECT nome_produto,estoque FROM produtos WHERE estoque < (SELECT AVG(estoque) FROM produtos);

SELECT c.nome, COUNT(p.id_pedido) FROM pedidos p 
JOIN clientes c ON c.id_cliente = p.id_cliente
GROUP BY c.nome
HAVING COUNT(p.id_pedido) > 1 ;

SELECT p.nome_produto, COUNT(i.id_produto) FROM itens_pedido i 
JOIN produtos p ON p.id_produto = i.id_produto
GROUP BY p.nome_produto
ORDER BY COUNT(i.id_produto) DESC LIMIT 1;