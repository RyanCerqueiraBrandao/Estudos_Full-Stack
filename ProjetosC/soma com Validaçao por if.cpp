#include<stdio.h>
#include<locale.h>
int main(){
	int a,b,c;
	setlocale(LC_ALL, "portuguese");
	printf("Digite Tr�s Numeros inteiros: ");
	scanf("%i%i%i",&a,&b,&c);
	
	if ((a+b)>c) {
		printf("A Soma de a + b � maior que C");
	}
	else {
		printf("A Soma de a + b n�o � maior que C");
	}
}