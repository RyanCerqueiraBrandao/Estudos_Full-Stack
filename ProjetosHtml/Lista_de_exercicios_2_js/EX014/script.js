const form = document.getElementById("formulario")
const titulo = document.getElementById("titulo")

form.addEventListener('submit', (event) => {
    event.preventDefault() // impede reload da página
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    titulo.textContent = `Olá, ${nome}! Seu email é ${email}.`

    alert(`Nome: ${nome}, Email: ${email}`)

    if(nome === "" || email === "") {
        alert("Por favor, preencha todos os campos.")
    }
})