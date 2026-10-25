const btn = document.getElementById("btn")
const titulo = document.getElementById("titulo")
const contador = document.getElementById("contador")

let count = 0

btn.addEventListener('click', () => {
    count++
    contador.textContent = (`Cliques: ${count}`)
    titulo.textContent = "titulo alterado com sucesso!"
})
