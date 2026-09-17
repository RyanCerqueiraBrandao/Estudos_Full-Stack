import unittest
from validacao import login

class TestValidacao(unittest.TestCase):
    def test_validacao_true_login(self):
        email = "Jorge@gmail.com"
        senha = "123"
        resultado = login(email,senha)

        self.assertTrue(resultado)

    def test_validacao_false_login(self):
            email = "natalia@gmail.com"
            senha = "123"
            resultado = login(email,senha)
    
            self.assertFalse(resultado)

if __name__ == "__main__":
    unittest.main() 