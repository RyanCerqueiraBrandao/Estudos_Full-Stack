CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE livros(
	isbn INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(45),
    editora VARCHAR(45),
    PRIMARY KEY (isbn));
    
DELIMITER //
	CREATE PROCEDURE sp_cad_livro (IN nome_livro VARCHAR(45), IN ed_livro VARCHAR(45))
    BEGIN
		INSERT INTO livros
        VALUES (null,nome_livro,ed_livro);
	END //
    DELIMITER ;
    
CALL sp_cad_livro ('Banco de Dados', 'Senai');

SELECT *FROM livros;
DELIMITER //
	CREATE PROCEDURE sp_del_livro (IN cod_livro int, out retorno VARCHAR(45))
    BEGIN
		DELETE FROM livros WHERE isbn = cod_livro;
        IF row_count() = 0 THEN
			SET retorno = 'Nenhum livro foi excluído';
		ELSE 
			SET retorno = 'Livro excluído com sucesso!!';
            SELECT retorno;
		END IF;
	END //
    DELIMITER ;
    
    CALL sp_del_livro (1,@saida);