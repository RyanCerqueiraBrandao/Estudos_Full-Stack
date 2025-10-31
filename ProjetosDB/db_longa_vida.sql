CREATE DATABASE longa_vida;
USE longa_vida;

CREATE TABLE plano(
numero CHAR(2) NOT NULL PRIMARY KEY,
descricao CHAR(30),
valor DECIMAL(10,2));

INSERT INTO plano(numero,descricao,valor) VALUES
('B1','Básico 1',200.00),
('B2','Básico 2',150.00),
('B3','Básico 3',100.00),
('E1','Executivo 1',350.00),
('E2','Executivo 2',300.00),
('E3','Executivo 3',250.00),
('M1','Master 1',500.00),
('M2','Master 2',450.00),
('M3','Master 3',400.00);

CREATE TABLE associado (
plano CHAR(2) NOT NULL,
nome CHAR(45) NOT NULL PRIMARY KEY,
endereco CHAR(35),
cidade CHAR(20),
estado CHAR(2),
cep CHAR(9),
FOREIGN KEY (plano) REFERENCES plano(numero)
);


INSERT INTO associado (plano, nome,endereco,cidade,estado,cep) VALUES
('B1','JOSE ANTONIO DA SILVA', 'R.FELIPE DO AMAREAL, 3450', 'COTIA', 'SP', '06700-000'),
('B1','MARIA DA SILVA SOBRINHO', 'R.FELIPE DE JESUS, 1245', 'DIADEMA', 'SP', '09960-170'),
('B1','PEDRO JOSE DE OLIVEIRA', 'R.AGRIPINO DIAS, 155', 'COTIA', 'SP', '06700-011'),
('B2','ANTONIA DE FERNANDES', 'R.PE EZEQUIEL, 567', 'DIADEMA', 'SP', '09960-175'),
('B2','ANTONIO DO PRADO', 'R.INDIO TABAJARA, 55', 'GUARULHOS', 'SP', '07132-999'),
('B3','WILSON DE SENA', 'R.APARICA, 1234', 'OSACO', 'SP', '06293-001'),
('B3','SILVA DE ABREU', 'R.DR JOAO DA SILVA, 5', 'SANTO ANRE', 'SP', '09172-112'),
('E1','ODETE DA CONCEICAO', 'R.VOLUNTARIOS DA PATRIA, 10', 'SAO PAULO', 'SP', '07132-999'),
('E2','JOAO CARLOS MACHECO', 'R.VISITA ALEGRE , 500', 'SAO PAULO', 'SP', '04343-990'),
('E3','CONCEICAO DA SILVA', 'AV. VITORIO DO AMPARO, 11', 'MAUA', 'SP', '09132-988'),
('E3','PAULO BRUNO AMARAL', 'R.ARGENZIO BRILHANTE, 88', 'BARUERI', 'SP', '06460-999'),
('E3','WALDENICE DE OLIVEIRA', 'R.OURO VELHO, 12', 'BARUERI', 'SP', '06460-998'),
('E3','MARCOS DO AMARAL', 'R.OUVIDOR, 67', 'GUARULHOS', 'SP', '07031-555'),
('M1','MURILO DE SANTANA', 'R.PRATA DA CASA', 'BARUERI', 'SP', '06455-111'),
('M1','LUIZA ONOFRE FREITAS', 'R.VICENTE DE ABREU, 55', 'SANTO ANDRE', 'SP', '09060-667'),
('M2','MELISSSA DE ALMEIDA', 'R.FERNANDO ANTONIO, 23455', 'SAO PAULO', 'SP', '04848-987'),
('M2','JOAO INACIO DA CONCEICAO', 'R.PENELOPE CHARMOSA, 34', 'SUZANO', 'SP', '08670-888'),
('B3','AUGUSTA DE ABREU', 'AV.RIO DA SERRA, 909', 'SANTO ANDRE', 'SP', '09061-333'),
('M3','ILDA DE MELO DA CUNHA', 'AV. POR DO SOL, 546', 'SANTO ANDRE', 'SP', '09199-444'),
('M3','MARCOS DA CUNHA', 'AV.PEDROSO DE MORAES', 'SAO PAULO', 'SP', '04040-444');

SELECT nome,plano FROM associado;

SELECT COUNT(*) FROM associado WHERE plano = 'B1';

SELECT a.nome,a.plano,p.valor FROM plano p
JOIN associado a ON a.plano = p.numero;

SELECT nome,cidade FROM associado 
WHERE cidade = 'COTIA' OR cidade =  'DIADEMA';

SELECT a.nome,a.plano,p.valor FROM associado a 
JOIN plano p ON a.plano = p.numero
WHERE a.cidade = 'BARUERI' AND a.plano = 'M1';

SELECT a.nome,a.plano,p.valor FROM associado a 
JOIN plano p ON a.plano = p.numero
WHERE a.cidade = 'SAO PAULO'; 

SELECT a.*,p.* FROM associado a 
JOIN plano p ON a.plano = p.numero
WHERE a.nome LIKE '%SILVA%';

UPDATE plano
SET valor= valor * 1.1
WHERE numero LIKE 'B%';

UPDATE plano
SET valor= valor * 1.05
WHERE numero LIKE 'E%';

UPDATE plano
SET valor= valor * 1.03
WHERE numero LIKE 'M%';

UPDATE associado
SET plano = 'E3'
WHERE nome = 'PEDRO JOSE DE OLIVEIRA';

SELECT COUNT(*) FROM associado WHERE plano = 'E3';

SELECT a.nome,p.valor FROM associado a 
JOIN plano p ON p.numero = a.plano
WHERE a.plano LIKE '%1' ;

SELECT nome,plano FROM associado
WHERE plano LIKE 'E%';

SELECT nome,plano FROM associado
WHERE plano LIKE 'B%' OR plano LIKE 'M%';

DELETE FROM associado 
WHERE cidade = 'SANTO ANDRE';

SELECT a.nome,a.plano,p.valor FROM associado a
JOIN plano p ON p.numero = a.plano
WHERE a.cidade = 'SAO PAULO' AND a.plano = 'M2' OR a.plano = 'M3'
ORDER BY nome ASC;

SELECT * FROM associado a JOIN plano p
ON p.numero = a.plano
ORDER BY a.plano ASC;

SELECT p.numero, a.nome
FROM associado a
JOIN plano p ON p.numero = a.plano
ORDER BY p.numero ASC, a.nome DESC; 

SELECT p.numero AS plano, a.nome AS associado
FROM associado a
JOIN plano p ON p.numero = a.plano
WHERE p.numero NOT LIKE 'M%'
ORDER BY p.numero;

SELECT a.nome AS plano, p.descricao
FROM associado a
JOIN plano p ON p.numero = a.plano
ORDER BY a.nome ASC;

SELECT numero, valor FROM plano 
WHERE valor >= 300 AND valor <= 500;

SELECT a.nome, a.plano, p.descricao, p.valor
FROM associado a
JOIN plano p ON p.numero = a.plano
WHERE a.nome LIKE '%AMARAL%';

SELECT nome FROM associado 
WHERE cidade LIKE 'DIADEMA';

UPDATE plano 
SET valor = valor * 1.06
WHERE numero LIKE 'M%';

SELECT nome,cep FROM associado
WHERE cep LIKE '09%';