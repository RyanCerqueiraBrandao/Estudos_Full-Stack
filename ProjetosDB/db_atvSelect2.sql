USE EscolaTech;

SELECT * FROM alunos;

SELECT nome,cidade FROM alunos;

SELECT * FROM cursos;

SELECT nome,area FROM cursos;

SELECT * FROM matriculas;

SELECT nome,data_matricula 
FROM  matriculas m
JOIN alunos a ON m.id_aluno = a.id_aluno;

SELECT nome,valor FROM cursos WHERE valor > 900;

SELECT nome,cidade FROM alunos WHERE cidade = 'São Paulo';

SELECT id_matricula AS matricula,YEAR(data_matricula) AS ano  FROM matriculas 
WHERE YEAR(data_matricula) = 2024;

SELECT nome FROM cursos 
ORDER BY nome ASC;

SELECT nome,valor FROM cursos 
ORDER BY valor DESC;

SELECT nome, carga_horaria FROM cursos WHERE carga_horaria > 70;

SELECT nome, idade FROM alunos 
WHERE idade BETWEEN 20 AND 25 ;

SELECT nome,area,valor FROM cursos 
WHERE area='gestão' AND valor < 900;

SELECT nome,genero FROM alunos WHERE genero = 'F';

SELECT id_matricula,data_matricula FROM matriculas
ORDER BY id_matricula ASC LIMIT 5;

SELECT COUNT(*) AS total_cursos FROM cursos;

SELECT AVG(idade) AS media_idade FROM alunos;

SELECT nome,valor FROM cursos
ORDER BY valor DESC LIMIT 1;

SELECT nome,valor FROM cursos
ORDER BY valor ASC LIMIT 1;

SELECT area,COUNT(*) FROM cursos
GROUP BY area;