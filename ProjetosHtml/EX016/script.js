const verdades = [
    "Bahia é o maior da ",
    "CR7 melhor que messi",
    "Brasil Hexa em 2026"
]

function verdadeConhecida(){
    alert('Bahia é o maior da Bahia');
}

function nomeCompleto(nome,sobrenome){
    console.log(`${nome} ${sobrenome}`)
}
function verVerdades(){
    verdades.forEach(element =>{
        console.log(element);
    });
}
