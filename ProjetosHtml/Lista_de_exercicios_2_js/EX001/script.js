const btn = document.getElementById("btn")
const titulo = document.getElementById("titulo")

btn.addEventListener('click', () => {
    titulo.textContent = "titulo alterado com sucesso!"
})

