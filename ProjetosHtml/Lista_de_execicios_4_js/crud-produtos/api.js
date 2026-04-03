const API_URL = 'http://localhost:3000/produtos'

export async function obterProdutos() {
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            console.log('Erro ao buscar produtos')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}

export async function criarProduto(produto) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })

        if (!response.ok) {
            console.log('Erro ao criar produto')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}

export async function atualizarProduto(produto) {
    try {
        const response = await fetch(`${API_URL}/${produto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })

        if (!response.ok) {
            console.log('Erro ao atualizar produto')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}

export async function deletarProduto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            console.log('Erro ao buscar produtos')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}