#include<stdio.h>
#include<locale.h>
#include<stdlib.h>
#include<unistd.h>

struct Fichadealuno {
		char nome[50];
		int idade;
		float altura, peso;
	};
int main(){
	setlocale(LC_ALL, "Portuguese");
	struct Fichadealuno aluno[10];
	int opcao,qtd=0, max_alunos=10;
	
	
	while(true){
		printf("---------------Bem vindo ao Sistema da Escola---------------\n");
		printf("Escolha uma das opções abaixo: \n");
		printf("1 - Cadastrar Alunos\n");
		printf("2 - Exibir alunos cadastrados\n");
		printf("0 - sair\n");
		scanf("%i",&opcao);
	
		if (opcao == 1){
		 	int num_alunos;
			printf("quantos alunos você deseja cadastrar? :");
	        scanf("%i",&num_alunos);
			if ((qtd + num_alunos)>max_alunos){
				printf("o Limite de Alunos foi atingido!");
				num_alunos = max_alunos - qtd;  
                printf("Apenas %d alunos serão cadastrados.\n", num_alunos);
			}
			for(int i=0;i<num_alunos;i++){
				printf("\ndigite o Nome do aluno %i: ",i+1);
				getchar();
				fgets(aluno[i].nome, sizeof(aluno[i].nome), stdin);
				aluno[i].nome[strcspn(aluno[i].nome, "\n")] = '\0';  
 
				printf("digite a Idade do aluno %i: ",i+1);
				scanf(" %i", &aluno[i].idade);
				
				printf("digite a Altura do aluno %i: ",i+1);
				scanf(" %f", &aluno[i].altura);
				
				printf("digite o Peso do aluno %i: ",i+1);
				scanf(" %f", &aluno[i].peso);
				
				printf("\nAluno %s Cadastrado com Sucesso!\n",aluno[i].nome);
			}
			qtd+=num_alunos;
			sleep(3);
			system("cls");
			}
	
		else if (opcao == 2){
			if(qtd==0){
				printf("\nNenhum aluno cadastrado!");		
				}
			for(int i=0;i<qtd;i++){
				
				printf("\nNome do aluno %i: %s\n",i,aluno[i].nome);
				
				printf("Idade do aluno %i: %i\n",i,aluno[i].idade);
			
				printf("Altura do aluno %i: %.2f\n",i,aluno[i].altura);
				
				printf("Peso do aluno %i: %.2f\n",i,aluno[i].peso);
				
				printf("______________________________");
				}
				sleep(7);
				
				system("cls");
				}
		else if (opcao == 0){
			break;
		}		
		else {
			printf("opção invalida!");
			sleep(3);
		}
	}
	printf("Obrigado por utilizar, até mais!");
	
}