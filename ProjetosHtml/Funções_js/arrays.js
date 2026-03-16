const frutas = ["manga", "acerola", "abacaxi"];

// 1. forEach: O "faz-tudo". Serve para percorrer a lista e fazer algo com cada item.
console.log("--- forEach ---");
frutas.forEach((fruta, index) => {
    console.log(`${index + 1}: ${fruta}`);
});

// 2. map: O "transformador". Ele cria um NOVO array com os dados alterados.
const frutasGritando = frutas.map(fruta => fruta.toUpperCase());
console.log("\n--- map ---");
console.log(frutasGritando); // ["MANGA", "ACEROLA", "ABACAXI"]

// 3. filter: O "segurança de balada". Só deixa passar para o novo array quem atende à condição.
const comLetraM = frutas.filter(fruta => fruta.startsWith("m"));
console.log("\n--- filter ---");
console.log(comLetraM); // ["manga"]

// 4. find: O "detetive". Ele busca o PRIMEIRO item que satisfaça a condição e para.
const buscaAbacaxi = frutas.find(fruta => fruta === "abacaxi");
console.log("\n--- find ---");
console.log(buscaAbacaxi); // "abacaxi"

// 5. some: O "otimista". Devolve true se PELO MENOS UM item bater com a regra.
const temAcerola = frutas.some(fruta => fruta === "acerola");
console.log("\n--- some ---");
console.log(temAcerola); // true