const input = document.getElementById("filtro")
const lista = document.getElementById("lista")

input.addEventListener('input', () => {
    const termo = input.value.toLowerCase()
    const itens = lista.getElementsByTagName('li')

    for (let i = 0; i < itens.length; i++) {
        const texto = itens[i].textContent.toLowerCase()
        if (texto.includes(termo)) {
            itens[i].style.display = 'block'
        } else {
            itens[i].style.display = 'none'
        }
    }
})