let clientes=[]
let pets=[]
let produtos=[]
let carrinho=[]

// CLIENTE

function criarCliente(){

let nome=clienteNome.value
let email=clienteEmail.value
let vip=clienteVip.checked

if(nome==""){
alert("Nome inválido")
return
}

if(/\d/.test(nome)){
alert("O campo nome não pode conter números")
return
}

if(!email.includes("@")){
alert("Email inválido")
return
}

if(email.length < 20){
    alert("Email muito curto")
    return
}

if(!email.includes(".com") && !email.includes(".br")){
    alert("Email deve possuir .com ou .br")
    return
}

clientes.push({nome,email,vip})

renderClientes()

}

function renderClientes(){

listaClientes.innerHTML=""

clientes.forEach(c=>{
let li=document.createElement("li")
li.innerText=c.nome+" - "+c.email
listaClientes.appendChild(li)
})

}

// PET

function cadastrarPet(){

let nome=petNome.value
let tipo=petTipo.value
let idade=parseInt(petIdade.value)

if(nome==""){
alert("Pet precisa de nome")
return
}

if(tipo==""){
alert("Pet precisa de um tipo")
return
}

if(idade==""){
alert("Pet precisa de uma idade")
return
}

if(/\d/.test(nome)){
alert("O campo nome não pode conter números")
return
}

if(/\d/.test(tipo)){
alert("O campo tipo não pode conter números")
return
}

if(!/^-?\d+$/.test(petIdade.value)){
    alert("A idade deve conter apenas números")
    return
}

if(idade < 0){
    alert("O campo idade não pode conter valor negativo")
    return
}

pets.push({nome,tipo,idade})

renderPets()

}

function renderPets(){

listaPets.innerHTML=""

pets.forEach(p=>{
let li=document.createElement("li")
li.innerText=p.nome+" ("+p.tipo+")"
listaPets.appendChild(li)
})

}

// PRODUTOS

function criarProduto(){

    let nome=produtoNome.value
    let preco=parseFloat(produtoPreco.value)

    if(nome==""){
        alert("Produto precisa de nome")
        return
    }

    if(/\d/.test(nome)){
        alert("O campo nome não pode conter números")
        return
    }

    if(preco==""){
        alert("Produto precisa de um preço")
        return
    }

    if(!/^-?\d+$/.test(produtoPreco.value)){
        alert("O produto deve conter apenas números")
        return
    }

    if(preco<0){
        alert("Preço inválido")
        return
    }

    if(produtos.some(p => p.nome.toLowerCase() == nome.toLowerCase())){
    alert("Esse produto já está cadastrado")
    return 
    }

    produtos.push({nome,preco})

    renderProdutos()
}

function renderProdutos(){

listaProdutos.innerHTML=""
produtoSelect.innerHTML=""

produtos.forEach((p,i)=>{

let li=document.createElement("li")
li.innerText=p.nome+" - R$ "+p.preco
listaProdutos.appendChild(li)

let op=document.createElement("option")
op.value=i
op.innerText=p.nome
produtoSelect.appendChild(op)

})

}

// CARRINHO

function adicionarCarrinho(){

let p=produtos[produtoSelect.value]

carrinho.push(p)

renderCarrinho()

}

function removerCarrinho(){

carrinho.shift()

renderCarrinho()

}

function renderCarrinho(){

listaCarrinho.innerHTML=""

carrinho.forEach(p=>{

let li=document.createElement("li")
li.innerText=p.nome+" - "+p.preco
listaCarrinho.appendChild(li)

})

calcularTotal()

}

// TOTAL

function calcularTotal(){

let total=0

carrinho.forEach(p=>{

total+=p.preco

})

total=total.toFixed(2)

document.getElementById("total").innerText=total

return total

}

// FINALIZAR

function finalizarCompra(){

alert("Compra finalizada: "+calcularTotal())

carrinho=[]

renderCarrinho()

}


// CARROSSEL

let slideIndex = 0

function nextSlide(){
slideIndex++
updateSlide()
}

function prevSlide(){
slideIndex--
updateSlide()
}

function updateSlide(){

const slides = document.querySelector(".slides")
const total = document.querySelectorAll(".slide").length

if(slideIndex >= total) slideIndex = 0
if(slideIndex < 0) slideIndex = total - 1

slides.style.transform = "translateX(-" + slideIndex * 100 + "%)"

}

setInterval(nextSlide,4000)
