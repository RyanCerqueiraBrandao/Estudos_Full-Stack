#include<stdio.h>
#include<stdlib.h>
int main(){
	int numeros[8],i,maior,posicao;
	
	for(i=0;i<8;i++){
		printf("Digite um numero: ");
		scanf("%d",&numeros[i]);
		
	if (i==0||numeros[i]>maior) {
		maior=numeros[i];
		posicao=i;
	}	
	}
	printf("O Maior Numero e :%d \n sua posicao e: %d",maior,posicao);
}