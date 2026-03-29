import * as api from './api.js'

const btnAdicionar = document.getElementById('btn-adicioanr')
const listaTarefas = document.getElementById('lista-tarefas')
const paragrafoTotalTarefas = document.getElementById('total-tarefas')
const btnLimpar = document.getElementById('btn-limpar')
const input = document.getElementById('input')

btnAdicionar.addEventListener('click', async () => {
    if (input.value === '') {
        alert('Informe uma tarefa!!')
        return
    }

    const tarefa = {
        description: input.value,
        finished: false
    }

    await api.criarTask(tarefa)
    await carregarTarefas()
})

btnLimpar.addEventListener('click', () => {
    const tarefas = api.listarTasks()
    // TODO: invocar funcao da api de deletar todas as tasks
    api.deletarTodasTasks(tarefas.length)
    
    listaTarefas.replaceChildren()
    atualizarTotalLista(0)
})

function criarLiTarefa(tarefa) {
    const liTarefa = document.createElement('li')
    liTarefa.textContent = tarefa.description

    const checkConcluido = document.createElement('input')
    checkConcluido.type = 'checkbox'
    checkConcluido.name = 'finished'

    if (tarefa.finished) {
        checkConcluido.checked = true
        liTarefa.classList.add('concluido')
    }

    checkConcluido.addEventListener('change', async () => {
        try {
            await api.atualizarTask(tarefa.id, {
                finished: checkConcluido.checked
            })

            liTarefa.classList.toggle('concluido', checkConcluido.checked)
        } catch (error) {
            checkConcluido.checked = !checkConcluido.checked
            alert('Nao foi possivel atualizar a tarefa.')
        }
    })

    liTarefa.appendChild(checkConcluido)

    const btnRemover = document.createElement('button')
    btnRemover.textContent = 'Remover'
    btnRemover.addEventListener('click', () => {
        // TODO: invocar funcao da api de deletar uma task passando id
        try {
            api.deletarTask(tarefa.id)
        } catch (error) {
            alert(`Não Foi Possivel deletar a task`)
        }
        carregarTarefas()
    })

    liTarefa.appendChild(btnRemover)
    listaTarefas.appendChild(liTarefa)
}

export async function carregarTarefas() {
    const tarefas = await api.listarTasks()

    listaTarefas.replaceChildren()

    tarefas.forEach((tarefa) => {
        criarLiTarefa(tarefa)
    })

    atualizarTotalLista(tarefas.length)
}

function atualizarTotalLista(total = listaTarefas.children.length) {
    paragrafoTotalTarefas.textContent = `Itens na lista: ${total}`
}
