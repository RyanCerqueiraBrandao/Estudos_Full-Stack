const btn = document.getElementById("btn")
const lista = document.getElementById("lista")
const Cor = document.getElementById("btn-cor")
const itens = document.getElementById("itens")

Cor.addEventListener('click', () => {
    const items = document.querySelectorAll("#lista li")
    items.forEach(item => {
        item.style.color = "blue"
    })
})

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
    itens.textContent = `Itens na lista: ${lista.children.length}`    
})
    itens.textContent = `Itens na lista: ${lista.children.length}`
})


