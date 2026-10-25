const contador = document.getElementById("contador");

function incrementar() {
    let valor = parseInt(contador.textContent, 10);
    valor++;
    contador.textContent = valor;
}

function decrementar() {
    let valor = parseInt(contador.textContent, 10);

    if (valor > 0) {
        valor--;
        contador.textContent = valor;
    } else {
        alert("O contador nao pode ser negativo.");
    }
}
