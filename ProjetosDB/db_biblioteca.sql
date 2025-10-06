-- Cria o Banco de Dados
create database biblioteca_escolar;

-- Habilita o Banco de Dados
use biblioteca_escolar;

-- Cria a tabela alunos com seus devidos atributos
CREATE TABLE alunos (
	id_aluno INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
    turma INT NOT NULL);

-- Cria a tabela emprestimos com uma chave estrangeira referenciando a tabela alunos
CREATE TABLE emprestimos (
	id_emprestimos INT AUTO_INCREMENT PRIMARY KEY,
    data_emprestimo DATE NOT NULL,
    id_aluno INT,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno));
 
 -- Insere valores na tabela alunos
INSERT INTO alunos(nome,turma) VALUES
	('Maria',58974),
    ('Tomas',78954);
    
-- Mostra os valores presentes na tabela alunos
SELECT *FROM alunos;

 -- Insere valores na tabela emprestimos
INSERT INTO emprestimos(data_emprestimo,id_aluno) VALUES('2025-09-19',4);

-- Mostra os valores presentes na tabela emprestimos
SELECT *FROM emprestimos;

-- Atualizando a tabela emprestimos
UPDATE emprestimos
set id_aluno = 2
where id_emprestimos = 1;

-- Unindo tabelas para não repetir registros
SELECT e.id_emprestimos,
	e.data_emprestimo,
    a.nome,
    a.turma
FROM emprestimos e INNER JOIN alunos a ON e.id_aluno = a.id_aluno;

-- Observando atributos sem Unir as Tabelas
SELECT alunos.id_aluno,nome,data_emprestimo FROM alunos,emprestimos;


