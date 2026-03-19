const form = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const listaCadastros = document.getElementById("lista-cadastros");
const mensagem = document.getElementById("mensagem");

const cadastros = [];

function renderizarCadastros() {
    listaCadastros.innerHTML = "";

    if (cadastros.length === 0) {
        mensagem.textContent = "Nenhum cadastro realizado.";
        return;
    }

    mensagem.textContent = `Total de cadastrados: ${cadastros.length}`;

    cadastros.forEach((cadastro, indice) => {
        const item = document.createElement("li");
        const texto = document.createElement("span");
        const botaoRemover = document.createElement("button");

        texto.textContent = `${cadastro.nome} - ${cadastro.idade} anos`;

        botaoRemover.type = "button";
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", () => {
            removerCadastro(indice);
        });

        item.appendChild(texto);
        item.appendChild(document.createTextNode(" "));
        item.appendChild(botaoRemover);
        listaCadastros.appendChild(item);
    });
}

function removerCadastro(indice) {
    cadastros.splice(indice, 1);
    renderizarCadastros();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const idade = campoIdade.value.trim();

    if (nome === "" || idade === "") {
        alert("Preencha nome e idade.");
        return;
    }

    cadastros.push({
        nome,
        idade
    });

    form.reset();
    campoNome.focus();
    renderizarCadastros();
});

renderizarCadastros();
