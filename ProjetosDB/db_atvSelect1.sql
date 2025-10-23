USE lojasmart;

-- Listar todos os clientes.
SELECT * FROM clientes;
SELECT * FROM produtos;

-- Mostrar apenas o nome e a cidade da tabela clientes.
SELECT nome, cidade FROM clientes;

-- Mostrar apenas o nome e o preco da tabela produtos.
SELECT nome, preco FROM produtos;

-- Mostrar tudo da tabela produtos dos produtos com categoria "Acessórios".
SELECT * FROM produtos WHERE categoria = 'Acessórios';

-- Mostrar os clientes que moram em "São paulo"
SELECT nome,cidade FROM clientes WHERE cidade = 'São paulo';

-- Mostrar os produtos com preço maior que 1.000;
SELECT nome, preco FROM produtos WHERE preco > 1000;

-- Mostrar tudo da tabela vendas Onde o Mes for Junho e o ano for 2024.
SELECT * FROM vendas WHERE MONTH(data_venda) = 6 AND YEAR(data_venda) = 2024;

-- Mostrar as cidade distintas da tabela clientes.
SELECT DISTINCT cidade FROM clientes;

-- Mostrar os nomes da tabela produtos em ordem alfabetica (ASC = ascendente) .
SELECT nome FROM produtos ORDER BY nome ASC;

-- Mostrar os produtos em ordem maior para o menor (desc = decrescente).
SELECT nome FROM produtos ORDER BY nome DESC;

-- Mostrar o nome e o preco da tabela produto em ordem crescente de nome e preço.
SELECT nome,preco FROM produtos ORDER BY nome AND preco ASC;

-- Mostrar nome e estoque da tabela produtos onde o estoque for menor que 20.
SELECT nome,estoque FROM produtos WHERE estoque<20;

-- Mostre o nome e idade dos clientes com idade entre 25 e 35 anos.
SELECT nome,idade FROM clientes WHERE idade BETWEEN 25 AND 35;

-- Mostrar os produtos da categoria "informática" com preço menor que 2.000.
SELECT nome,preco FROM produtos WHERE categoria = 'informática' AND preco < 2000;

-- Mostrar tudo dos cinco primeiros elementos registrados na tabela vendas.
SELECT * FROM vendas LIMIT 5;

-- Mostrar a quantidade total de registros da tabela produtos (o AS serve para dar um apelido).
SELECT COUNT(*) AS total_produtos FROM vendas; 
 
 -- Mostrar a média de idade dos clientes (o AS serve para dar um apelido).
 SELECT AVG(idade) AS media_idade FROM clientes;
 
 -- Mostrar o produto mais caro.
 SELECT nome, preco FROM produtos ORDER BY preco DESC LIMIT 1;
 
 -- Mostrar o produto mais barato.
 SELECT nome, preco FROM produtos ORDER BY preco ASC LIMIT 1;
 
 -- Mostrar o total de registros agrupando pro categoria.
 SELECT categoria, COUNT(*) AS total FROM produtos GROUP BY categoria;
 
 -- Mostrar o nome do cliente e o nome do produto em cada venda.
 SELECT c.nome AS cliente, p.nome AS produtos
FROM vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN produtos p ON v.id_produto = p.id_produto;

 -- Mostrar o nome do cliente e o nome do produto em cada venda Feitas em julho de 2024.
SELECT c.nome, p.nome AS produto, v.quantidade 
FROM vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN produtos p ON v.id_produto = p.id_produto
WHERE MONTH(v.data_venda) = 6
AND YEAR(v.data_venda) = 2024;

-- Mostrar o nome dos cliente que compraram produtos da categoria "informatica".
SELECT c.nome, p.nome AS produto, p.categoria
FROM vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN produtos p ON v.id_produto = v.id_produto
WHERE p.categoria = 'informática';

-- Mostrar o total de vendas (quantidade) por clientes.
SELECT c.nome, SUM(v.quantidade) AS total_itens
FROM vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
GROUP BY c.nome;

-- Mostrar o total de vendas (em R$) por produto
SELECT p.nome, SUM(V.quantidade * p.preco)
AS total_vendido
FROM vendas v
JOIN produtos p ON v.id_produto = p.id_produto
GROUP BY p.nome;

-- Mostrar o total de vendas realizadas em cada mês. 
SELECT MONTH(data_venda) AS mes, COUNT(*) 
AS total_vendas
FROM vendas
GROUP BY MONTH(data_venda)
ORDER BY mes;

-- Mostrar o nome do cliente que fez mais compras.
SELECT c.nome, COUNT(*) AS total_compras
FROM vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN produtos p ON v.id_produto = p.id_produto
GROUP BY c.nome;

-- Mostrar o produto mais vendido (maior soma de quantidade).
SELECT p.nome, SUM(v.quantidade) AS total_vendido
FROM vendas v
JOIN produtos p ON v.id_produto = p.id_produto
GROUP BY p.nome
ORDER BY total_vendido DESC
LIMIT 1;