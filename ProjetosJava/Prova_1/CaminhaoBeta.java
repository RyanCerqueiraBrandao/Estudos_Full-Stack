package Prova_1;

public class CaminhaoBeta extends Caminhao{
  private String tipo;
  private int contador=0;

    public void inserePluviometro(String tipo){
        if(contador==0){
            this.tipo=tipo;
            list.add(new Pluviometro(tipo));
            contador++;
        } else if (contador>=1) {
            if (this.tipo.equals(tipo)){
                list.add(new Pluviometro(tipo));
            } else {
                System.out.println("tipo de Carga Não supotado!");
            }
        }
    }
}
