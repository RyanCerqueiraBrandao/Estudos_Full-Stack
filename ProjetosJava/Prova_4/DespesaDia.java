package Prova_4;

public class DespesaDia extends DespesaMes{
    private int dia;


    public DespesaDia(int mes, float valor, int dia) {
        super(mes, valor);
        this.dia = dia;
    }
    public int getDia(){
        return dia;
    }
}
