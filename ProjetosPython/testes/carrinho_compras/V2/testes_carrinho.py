import unittest
from carrinho import adicionar_carrinho, acessar_total, remover_produto, aplicar_desconto, carrinho


class Teste_carrinho(unittest.TestCase):

    def setUp(self):
        carrinho.clear()

    def test_adicionar_carrinho(self):
        produto = ['mouse', 50, 1]
        resultado = adicionar_carrinho(produto)
        self.assertEqual(resultado, 1)

    def test_total_carrinho(self):
        adicionar_carrinho(['mouse', 50, 1])
        adicionar_carrinho(['cadeira', 400, 2])

        resultado = acessar_total()

        self.assertEqual(resultado, 850)

    def test_remover_produto(self):
        adicionar_carrinho(['mouse', 50, 1])
        adicionar_carrinho(['teclado', 100, 1])

        remover_produto('mouse')

        self.assertEqual(carrinho, [['teclado', 100, 1]])

    def test_desconto(self):
        adicionar_carrinho(['produto1', 100, 1])
        adicionar_carrinho(['produto2', 200, 1])

        resultado = aplicar_desconto(acessar_total())

        self.assertEqual(resultado, 270)

    def test_limite_desconto(self):
        adicionar_carrinho(['produto', 200, 1])

        resultado = aplicar_desconto(acessar_total())

        self.assertEqual(resultado, 180)

    def test_preco_negativo(self):
        with self.assertRaises(ValueError):
            adicionar_carrinho(['mouse', -50, 1])


if __name__ == "__main__":
    unittest.main()