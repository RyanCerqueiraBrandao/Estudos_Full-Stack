// Importa todas as funcoes do arquivo api.js para usar as operacoes do CRUD.
import * as api from './api.js'

// Busca no HTML o elemento do modal onde o formulario e exibido.
const modal = document.getElementById("modal")

// Busca o campo de texto usado para digitar o nome do produto.
const nomeInput = document.getElementById("nome")
// Busca o campo de texto usado para digitar o preco do produto.
const precoInput = document.getElementById("preco")

// Busca o botao responsavel por abrir o modal no modo de cadastro.
const btnNovo = document.getElementById("btnNovo")
// Busca o botao que salva os dados preenchidos no modal.
const btnSalvar = document.getElementById("salvar")
// Busca o botao que fecha o modal sem salvar.
const btnCancelar = document.getElementById("cancelar")
// Busca o elemento onde o titulo do modal sera alterado entre novo e edicao.
const modalTitulo = document.getElementById("modalTitulo")
// Busca a area da pagina onde os cards de produtos serao inseridos.
const listaProdutos = document.getElementById("listaProdutos")

// Guarda o produto que esta sendo editado; comeca como null para indicar que nenhum esta em edicao.
let produtoEditando = null

// Abre o modal e define se ele sera usado para criar ou editar um produto.
function abrirModal(modo = "novo", produto = null) {
  // Remove a classe "hidden" para tornar o modal visivel.
  modal.classList.remove("hidden")

  // Verifica se o modal foi aberto para cadastrar um novo produto.
  if (modo === "novo") {
    // Define o titulo do modal como "Novo Produto".
    modalTitulo.innerText = "Novo Produto"
    // Limpa o campo de nome para um novo cadastro.
    nomeInput.value = ""
    // Limpa o campo de preco para um novo cadastro.
    precoInput.value = ""
    // Garante que nao exista produto em edicao.
    produtoEditando = null
  } else {
    // Define o titulo do modal como "Editar Produto".
    modalTitulo.innerText = "Editar Produto"
    // Preenche o campo de nome com o nome do produto selecionado.
    nomeInput.value = produto.nome
    // Preenche o campo de preco com o preco do produto selecionado.
    precoInput.value = produto.preco
    // Salva o produto selecionado para saber que o botao salvar deve atualizar, e nao criar.
    produtoEditando = produto
  }
}

// Fecha o modal escondendo o formulario da tela.
function fecharModal() {
  // Adiciona a classe "hidden" para ocultar o modal.
  modal.classList.add("hidden")
}

// Quando o usuario clicar em "Novo", abre o modal preparado para cadastro.
btnNovo.addEventListener("click", () => abrirModal("novo"))
// Quando o usuario clicar em "Cancelar", fecha o modal.
btnCancelar.addEventListener("click", fecharModal)
// Quando o usuario clicar em "Salvar", executa o processo de criacao ou atualizacao.
btnSalvar.addEventListener("click", async () => {
  // Le o valor digitado no campo de nome.
  const nome = nomeInput.value
  // Le o valor digitado no campo de preco.
  const preco = precoInput.value

  // Verifica se os dois campos estao vazios ao mesmo tempo.
  if (!nome && !preco) {
    // Exibe um alerta pedindo o preenchimento dos campos.
    alert("Preencha todos os campos!")
    // Interrompe a execucao para nao continuar o salvamento.
    return
  }

  // Verifica se existe algum produto sendo editado.
  if (produtoEditando === null) {
    // Se nao houver produto em edicao, cria um novo produto com os dados informados.
    await api.criarProduto({ nome, preco })
  } else {
    // Se houver produto em edicao, atualiza esse produto mantendo os dados antigos e sobrescrevendo nome e preco.
    await api.atualizarProduto({ ...produtoEditando, nome, preco })
  }
  // Fecha o modal depois de salvar os dados.
  fecharModal()
})

// Cria e monta visualmente um card de produto na tela.
function criarCard(produto) {
  // Cria um elemento div que sera o card principal.
  const card = document.createElement("div")
  // Adiciona a classe CSS do card para aplicar estilo.
  card.classList.add("card")
  // Insere o card dentro da lista principal de produtos.
  listaProdutos.appendChild(card)

  // Cria um titulo h3 para mostrar o nome do produto.
  const titulo = document.createElement("h3")
  // Coloca o titulo dentro do card.
  card.appendChild(titulo)

  // Define o texto do titulo com o nome do produto recebido.
  titulo.textContent = produto.nome
  // Cria um paragrafo para mostrar o preco.
  const preco = document.createElement("p")
  // Coloca o paragrafo de preco dentro do card.
  card.appendChild(preco)
  // Formata o preco com duas casas decimais e adiciona o simbolo de real.
  preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}`

  // Cria uma div que vai agrupar os botoes de acao.
  const divAcoes = document.createElement("div");
  // Adiciona a classe CSS responsavel pelo estilo da area de acoes.
  divAcoes.classList.add("acoes")

  // Cria o botao que permitira editar o produto.
  const btnEditar = document.createElement("button")
  // Adiciona a classe CSS do botao principal.
  btnEditar.classList.add("btn-primario")
  // Define o texto visivel do botao de editar.
  btnEditar.textContent = `Editar`

  // Adiciona o evento de clique para abrir o modal no modo de edicao.
  btnEditar.addEventListener(`click`, () => {
    // Chama a funcao de abertura do modal enviando o produto atual.
    abrirModal(`editar`, produto)
  })

  // Cria o botao que permitira excluir o produto.
  const btnExcluir = document.createElement("button")
  // Adiciona a classe CSS do botao secundario.
  btnExcluir.classList.add("btn-secundario")
  // Define o texto visivel do botao de excluir.
  btnExcluir.textContent = `Excluir`
  // Adiciona o evento de clique para remover o produto.
  btnExcluir.addEventListener(`click`, async () => {
    // Chama a API para deletar o produto usando o id dele.
    await api.deletarProduto(produto.id)
  })

  // Coloca o botao de editar dentro da div de acoes.
  divAcoes.appendChild(btnEditar)
  // Coloca o botao de excluir dentro da div de acoes.
  divAcoes.appendChild(btnExcluir)

  // Coloca a div de acoes dentro do card.
  card.appendChild(divAcoes)
}

// Busca todos os produtos na API e guarda o resultado em memoria.
const produtos = await api.obterProdutos()

// Percorre a lista de produtos e cria um card para cada item.
function carregaProdutos() {
  // Mostra no console os produtos recebidos, provavelmente para depuracao.
  console.log(produtos)

  // Percorre o array de produtos do primeiro ao ultimo indice.
  for (let i = 0; i < produtos.length; i++) {
    // Cria um card na tela para o produto da posicao atual.
    criarCard(produtos[i])
  }
}

// Chama a funcao para renderizar os produtos assim que o script for executado.
carregaProdutos()
