package Prova_3;


public class Contador implements Resetavel,Modificavel{
    int valor;
    public void reseta(){
        valor=1;
    }

    @Override
    public void reseta(int origem) {

    }

    public void modifica (int tam){
        valor= tam;
    }
}
