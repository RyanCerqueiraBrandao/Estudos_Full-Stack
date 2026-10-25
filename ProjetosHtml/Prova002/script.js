import * as api from "./api.js";

const lista = document.getElementById("listaAlunos");
const modal = document.getElementById("modal");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");
const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("cancelar");
const btnSalvar = document.getElementById("salvar");
let alunoEditando = null;
const alunos = await api.obterAlunos();

function abrirModal(aluno = null) {
  modal.classList.remove("hidden");
  if (aluno) {
    nomeInput.value = aluno.nome;
    idadeInput.value = aluno.idade;
    cursoInput.value = aluno.curso;
    alunoEditando = aluno;
  } else {
    nomeInput.value = "";
    idadeInput.value = "";
    cursoInput.value = "";
    alunoEditando = null;
  }
}
function fecharModal() {
  modal.classList.add("hidden");
}
btnNovo.addEventListener("click", () => abrirModal());
btnCancelar.addEventListener("click", fecharModal);

function criarCard(aluno) {
  const card = document.createElement("div");
  card.classList.add("card");
  lista.appendChild(card);

  const titulo = document.createElement("h3");
  card.appendChild(titulo);

  titulo.textContent = aluno.nome;

  const idade = document.createElement("p");
  card.appendChild(idade);

  idade.textContent = `idade: ${aluno.idade}`;

  const curso = document.createElement("p");
  card.appendChild(curso);

  curso.textContent = `curso: ${aluno.curso}`;

  const btnEditar = document.createElement("button");
  card.appendChild(btnEditar);
  btnEditar.classList.add("button");
  btnEditar.textContent = `Editar`;

  const btnExcluir = document.createElement("button");
  card.appendChild(btnExcluir);
  btnExcluir.classList.add("button");
  
  btnExcluir.textContent = 'Excluir';

  const checkbox = document.createElement("input");
  checkbox.type = 'checkbox'
  card.appendChild(checkbox);
    



  btnEditar.addEventListener(`click`, () => {
    abrirModal(aluno);
  });

  btnExcluir.addEventListener('click', async ()=> {
    await api.deletarAluno(aluno.id)
  })
}


btnSalvar.addEventListener("click", async () => {
  const nome = nomeInput.value;
  const idade = idadeInput.value;
  const curso = cursoInput.value;

  if (!nome && !idade) {
    alert("Preencha todos os campos!");
    return;
  }

  if (alunoEditando === null) {
    await api.criarAluno({ nome, idade, curso });
  } else {
    await api.atualizarAluno({ ...alunoEditando, nome, idade, curso });
  }

  fecharModal();
});

function alterarStatus() {}

function carregarAlunos() {
  for (let i = 0; i < alunos.length; i++) {
    criarCard(alunos[i]);
  }
}
carregarAlunos();
