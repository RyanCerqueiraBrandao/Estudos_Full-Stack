import unittest
from calculadora import soma,subtracao,multiplicacao,divisao

class TesteCalculadora(unittest.TestCase):
    def test_calcular_soma(self):
        resultado = soma(10,11)

        self.assertEqual(resultado,21)

    def test_calcular_soma_numerosnegativos(self):
        resultado = soma(-150,-50)

        self.assertEqual(resultado,-200)

    def test_calcular_subtracao(self):
        resultado = subtracao(10,1)

        self.assertEqual(resultado,9)

    def test_calcular_multiplicacao(self):
        resultado = multiplicacao(4,3)

        self.assertEqual(resultado,12)

        resultado = multiplicacao(4,-3)

        self.assertEqual(resultado,-12)
    def test_calcular_divisao(self):
        resultado = divisao(10,0)

        self.assertEqual(resultado,"Não pode Dividir por Zero")    

if __name__ == "__main__":
    unittest.main()