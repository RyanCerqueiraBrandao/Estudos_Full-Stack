import unittest
from carrinho import adicionar_produto,remover_produto,valor_total

class TesteCarrinho(unittest.TestCase):
    def test_adicionar_produto(self):
        produtos = ["carne","vassoura"]

        resultado = adicionar_produto(produtos)

        self.assertEqual(resultado,produtos)

    def test_remover_carrinho(self):
        produtos = ["carne","vassoura"]
        
        resultado = remover_produto("carne",produtos)

        self.assertEqual(resultado,["vassoura"])

    def test_valor_carrinho(self):
        produtos = ["carne","vassoura"]
        valores = [15,12]

        resultado = valor_total(valores)
        self.assertEqual(resultado,27)


if __name__ == "__main__":
    unittest.main()