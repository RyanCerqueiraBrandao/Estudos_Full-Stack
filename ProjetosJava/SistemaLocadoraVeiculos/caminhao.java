package SistemaLocadoraVeiculos;

public class caminhao extends veiculos{
    private double capacidadeCarga;
    public caminhao(String modelo, String marca, int ano, boolean disponivel, double capacidadeCarga){
        super(modelo,marca,ano,disponivel);
        this.capacidadeCarga=capacidadeCarga;
    }
    public double getcapacidadeCarga(){
        return capacidadeCarga;
    }
    @Override
    public void exibirDetalhes(){
        System.out.printf("Modelo:%s | Marca: %s | Ano: %d | Disponivel: %b | Capacidade de Carga: %.2f\n",getModelo(),getMarca(),getAno(),getdisponivel(),getcapacidadeCarga());
    }
    public void alugar(){
        setDisponivel(false);};
    public void devolver(){
        setDisponivel(true);
    };
    public boolean estadisponivel(){
        if (getdisponivel()==true){
            System.out.println("Esta Disponivel");
            return true;
        }
        else{
            System.out.println("Nao Esta Disponivel");
            return false;
        }
    };
}
