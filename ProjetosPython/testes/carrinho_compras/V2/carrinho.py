carrinho = []


def adicionar_carrinho(produto):
    if produto[1] < 0:
        raise ValueError("Preço não pode ser negativo")

    carrinho.append(produto)

    total = 0
    for produto in carrinho:
        total += produto[2]

    return total


def acessar_total():
    total = 0
    for produto in carrinho:
        total += produto[1] * produto[2]

    return total


def remover_produto(nome):
    for produto in carrinho:
        if produto[0] == nome:
            carrinho.remove(produto)
            break


def aplicar_desconto(total):
    if total >= 200:
        return total * 0.9

    return total