
def adicionar_produto(produtos):
    carrinho = []
    carrinho.extend(produtos)
    return carrinho
def remover_produto(produto_excluir, produtos):
    carrinho = adicionar_produto(produtos)
    
    carrinho.remove(produto_excluir)
    return carrinho
def valor_total(valores):
    total = 0
    for valor in valores:
        total += valor
    return total
    