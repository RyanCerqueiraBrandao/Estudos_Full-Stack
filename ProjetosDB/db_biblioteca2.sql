CREATE DATABASE biblioteca;
USE BIBLIOTECA;
CREATE TABLE autores(
id_autor INT PRIMARY KEY AUTO_INCREMENT,
nome_autor VARCHAR(50));

CREATE TABLE livros(
id_livro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(80),
ano_publicacao INT,
id_autor INT, 
FOREIGN KEY (id_autor) REFERENCES autores(id_autor));

CREATE TABLE usuarios(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome_usuario VARCHAR(60),
email VARCHAR(90)); 

CREATE TABLE emprestimos(
id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT,
id_livro INT,
data_emprestimo DATE,
data_devolucao DATE,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE,
FOREIGN KEY (id_livro) REFERENCES livros(id_livro) ON UPDATE CASCADE);

ALTER TABLE livros ADD COLUMN genero VARCHAR(80);

ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

ALTER TABLE autores RENAME COLUMN nome_autor TO autor_nome;

ALTER TABLE livros RENAME COLUMN titulo TO titulo_livro;

INSERT autores(nome_autor) VALUES('Machado De Assis');

INSERT livros(titulo,ano_publicacao,id_autor) VALUES('Dom Casmurro', 1899, 1);

INSERT usuarios(nome_usuario,email) VALUES('joão Silva','joao@email.com');
INSERT emprestimos(id_usuario,id_livro,data_emprestimo) VALUES(1,1,'2025-10-23');

SELECT a.nome_autor AS autor,l.titulo AS livro 
FROM autores a JOIN livros l ON a.id_autor = l.id_autor;

SELECT e.id_emprestimo AS numero_do_emprestimo,u.nome_usuario,l.titulo
FROM emprestimos e 
JOIN livros l ON e.id_livro = l.id_livro
JOIN usuarios u ON e.id_usuario = u.id_usuario;

SELECT l.titulo, e.data_devolucao 
FROM emprestimos e JOIN livros l ON e.id_livro = l.id_livro
WHERE e.data_devolucao IS NULL;

UPDATE usuarios SET email = 'joaosilva@email.com'
WHERE id_usuario = 1;

DELETE FROM autores WHERE nome_autor LIKE 'Machado de assis';

DELETE FROM emprestimos WHERE data_devolucao < 2023;

CREATE TABLE categorias(
id_categoria INT PRIMARY KEY AUTO_INCREMENT,
nome_categoria VARCHAR(70)); 

ALTER TABLE livros
ADD COLUMN id_categoria INT,
ADD CONSTRAINT fk_livros_categoria
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria);


