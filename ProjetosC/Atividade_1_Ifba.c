#include <stdio.h>

int main(){
    int categoria, tempo, diaSemana, horaInicio;
    char possuiCupom;
    float distancia, base, acrescimo = 0, desconto = 0, total;

    printf("Categoria:\n");
    printf("1- Economico\n");
    printf("2- Conforto\n");
    printf("3- Moto\n");
    scanf("%d", &categoria);

    if(categoria == 1 || categoria == 2 || categoria == 3){
        printf("Distancia (KM): ");
        scanf("%f", &distancia);
        
        if(categoria == 3 && distancia > 20){
            printf("Corrida nao disponivel para moto.\n");
            return 0;
        }
        else {
            printf("Tempo Estimado (min): ");
            scanf("%d", &tempo);
        
            if(distancia > 0 && tempo > 0){
                printf("Dia da semana:\n");
                printf("1- Domingo\n");
                printf("2- Segunda-feira\n");
                printf("3- Terca-feira\n");
                printf("4- Quarta-feira\n");
                printf("5- Quinta-feira\n");
                printf("6- Sexta-feira\n");
                printf("7- Sabado\n");
                scanf("%d", &diaSemana);
                
                if(diaSemana < 1 || diaSemana > 7){
                    printf("Dia da Semana Invalido!\n");
                    return 0;
                }
                else { 
                    printf("Hora de Inicio da Corrida (Formato 24hr): ");
                    scanf("%d", &horaInicio);
                    
                    if(horaInicio < 0 || horaInicio > 23){
                        printf("Hora Invalida!\n");
                        return 0;
                    }
                    else {
                        printf("Possui Cupom? (s/n): ");
                        scanf(" %c", &possuiCupom);

                        switch(categoria){
                            case 1:
                                base = 4.0 + distancia * 1.4 + tempo * 0.25;
                                if(base < 8.0){
                                    base = 8.0;
                                }
                                break;
                            case 2:
                                base = 6.0 + distancia * 2.1 + tempo * 0.4;
                                if(base < 12.0){
                                    base = 12.0;
                                }
                                break;
                            case 3:
                                base = 2.5 + distancia * 0.9 + tempo * 0.15;
                                if(base < 5.0){
                                    base = 5.0;
                                }
                                break;
                        }
                        if(horaInicio >= 0 && horaInicio <= 5){
                            printf("Madrugada: acrescimo de 20%%\n");
                            acrescimo = base * 0.20;
                        }

                        if(diaSemana < 2 || diaSemana > 6){
                            if(possuiCupom == 's' || possuiCupom == 'S'){
                                desconto = (base + acrescimo) * 0.10;
                                if(desconto > 5.0){
                                    desconto = 5.0;
                                }
                            }
                        }
                        else {
                            if(horaInicio < 6 || horaInicio > 8){
                                if(horaInicio < 17 || horaInicio > 19){
                                    if(possuiCupom == 's' || possuiCupom == 'S'){
                                        desconto = (base + acrescimo) * 0.10;
                                        if(desconto > 5.0){
                                            desconto = 5.0;
                                        }
                                    }
                                }
                                else {
                    
                                    printf("Horario de pico: acrescimo de 30%%\n");
                                    acrescimo = base * 0.30;
                                    if(possuiCupom == 's' || possuiCupom == 'S'){
                                        printf("Cupom nao aplicavel em horario de pico.\n");
                                    }
                                }
                            }
                            else {
                                printf("Horario de pico: acrescimo de 30%%\n");
                                acrescimo = base * 0.30;
                                if(possuiCupom == 's' || possuiCupom == 'S'){
                                    printf("Cupom nao aplicavel em horario de pico.\n");
                                }
                            }
                        }

                        total = base + acrescimo - desconto;

                        printf("\n  RESUMO DA CORRIDA  \n");
                        
                        if(categoria == 1){
                            printf("Categoria: Economico\n");
                        }
                        else if(categoria == 2){
                            printf("Categoria: Conforto\n");
                        }
                        else {
                            printf("Categoria: Moto\n");
                        }

                        if(distancia < 5.0){
                            printf("Distancia: %.1f km (corrida curta)\n", distancia);
                        }
                        else if(distancia <= 15.0){
                            printf("Distancia: %.1f km (corrida media)\n", distancia);
                        }
                        else {
                            printf("Distancia: %.1f km (corrida longa)\n", distancia);
                        }

                        printf("Tempo: %dh %dmin\n", tempo / 60, tempo % 60);
                        printf("Valor base: R$ %.2f\n", base);
                        printf("Acrescimo:  R$ %.2f\n", acrescimo);
                        printf("Desconto:   R$ %.2f\n", desconto);
                        printf("TOTAL:      R$ %.2f\n", total);
                    }
                }
            }
            else {
                printf("Distancia ou tempo invalidos!\n");
                return 0;
            }
        }
    }
    else { 
        printf("Categoria invalida!\n");
        return 0;
    }

    return 0;
}