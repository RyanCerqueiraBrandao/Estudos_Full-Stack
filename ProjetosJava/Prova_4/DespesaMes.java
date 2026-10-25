package Prova_4;

public class DespesaMes {
    private int mes;
    private float valor;

    public float getValor() {
        return valor;
    }

    public int getMes() {
        return mes;
    }

    public DespesaMes(int mes, float valor){
        this.mes=mes;
        this.valor=valor;
    }
}
