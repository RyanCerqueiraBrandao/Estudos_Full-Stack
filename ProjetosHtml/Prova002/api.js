const API_URL = 'http://localhost:3000/alunos'

export async function obterAlunos() {
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            console.log('Erro ao buscar alunos')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}

export async function criarAluno(aluno) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })

        if (!response.ok) {
            console.log('Erro ao adicionar aluno')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}


export async function atualizarAluno(aluno) {
    try {
        const response = await fetch(`${API_URL}/${aluno.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })

        if (!response.ok) {
            console.log('Erro ao atualizar aluno')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}

export async function deletarAluno(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            console.log('Erro ao buscar aluno')
            throw new response.json()
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new error
    }
}
