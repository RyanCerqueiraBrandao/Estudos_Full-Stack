import unittest
from validacao import login,desconto

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

    def test_desconto_dez(self):
        valor = 100
        resultado = desconto(valor,cliente_vip=True)

        self.assertEqual(resultado,valor*0.90)

    def test_cliente_vip(self):
        valor = 100
        cliente_vip = True
        resultado = desconto(valor,cliente_vip)

        self.assertEqual(resultado,valor*0.90) 

    
if __name__ == "__main__":
    unittest.main() 