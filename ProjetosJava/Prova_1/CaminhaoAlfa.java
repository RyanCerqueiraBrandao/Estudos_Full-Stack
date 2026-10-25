package Prova_1;

public class CaminhaoAlfa extends Caminhao {
    private int max = 5000,atual=0;

    public void inserePluviometro(String tipo) {
        if (tipo.equals("Convencional")){
            if (max-atual>=1000){
                atual+=1000;
                list.add(new Pluviometro(tipo));
            }
        } else if (tipo.equals("Semiautomatico")) {
            if (max-atual>=750){
                atual+=750;
                list.add(new Pluviometro(tipo));
            }

        } else if (tipo.equals("Automatico")) {
            if (max-atual>=500){
                atual+=500;
                list.add(new Pluviometro(tipo));
            }
        }
    }

}
