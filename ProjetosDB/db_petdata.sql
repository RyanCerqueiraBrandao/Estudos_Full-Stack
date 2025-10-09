SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS petdata;

USE petdata;

CREATE TABLE animal(
id_animal INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
especie VARCHAR(45) NOT NULL,
idade INT NOT NULL);

CREATE TABLE veterinario(
id_veterinario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
especialidade VARCHAR(45) NOT NULL);

CREATE TABLE consulta(
id_consulta INT PRIMARY KEY AUTO_INCREMENT,
id_animal_consulta INT,
id_veterinario_consulta INT,
data_consulta DATE NOT NULL,
diagnostico VARCHAR(100) NOT NULL,
FOREIGN KEY (id_animal_consulta) REFERENCES animal(id_animal),
FOREIGN KEY (id_veterinario_consulta) REFERENCES veterinario(id_veterinario));

SHOW TABLES;

DROP TABLE CONSULTA;

INSERT INTO animal(nome,especie,idade) VALUES
('lupy','cahorro',14),
('dora','cachorro',8),
('meg','cachorro',5),
('tomas','gato',6),
('mel','gato',10),
('sansao','cachorro',13),
('ciborg','gato',4),
('tata','cachorro',5),
('sasa','gato',3),
('toty','gato',6);

INSERT INTO veterinario(nome,especialidade) VALUES
('Ricardo Santos','Cirurgia Veterinária'),
('Paula Bitencourt','ortopedia'),
('Giovanne Santana','Cardiologia Veterinária'),
('Tomas de Jesus','Oncologia Veterinária'),
('Carlos de Castro','Dermatologia Veterinária'),
('Jorge Antonio','Oftalmologia Veterinária'),
('Natanael Cerqueira','Neurologia Veterinária'),
('Luana Figueredo','Endocrinologia Veterinária'),
('Jade Brandão','Radiologia Veterinária'),
('Tais Silva','Odontologia Veterinária');

INSERT INTO consulta(id_animal_consulta,id_veterinario_consulta,data_consulta,diagnostico) VALUES
(1, 1, '2025-01-14', 'Artrite avançada nas patas traseiras'),
(2, 10, '2025-02-20', 'Tártaro e gengivite'),
(3, 5, '2025-03-10', 'Dermatite alérgica'),
(4, 2, '2025-04-25', 'Distensão muscular leve'),
(5, 3, '2025-05-05', 'Sopro cardíaco'),
(6, 4, '2025-06-15', 'Tumor benigno de mama'),
(7, 7, '2025-07-08', 'Síndrome vestibular'),
(8, 8, '2025-08-18', 'Hipotireoidismo'),
(9, 6, '2025-09-22', 'Conjuntivite bacteriana'),
(10, 9, '2025-10-02', 'Animal saudável — exame de rotina');

SELECT consulta.id_consulta,
    animal.nome AS animal,
    veterinario.nome AS veterinario,
    veterinario.especialidade,
    consulta.data_consulta,
    consulta.diagnostico
FROM consulta 
INNER JOIN animal ON consulta.id_animal_consulta = animal.id_animal
INNER JOIN veterinario  ON consulta.id_veterinario_consulta = veterinario.id_veterinario;

SELECT consulta.id_consulta,
    animal.nome AS animal,
    veterinario.nome AS veterinario,
    veterinario.especialidade,
    consulta.data_consulta,
    consulta.diagnostico
FROM consulta 
INNER JOIN animal ON consulta.id_animal_consulta = animal.id_animal
INNER JOIN veterinario  ON consulta.id_veterinario_consulta = veterinario.id_veterinario
WHERE veterinario.nome = 'Carlos de castro';

SELECT consulta.id_consulta,
    animal.nome AS animal,
    veterinario.nome AS veterinario,
    veterinario.especialidade,
    consulta.data_consulta,
    consulta.diagnostico
FROM consulta 
INNER JOIN animal ON consulta.id_animal_consulta = animal.id_animal
INNER JOIN veterinario  ON consulta.id_veterinario_consulta = veterinario.id_veterinario
WHERE animal.especie = 'gato'; 



    