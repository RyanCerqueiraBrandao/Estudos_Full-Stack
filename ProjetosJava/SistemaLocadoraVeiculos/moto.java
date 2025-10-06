package SistemaLocadoraVeiculos;

public class moto extends veiculos{
    private int cilindradas;
    public moto(String modelo,String marca,int ano,boolean disponivel,int cilindradas){
        super(modelo,marca,ano,disponivel);
        this.cilindradas=cilindradas;
    }
    public int getCilindradas() {
        return cilindradas;
    }

    @Override
    public void exibirDetalhes(){
        System.out.printf("Modelo:%s | Marca: %s | Ano: %d | Disponivel: %b | Cilindradas: %d\n",getModelo(),getMarca(),getAno(),getdisponivel(),getCilindradas());
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
