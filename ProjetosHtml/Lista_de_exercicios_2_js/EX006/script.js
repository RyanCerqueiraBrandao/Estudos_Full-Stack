const btn = document.getElementById("btn")
const input = document.getElementById("input")

btn.addEventListener('click', () => {
    if(input.value === "") {
        btn.textContent = "Campo obrigatório!"
    }
    else {
        btn.textContent = `ok!`
    }
})
