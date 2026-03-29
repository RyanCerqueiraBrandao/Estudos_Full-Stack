const BASE_URL = 'http://localhost:3000/tasks'

// funcao para obter todas as tasks
export async function listarTasks() {
    try {
        const response = await fetch(BASE_URL)

        if (!response.ok) {
            console.error(response)
            return []
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

// funcao para criar uma task
export async function criarTask(taskData) {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        })

        if (!response.ok) {
            console.error(response)
            return
        }

        return await response.json()
    } catch (error) {
        console.error('Erro ao adicionar task:', error)
        throw error
    }
}

// funcao para atualizar uma task pelo id
export async function atualizarTask(taskId, taskData) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        })

        if (!response.ok) {
            console.error(response)
            return
        }

        return await response.json()
    } catch (error) {
        console.error('Erro ao atualizar task:', error)
        throw error
    }
}

// criar funcao para deletar uma task pelo id
export async function deletarTask(taskId){
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`,{
            method: `DELETE`
        })
        if (!response.ok) {
            console.error(response)
            return
        }
        return await response.json()
    } catch (error) {
        console.error('Erro ao deletar task:', error)
        throw error
    }
}

// criar funcao para deletar todas as tasks
export async function deletarTodasTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks')
        const tasks = await response.json()

        await Promise.all(
            tasks.map(task =>
                fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'DELETE'
                })
            )
        )

        console.log('Todas as tasks deletadas')

    } catch (error) {
        console.error('Erro ao deletar as tasks:', error)
    }
}
