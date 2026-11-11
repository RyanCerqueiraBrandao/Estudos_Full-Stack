#include <stdio.h>
#include <string.h>
int main(){
    int idade;
    char nome[50],sexo[50];

    printf("Digite o seu nome: \n");
    fgets(nome, 50, stdin); 
    printf("Digite o seu sexo: \n");
    fgets(sexo, 50, stdin); 
    printf("Digite sua Idade: \n");
    scanf("%d", idade);

     nome[strcspn(nome, "\n")] = '\0';
     sexo[strcspn(sexo, "\n")] = '\0';

    if(idade > 60){
        printf("Você é um Velho");
    }
    else if(idade > 18 && idade < 31){
        printf("Você é um Jovem");
    }
    else if(idade<= 18){
        if(strcmp(sexo,"masculino") == 0){
            printf("Você é um Menino");
        }
        else{
            printf("Você é um Menina");
        }
    }
    else{
        if(strcmp(sexo,"masculino") == 0){
            printf("Você é um Adulto");
        }
        else if(strcmp(sexo,"feminino") == 0){
            printf("Você é uma Adulta");
        }
        else printf("Sexo Desconhecido");
    }

}
