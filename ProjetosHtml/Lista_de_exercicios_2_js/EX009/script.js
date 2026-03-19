const btn = document.getElementById("btn")
const lista = document.getElementById("lista")

btn.addEventListener('click', () => {
    const item = document.createElement("li")
    item.textContent = input.value + ``;
    lista.appendChild(item)
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "Remover"
    item.appendChild(btnRemover)
    item.addEventListener('click', () => {
        item.classList.toggle('concluido')
    })
    btnRemover.addEventListener('click', () => {
    lista.removeChild(item)
        
})
})


