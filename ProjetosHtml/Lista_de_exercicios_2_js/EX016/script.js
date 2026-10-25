const btn = document.getElementById("alterar modo")
const titulo = document.getElementById("titulo")

btn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode')
    } else {
        document.body.classList.add('dark-mode')
    }
})