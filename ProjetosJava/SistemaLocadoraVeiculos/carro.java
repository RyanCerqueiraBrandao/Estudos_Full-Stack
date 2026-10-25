package SistemaLocadoraVeiculos;

public class carro extends veiculos{
    private int numeroPortas;
    public carro(String modelo,String marca,int ano,boolean disponivel,int numeroPortas){
        super(modelo,marca,ano,disponivel);
        this.numeroPortas=numeroPortas;
    }
    public int getNumeroPortas(){
        return numeroPortas;
    }
    @Override
    public void exibirDetalhes(){
        System.out.printf("Modelo:%s | Marca: %s | Ano: %d | Disponivel: %b | NumeroPortas: %d \n",getModelo(),getMarca(),getAno(),getdisponivel(),getNumeroPortas());
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
