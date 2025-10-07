package Prova_1;

import javax.lang.model.element.NestingKind;
import java.util.ArrayList;

public abstract class Caminhao {
    public ArrayList<Pluviometro> list = new ArrayList<>();

    public abstract void inserePluviometro(String tipo);
}
