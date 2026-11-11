/*Faça um algoritmo que leia um intervalo [x,y] e informe todos os números primos contidos nele. Para os não-primos, liste seus divisores.*/
#include <stdio.h>

void main(){
    int x,y;
    char resp;

    do{

        printf("Informe os limites do intervalo [x,y]: \n");
        scanf("%d%d",&x,&y);

        if(x>y){
            int aux = x;
            x = y;
            y = aux;
        }

        for(int i=x; i<=y; i++){
            int qtde=0;

            for(int divisor=1; divisor<=i; divisor++)
                if(i%divisor==0) qtde++;

            if(qtde==2) printf("%d é primo!\n",i);
            else{
                printf("%d não é primo!\n",i);
                printf("Divisores de %d:\n",i);
                for(int divisor=1; divisor<=i; divisor++)
                    if(i%divisor==0) printf("%d\n",divisor);
            }
        }

        printf("Deseja continuar? S-sim e N-não\n");
        scanf("%c",&resp);
    }while(resp!='N');
}