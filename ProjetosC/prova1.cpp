#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#define Maxestudantes 3
int quantidadereprovados=0,quantidadeaprovados=0,quantidadeEstudantes=0;

struct Estudante{
	char nome[50];
	int matricula[20];
	float notas[3];
};
struct Estudante estudante[Maxestudantes];
void cadastrarEstudante(){
	while(getchar()!='\n');
	for(int i=0;i<Maxestudantes;i++){
	while(getchar()!='\n');
	printf("Digite o nome do Estudante: ");
	fgets(estudante[i].nome,50,stdin);
	printf("\nDigite a Matrícula do estudante: ");
	scanf("%i",&estudante[i].matricula);
	printf("\nDigite a nota 1:");
	scanf("%f",&estudante[i].notas[1]);
	printf("\nDigite a nota 2:");
	scanf("%f",&estudante[i].notas[2]);
	printf("\nDigite a nota 3:");
	scanf("%f",&estudante[i].notas[3]);
	quantidadeEstudantes++;
	}
}
int calcularMedia(){
	float media=0;
	for(int i=0;i<3;i++){
		media = (media+estudante[i].notas[1]);
		}
	media/3;
	return(media);
}
void classificarAprovacao(){
	for (int i=0;i<3;i++){
		if (calcularMedia()<7){
			printf("Aluno: %s \nSituação: Reprovado!",estudante[i].nome);
		quantidadereprovados++;
		}
	    else if (calcularMedia()>=7){
	    	printf("Aluno: %s \nSituação: Aprovado!",estudante[i].nome);
	    	quantidadeaprovados++;
		}
		
	}
	
}
void gerarRelatorio(){
	float maior=0,menor=10;
	int numMenor,numMaior;
	printf("Total de Alunos Aprovados: %i",quantidadeaprovados);
	printf("\nTotal de Alunos Reprovados: %i",quantidadereprovados);
	for(int i=0;i<3;i++){
		if(calcularMedia()>maior){
			maior=calcularMedia();
			numMaior=i;
		}
	    else if(calcularMedia()<menor){
	    	menor=calcularMedia();
	    	numMenor=i;
		}
	printf("O Aluno com a Maior media foi %s Com Media: %f",estudante[numMaior].nome,maior);
	printf("O Aluno com a Menor media foi %s Com Media: %f",estudante[numMenor].nome,menor);
	}
}

void direcionamento(){
	int opcao;
	while(true){
	printf("Sistema de cadastro de alunos\n");
	printf("Escolha uma opcao:\n");
	printf("1-cadastrar estudante\n");
	printf("2-Exibir Média dos estudantes\n");
	printf("3-Exibir classificação dos estudantes\n");
	printf("4-Relatório Final\n");
	printf("5-Sair \nopcao: ");
	scanf("%i",&opcao);
	switch (opcao){
		case 1:
		cadastrarEstudante();
		break;
		case 2:
		calcularMedia();
		break;
		case 3:
		classificarAprovacao();
		break;
		case 4:
		gerarRelatorio();
		break;
		case 5:
		printf("Obrigado por utilizar até mais");
		return;	
	}
}
}
int main(){
	direcionamento();
}