#include<stdlib.h>
#include<unistd.h>
#include<locale.h>

int quantidadedepessoas=0;

struct pessoa {
	char nome[50],tel[50],email[60],usuario[50],senha[50];
	
	int idade;
};
struct pessoa cadastro[5];

void cadastrar(){
	int contadorusuario=0,contadorsenha=0;
	char usuario[50],senha[50];
	usuario[0] = '\0';
	senha[0] = '\0';
	
	
	printf("\ninforme Sua Idade: ");
	scanf("%i",&cadastro[quantidadedepessoas].idade);
	fflush(stdin);
	
	if(cadastro[quantidadedepessoas].idade>=18){
		
		printf("\nNome:");
		fgets(cadastro[quantidadedepessoas].nome,50,stdin);
		cadastro[quantidadedepessoas].nome[strcspn(cadastro[quantidadedepessoas].nome, "\n")] = '\0'; // Remove a nova linha
		
		printf("\nTelefone: +55 ");
		fgets(cadastro[quantidadedepessoas].tel,50,stdin);
		cadastro[quantidadedepessoas].tel[strcspn(cadastro[quantidadedepessoas].tel, "\n")] = '\0';
		
		printf("\nE-mail: ");
		fgets(cadastro[quantidadedepessoas].email,60,stdin);
		cadastro[quantidadedepessoas].email[strcspn(cadastro[quantidadedepessoas].email, "\n")] = '\0';
		
		printf("\nUsúario(8 dígitos): ");
		fgets(usuario,50,stdin);
		usuario[strcspn(usuario, "\n")] = '\0';
		
		printf("\nSenha(8 dígitos): ");
		fgets(senha,50,stdin);
		senha[strcspn(senha, "\n")] = '\0';
		
		for(int i=0;i<50;i++){
			if(usuario[i] == '\0'){
			if(senha[i] == '\0'){
				break;
			}
			}
			contadorusuario++;
			contadorsenha++;
		}
		while(contadorusuario != 8 || contadorsenha != 8){
		contadorusuario=0;
		contadorsenha=0;
		printf("Usuário e senha precisão Ter 8 Dígitos!");
		
		printf("\nDigite um Novo Usúario(8 dígitos): ");
		fgets(usuario,50,stdin);
		usuario[strcspn(usuario, "\n")] = '\0'; 

		
		printf("\nDigite uma Nova Senha(8 dígitos): ");
		fgets(senha,50,stdin);
		senha[strcspn(senha, "\n")] = '\0'; 
		
		for(int i=0;i<50;i++){
			if(usuario[i] == '\0'){
				if(senha[i] == '\0'){
				break;
			}
			}
			contadorusuario++;
			contadorsenha++;
		}
		}
		strcpy(cadastro[quantidadedepessoas].usuario, usuario);
        strcpy(cadastro[quantidadedepessoas].senha, senha);
    
}
	else{
		printf("Cadastro Negado (idade inferior a 18)");
		cadastro[quantidadedepessoas].idade = 0;
	}
	
}
void listar(){
	if(quantidadedepessoas==0){
		printf("Não Há Pessoas cadastradas! ");
	}
	else{
	for(int i=0;i<quantidadedepessoas;i++){
		printf("\nNome Do Usuario %s : %s",cadastro[i].usuario,cadastro[i].nome);
		printf("\nIdade Do Usuario %s : %i",cadastro[i].usuario,cadastro[i].idade);
		printf("\nTelefone Do Usuario %s : %s",cadastro[i].usuario,cadastro[i].tel);
		printf("\nE-mail Do Usuario %s : %s",cadastro[i].usuario,cadastro[i].email);
		printf("\nSenha Do Usuario %s : %s\n",cadastro[i].usuario,cadastro[i].senha);
	}	
}
}

void menu(){
	int opcao;
	while(true){
	printf("\n_______Bem Vindo ao Sistema de cadastro_______");
	printf("\nEscolha uma Opção: ");
	printf("\n1-Cadastrar-se");
	printf("\n2-Listar Cadastrados");
	printf("\n3-Sair");
	printf("\nOpção: ");
	scanf("%i",&opcao);
	switch(opcao){
		case 1:
			cadastrar();
			quantidadedepessoas++;
			printf("\n\ncadastro Realizado Com Sucesso!");
			sleep(2);
			system("cls");
			break;
		case 2:
			listar();
			system("pause");
			system("cls");
			break;
		case 3:
			printf("Encerrando o Sistema");
			sleep(1);
			printf(".");
			sleep(1);
			printf(".");
			sleep(1);
			printf(".");
			return;
		default:
			printf("Opção Inválida !!");
			sleep(2);
			system("cls");
			break;
	}
}
}

int main(){
	setlocale(LC_ALL,"portuguese");
	menu();
}