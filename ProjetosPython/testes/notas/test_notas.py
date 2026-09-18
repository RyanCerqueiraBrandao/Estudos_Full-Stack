import unittest
from notas import calcular_media, verificar_aprovacao

class TesteNotas(unittest.TestCase):
    def test_calcular_media(self):
        resultado = calcular_media(8,6)

    def test_aluno_aprovado(self):
         resultado = verificar_aprovacao(8)

         self.assertEqual(resultado, "Aprovado")
if __name__ == "__main__":
    unittest.main()