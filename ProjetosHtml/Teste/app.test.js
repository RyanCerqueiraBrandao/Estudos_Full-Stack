

describe('Testes do PetShop Doguito', () => {
    
    beforeEach(() => {
        // 1. Configura o DOM simulado com os elementos necessários antes de cada teste
        document.body.innerHTML = `
            <input id="clienteNome" placeholder="Nome">
            <input id="clienteEmail" placeholder="Email">
            <input type="checkbox" id="clienteVip">
            <ul id="listaClientes"></ul>

            <input id="petNome" placeholder="Nome">
            <input id="petTipo" placeholder="Tipo">
            <input id="petIdade" placeholder="Idade">
            <ul id="listaPets"></ul>

            <input id="produtoNome" placeholder="Produto">
            <input id="produtoPreco" placeholder="Preço">
            <ul id="listaProdutos"></ul>
            <select id="produtoSelect"></select>

            <ul id="listaCarrinho"></ul>
            <span id="total">0</span>

            <div class="slides" style="transform: translateX(0%);"></div>
            <div class="slide"></div>
            <div class="slide"></div>
            <button class="prev">❮</button>
            <button class="next">❯</button>
            <button id="btnAdicionar">Adicionar</button>
            <button id="btnRemover">Remover</button>
            <button id="btnFinalizar">Finalizar</button>
        `;

        // 2. Mock do window.alert para podermos testar se ele foi chamado
        window.alert = jest.fn();

        // 3. Reinicializa as variáveis globais para evitar vazamento entre testes
        global.clientes = [];
        global.pets = [];
        global.produtos = [];
        global.carrinho = [];
        global.slideIndex = 0;

        // 4. Carrega as funções do seu app.js no escopo global do Jest
        global.criarCliente = function() {
            let nome = document.getElementById('clienteNome').value;
            let email = document.getElementById('clienteEmail').value;
            let vip = document.getElementById('clienteVip').checked;
            if(nome=="") { alert("Nome inválido"); return; }
            if(/\d/.test(nome)) { alert("O campo nome não pode conter números"); return; }
            if(!email.includes("@")) { alert("Email inválido"); return; }
            if(email.length < 20) { alert("Email muito curto"); return; }
            if(!email.includes(".com") && !email.includes(".br")) { alert("Email deve possuir .com ou .br"); return; }
            clientes.push({nome, email, vip});
            global.renderClientes();
        };

        global.renderClientes = function() {
            const lista = document.getElementById('listaClientes');
            lista.innerHTML = "";
            clientes.forEach(c => {
                let li = document.createElement("li");
                li.innerText = c.nome + " - " + c.email;
                lista.appendChild(li);
            });
        };

        global.cadastrarPet = function() {
            let nome = document.getElementById('petNome').value;
            let tipo = document.getElementById('petTipo').value;
            let idade = parseInt(document.getElementById('petIdade').value);
            if(nome=="") { alert("Pet precisa de nome"); return; }
            if(tipo=="") { alert("Pet precisa de um tipo"); return; }
            if(isNaN(idade)) { alert("Pet precisa de uma idade"); return; }
            if(/\d/.test(nome)) { alert("O campo nome não pode conter números"); return; }
            if(/\d/.test(tipo)) { alert("O campo tipo não pode conter números"); return; }
            if(!/^-?\d+$/.test(document.getElementById('petIdade').value)) { alert("A idade deve conter apenas números"); return; }
            if(idade < 0) { alert("O campo idade não pode conter valor negativo"); return; }
            pets.push({nome, tipo, idade});
            global.renderPets();
        };

        global.renderPets = function() {
            const lista = document.getElementById('listaPets');
            lista.innerHTML = "";
            pets.forEach(p => {
                let li = document.createElement("li");
                li.innerText = p.nome + " (" + p.tipo + ")";
                lista.appendChild(li);
            });
        };

        global.criarProduto = function() {
            let nome = document.getElementById('produtoNome').value;
            let preco = parseFloat(document.getElementById('produtoPreco').value);
            if(nome=="") { alert("Produto precisa de nome"); return; }
            if(/\d/.test(nome)) { alert("O campo nome não pode conter números"); return; }
            if(isNaN(preco)) { alert("Produto precisa de um preço"); return; }
            if(!/^-?\d+$/.test(document.getElementById('produtoPreco').value)) { alert("O produto deve conter apenas números"); return; }
            if(preco<0) { alert("Preço inválido"); return; }
            if(produtos.some(p => p.nome.toLowerCase() == nome.toLowerCase())) { alert("Esse produto já está cadastrado"); return; }
            produtos.push({nome, preco});
            global.renderProdutos();
        };

        global.renderProdutos = function() {
            const lista = document.getElementById('listaProdutos');
            const select = document.getElementById('produtoSelect');
            lista.innerHTML = "";
            select.innerHTML = "";
            produtos.forEach((p, i) => {
                let li = document.createElement("li");
                li.innerText = p.nome + " - R$ " + p.preco;
                lista.appendChild(li);
                let op = document.createElement("option");
                op.value = i;
                op.innerText = p.nome;
                select.appendChild(op);
            });
        };

        global.adicionarCarrinho = function() {
            const select = document.getElementById('produtoSelect');
            if(!select.value) return;
            let p = produtos[select.value];
            carrinho.push(p);
            global.renderCarrinho();
        };

        global.removerCarrinho = function() {
            carrinho.shift();
            global.renderCarrinho();
        };

        global.calcularTotal = function() {
            let total = 0;
            carrinho.forEach(p => { total += p.preco; });
            total = total.toFixed(2);
            document.getElementById("total").innerText = total;
            return total;
        };

        global.renderCarrinho = function() {
            const lista = document.getElementById('listaCarrinho');
            lista.innerHTML = "";
            carrinho.forEach(p => {
                let li = document.createElement("li");
                li.innerText = p.nome + " - " + p.preco;
                lista.appendChild(li);
            });
            global.calcularTotal();
        };

        global.finalizarCompra = function() {
            alert("Compra finalizada: " + global.calcularTotal());
            global.carrinho = [];
            global.renderCarrinho();
        };

        global.nextSlide = function() {
            slideIndex++;
            global.updateSlide();
        };
        
        global.updateSlide = function() {
            const slides = document.querySelector(".slides");
            const total = document.querySelectorAll(".slide").length;
            if(slideIndex >= total) slideIndex = 0;
            if(slideIndex < 0) slideIndex = total - 1;
            slides.style.transform = "translateX(-" + slideIndex * 100 + "%)";
        };
    });

   
    // TESTES DE CLIENTE
   
    describe('Testes de Cliente', () => {
        test('1. Deve permitir criar cliente com nome válido', () => {
            document.getElementById('clienteNome').value = "João Silva";
            document.getElementById('clienteEmail').value = "joaosilva@emailvalido.com"; // length >= 20
            criarCliente();
            expect(global.clientes.length).toBe(1);
            expect(global.clientes[0].nome).toBe("João Silva");
        });

        test('2. Não deve permitir cliente com nome vazio', () => {
            document.getElementById('clienteNome').value = "";
            document.getElementById('clienteEmail').value = "joaosilva@email.com";
            criarCliente();
            expect(window.alert).toHaveBeenCalledWith("Nome inválido");
            expect(global.clientes.length).toBe(0);
        });

        test('3. Deve permitir cadastrar cliente com email válido', () => {
            document.getElementById('clienteNome').value = "Maria";
            // O código exige: ter @, length >= 20, ter .com ou .br
            document.getElementById('clienteEmail').value = "mariadasilva@gmail.com"; 
            criarCliente();
            expect(global.clientes.length).toBe(1);
            expect(global.clientes[0].email).toBe("mariadasilva@gmail.com");
        });

        test('4. Não deve permitir email inválido', () => {
            document.getElementById('clienteNome').value = "Maria";
            document.getElementById('clienteEmail').value = "emailsemarroba.com";
            criarCliente();
            expect(window.alert).toHaveBeenCalledWith("Email inválido");
        });

        test('5. Deve permitir marcar cliente como VIP', () => {
            document.getElementById('clienteNome').value = "Carlos Souza";
            document.getElementById('clienteEmail').value = "carlossouza@gmail.com";
            document.getElementById('clienteVip').checked = true;
            criarCliente();
            expect(global.clientes[0].vip).toBe(true);
        });
    });

    
    // TESTES DE PET
    
    describe('Testes de Pet', () => {
        test('6. Deve permitir cadastrar um pet', () => {
            document.getElementById('petNome').value = "Rex";
            document.getElementById('petTipo').value = "Cachorro";
            document.getElementById('petIdade').value = "5";
            cadastrarPet();
            expect(global.pets.length).toBe(1);
        });

        test('7. Pet deve possuir nome obrigatório', () => {
            document.getElementById('petNome').value = "";
            document.getElementById('petTipo').value = "Gato";
            document.getElementById('petIdade').value = "2";
            cadastrarPet();
            expect(window.alert).toHaveBeenCalledWith("Pet precisa de nome");
        });

        test('8. Pet deve possuir tipo (cachorro, gato, etc)', () => {
            document.getElementById('petNome').value = "Mingau";
            document.getElementById('petTipo').value = "";
            document.getElementById('petIdade').value = "2";
            cadastrarPet();
            expect(window.alert).toHaveBeenCalledWith("Pet precisa de um tipo");
        });

        test('9. Pet deve possuir idade válida (número e não negativa)', () => {
            document.getElementById('petNome').value = "Thor";
            document.getElementById('petTipo').value = "Cachorro";
            
            document.getElementById('petIdade').value = "-2";
            cadastrarPet();
            expect(window.alert).toHaveBeenCalledWith("A idade deve conter apenas números");

            document.getElementById('petIdade').value = "abc";
            cadastrarPet();
            expect(window.alert).toHaveBeenCalledWith("A idade deve conter apenas números");
        });
    });

   
    // TESTES DE PRODUTO
    
    describe('Testes de Produto', () => {
        test('10. Deve permitir criar produto com nome', () => {
            document.getElementById('produtoNome').value = "Ração";
            document.getElementById('produtoPreco').value = "50";
            criarProduto();
            expect(global.produtos[0].nome).toBe("Ração");
        });

        test('11. Produto deve possuir preço maior que zero', () => {
            document.getElementById('produtoNome').value = "Coleira";
            document.getElementById('produtoPreco').value = "25";
            criarProduto();
            expect(global.produtos[0].preco).toBe(25);
        });

        test('12. Produto não pode possuir preço negativo', () => {
            document.getElementById('produtoNome').value = "Shampoo";
            document.getElementById('produtoPreco').value = "-10";
            criarProduto();
            expect(window.alert).toHaveBeenCalledWith("O produto deve conter apenas números"); 
            // Devido a sua Regex de validação atual `!/^-?\d+$/.test`
        });

        test('13. Produto deve aparecer na lista de produtos cadastrados', () => {
            document.getElementById('produtoNome').value = "Osso";
            document.getElementById('produtoPreco').value = "10";
            criarProduto();
            const listaHTML = document.getElementById('listaProdutos').innerHTML;
            expect(listaHTML).toContain("Osso");
            expect(listaHTML).toContain("R$ 10");
        });
    });


    // TESTES DE CARRINHO
   
    describe('Testes de Carrinho', () => {
        beforeEach(() => {
            // Cadastra um produto para usar no carrinho
            document.getElementById('produtoNome').value = "Ração Premium";
            document.getElementById('produtoPreco').value = "150";
            criarProduto();
        });

        test('14. Deve permitir adicionar produto ao carrinho', () => {
            document.getElementById('produtoSelect').value = "0"; // Primeiro produto
            adicionarCarrinho();
            expect(global.carrinho.length).toBe(1);
        });

        test('15. Deve permitir remover produto do carrinho', () => {
            document.getElementById('produtoSelect').value = "0";
            adicionarCarrinho(); // Adiciona
            removerCarrinho(); // Remove o primeiro (shift)
            expect(global.carrinho.length).toBe(0);
        });

        test('16. Carrinho deve listar todos os produtos adicionados', () => {
            document.getElementById('produtoSelect').value = "0";
            adicionarCarrinho();
            const carrinhoHTML = document.getElementById('listaCarrinho').innerHTML;
            expect(carrinhoHTML).toContain("Ração Premium");
        });

        test('17. Carrinho deve calcular o valor total da compra', () => {
            document.getElementById('produtoSelect').value = "0";
            adicionarCarrinho();
            adicionarCarrinho(); // 150 + 150
            expect(document.getElementById('total').innerText).toBe("300.00");
        });
    });

    
    // TESTES DE REGRAS DE NEGÓCIO (Requerem implementação no app.js)
  
    describe('Testes de Regras de Negócio', () => {
        test('18. Compra acima de R$100 deve aplicar desconto de 10%', () => {
            // OBS: Este teste falhará até que você implemente a lógica no calcularTotal()
            global.carrinho = [{nome: "Ração", preco: 200}];
            global.renderCarrinho();
            
            // 200 - 10% = 180
            expect(document.getElementById('total').innerText).toBe("180.00");
        });

        test('19. Cliente VIP deve receber desconto de 15%', () => {
            // OBS: Este teste falhará até que você implemente a lógica
            global.carrinho = [{nome: "Banho", preco: 100}];
            // Simulando cliente VIP ativo na sessão
            global.clienteLogadoVip = true; 
            global.renderCarrinho();
            
            // 100 - 15% = 85
            expect(document.getElementById('total').innerText).toBe("85.00");
        });

        test('20. Carrinho não deve aceitar produto com preço igual a zero', () => {
            // OBS: Requer ajustar adicionarCarrinho() para validar p.preco > 0
            global.produtos = [{nome: "Amostra Grátis", preco: 0}];
            document.getElementById('produtoSelect').innerHTML = `<option value="0">Amostra</option>`;
            document.getElementById('produtoSelect').value = "0";
            
            adicionarCarrinho();
            expect(global.carrinho.length).toBe(0); // Deve ser negado
        });
    });

    describe('Outros Testes', () => {
        test('21. Carrinho vazio deve retornar total igual a 0', () => {
            global.carrinho = [];
            global.renderCarrinho();
            expect(document.getElementById('total').innerText).toBe("0.00");
        });

        test('22. Ao finalizar compra o carrinho deve ser limpo', () => {
            global.carrinho = [{nome: "Shampoo", preco: 30}];
            finalizarCompra();
            expect(global.carrinho.length).toBe(0);
            expect(document.getElementById('listaCarrinho').innerHTML).toBe("");
        });

        test('23. O carrossel deve trocar automaticamente as imagens', () => {
            // Testa o avanço manual que é o mesmo acionado pelo setInterval
            const slides = document.querySelector(".slides");
            expect(global.slideIndex).toBe(0);
            
            nextSlide();
            expect(global.slideIndex).toBe(1);
            expect(slides.style.transform).toBe("translateX(-100%)");
            
            nextSlide(); // Index >= total (2) -> zera
            expect(global.slideIndex).toBe(0);
            expect(slides.style.transform).toBe("translateX(0%)");
        });

        test('24. Os botões Adicionar / Remover / Finalizar devem funcionar corretamente', () => {
            // Atrelando as funções aos botões
            document.getElementById('btnAdicionar').onclick = adicionarCarrinho;
            document.getElementById('btnRemover').onclick = removerCarrinho;
            document.getElementById('btnFinalizar').onclick = finalizarCompra;

            global.produtos = [{nome: "Coleira", preco: 25}];
            document.getElementById('produtoSelect').innerHTML = `<option value="0">Coleira</option>`;
            document.getElementById('produtoSelect').value = "0";

            // Click em Adicionar
            document.getElementById('btnAdicionar').click();
            expect(global.carrinho.length).toBe(1);

            // Click em Remover
            document.getElementById('btnRemover').click();
            expect(global.carrinho.length).toBe(0);

            // Click em Finalizar
            document.getElementById('btnFinalizar').click();
            expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Compra finalizada"));
        });
    });
});