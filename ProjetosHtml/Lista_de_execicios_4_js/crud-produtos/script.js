import * as api from './api.js'

const modal = document.getElementById("modal")

const nomeInput = document.getElementById("nome")
const precoInput = document.getElementById("preco")

const btnNovo = document.getElementById("btnNovo")
const btnSalvar = document.getElementById("salvar")
const btnCancelar = document.getElementById("cancelar")
const modalTitulo = document.getElementById("modalTitulo")
const listaProdutos = document.getElementById("listaProdutos")

let produtoEditando = null

function abrirModal(modo = "novo", produto = null) {
  modal.classList.remove("hidden")

  if (modo === "novo") {
    modalTitulo.innerText = "Novo Produto"
    nomeInput.value = ""
    precoInput.value = ""
    produtoEditando = null
  } else {
    modalTitulo.innerText = "Editar Produto"
    nomeInput.value = produto.nome
    precoInput.value = produto.preco
    produtoEditando = produto
  }
}

function fecharModal() {
  modal.classList.add("hidden")
}

btnNovo.addEventListener("click", () => abrirModal("novo"))
btnCancelar.addEventListener("click", fecharModal)
btnSalvar.addEventListener("click", async () => {
  const nome = nomeInput.value
  const preco = precoInput.value

  if (!nome && !preco) {
    alert("Preencha todos os campos!")
    return
  }

  if(produtoEditando === null){
   await api.criarProduto({ nome, preco })
  }
  else{
    await api.atualizarProduto({...produtoEditando,nome,preco})
  }
  fecharModal()
})

function criarCard(produto) {
  const card = document.createElement("div")
  card.classList.add("card")
  listaProdutos.appendChild(card)

  const titulo = document.createElement("h3")
  card.appendChild(titulo)

  titulo.textContent = produto.nome
  const preco = document.createElement("p")
  card.appendChild(preco)
  preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}`

  const divAcoes = document.createElement("div");
  divAcoes.classList.add("acoes")

  const btnEditar = document.createElement("button")
  btnEditar.classList.add("btn-primario")
  btnEditar.textContent = `Editar`

  btnEditar.addEventListener(`click`, ()=> {
    abrirModal(`editar`,produto)
  })
  
  const btnExcluir = document.createElement("button")
  btnExcluir.classList.add("btn-secundario")
  btnExcluir.textContent = `Excluir`
  btnExcluir.addEventListener(`click`, async ()=> {
    await api.deletarProduto(produto.id)
  })
  
  divAcoes.appendChild(btnEditar)
  divAcoes.appendChild(btnExcluir)


  card.appendChild(divAcoes)
}
const produtos = await api.obterProdutos()

function carregaProdutos() {
  

  console.log(produtos)
   //produtos.forEach(produto => {
   // criarCard(produtos[])
  // });

   for(let i=0;i<produtos.length;i++){
    criarCard(produtos[i])
   }
}

carregaProdutos()