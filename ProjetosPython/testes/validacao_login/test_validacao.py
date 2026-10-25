import unittest
from validacao import login

class TestValidacao(unittest.TestCase):
    def test_validacao_true_login(self):
        usuario = "Jorge"
        senha = "123"
        email= "jorge@gmail.com"
        resultado = login(usuario,senha,email)

        self.assertTrue(resultado)

    def test_validacao_false_login(self):
        usuario = "natalia"
        senha = "123"
        email= "jorge@gmail.com"
        resultado = login(usuario,senha,email)
    
        self.assertFalse(resultado)

    def test_validacao_usuario_vazio(self):
        usuario= ""
        senha = "123"
        email= "jorge@gmail.com"
        resultado = login(usuario,senha,email)
        self.assertFalse(resultado)

    def test_validacao_senha_vazia(self):
        usuario= "Jorge"
        senha = ""
        email= "jorge@gmail.com"
        resultado = login(usuario,senha,email)
        self.assertFalse(resultado)

    def test_validacao_email_valido(self):
        usuario = "Jorge"
        senha = "123"
        email= "jorge@gmail.com"
        resultado = login(usuario,senha,email)
        self.assertTrue(resultado)

    def test_validacao_email_invalido(self):
        usuario = "Jorge"
        senha = "123"
        email= "jorge@gmail"    
        resultado = login(usuario,senha,email)
        self.assertFalse(resultado)
    
if __name__ == "__main__":
    unittest.main() 