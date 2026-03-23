async function obterUsario() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        
        return response.json()
    } catch (error) {
        console.error('Erro ao buscar usuário: ', error)
    }
}

async function criarUsuario(userData) {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
                
            }
        )

        if (!response.ok) {
            console.error(response)
            return
        }
        
        const data = await response.json()
        
        console.log('Usuario criado com sucesso: ', data)
    } catch (error) {
        console.error('Erro ao criar usuário: ', error)
    }    
}

    const data = await obterUsario()
    console.log(data)

const user = {    
    name: 'Maria José',
    username: 'Maria'
}



criarUsuario(user)