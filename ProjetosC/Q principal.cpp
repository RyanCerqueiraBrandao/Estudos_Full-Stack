#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <unistd.h>

int code = 0;  

struct produtos {
    char nome[50];
    int codigo,quantidade;
    float preco;
};
struct produtos produto[40];
void mostrar(){
	if(code>0){	
	for(int i=0;i<code;i++){
		printf("\nNome: %s\n",produto[i].nome);
		printf("Quantidade: %i\n",produto[i].quantidade);
		printf("Preço %.2f\n",produto[i].preco);
		printf("Codigo %i\n",produto[i].codigo);
		printf("\n____________________________");
	}
	printf("\n");
	system("pause");
	}
	else{
		printf("Nao ha produtos cadastrados!\n");
        sleep(4);
        system("cls");
	}
}
void cadastro(int cadastrar) {
    printf("Nome do Produto: ");
    scanf("%s", produto[cadastrar].nome);  
    printf("Quantidade do produto %s: ", produto[cadastrar].nome);
    scanf("%i", &produto[cadastrar].quantidade);
	printf("Preco do produto %s: ", produto[cadastrar].nome);
    scanf("%f", &produto[cadastrar].preco);
	printf("Codigo do produto %s: ", produto[cadastrar].nome);
    scanf("%i", &produto[cadastrar].codigo);
    
	printf("\nProduto cadastrado com sucesso!");
    sleep(3);
    system("cls");
}
void busca(int total) {
    int codigo;
    bool encontrado = false;
    printf("Informe o codigo do produto que deseja buscar: ");
    scanf("%i", &codigo);
    for (int i = 0; i < total; i++) {
        if (produto[i].codigo == codigo) {
            printf("Produto encontrado!\n");
            printf("Nome: %s\n", produto[i].nome);
            printf("Quantidade: %i\n", produto[i].quantidade);
			printf("Preco: %.2f\n", produto[i].preco);
			printf("Codigo: %i\n", produto[i].codigo);
            encontrado = true;
            break; 
        }
    }
    
    if (!encontrado) {
        printf("Produto com codigo %i nao encontrado!\n", codigo);
    }
}

void direcionamento() {
    int opcao;
    printf("_______Bem Vindo Ao Sistema de Cadastro de Produtos!_______\n");
    
    while (true) {
        printf("\nEscolha uma das opcoes abaixo:\n");
        printf("1 - Cadastrar produto\n");
        printf("2 - Buscar produto\n");
        printf("3 - Mostrar Produtos Cadastrados\n");
        printf("4 - Sair do Sistema\n");
        printf("Opcao: ");
        scanf("%i", &opcao);
        
        switch (opcao) {
            case 1:
                if (code >= 40) {
                    printf("Limite de produtos atingido!\n");
                } else {
                    cadastro(code);
                    code++;
                }
                break;
            case 2:
                if (code == 0) {
                    printf("Nao ha produtos cadastrados!\n");
                    sleep(4);
                    system("cls");
                } else {
                    busca(code);
                }
                break;
            case 3:
            	mostrar();
            	break;
			case 4:
                printf("\nObrigado por utilizar, ate mais!\n\n");
                printf("Encerrando o Sistema.");
				sleep(1);
                printf(".");
                sleep(1);
                printf(".");
                sleep(1);
                printf(".");
                sleep(1);
                return;
            default:
                printf("Opcao invalida!\n");
                system("pause");
                system("cls");
        }
    }
}

int main() {
    direcionamento();
    return 0;
}