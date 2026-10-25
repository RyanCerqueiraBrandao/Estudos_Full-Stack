const btn = document.getElementById("btn")
const titulo = document.getElementById("titulo")
const btn_2 = document.getElementById("btn_2")
const p = document.getElementById("par")

btn_2.addEventListener('click', () =>{
    p.style.color = "red"
    p.style.fontSize= "20px"
})

btn.addEventListener('click', () => {
    titulo.textContent = "titulo alterado com sucesso!"
})