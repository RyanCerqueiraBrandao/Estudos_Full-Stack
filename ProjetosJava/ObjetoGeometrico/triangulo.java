package ObjetoGeometrico;

public class triangulo implements ObjetoGeometrico {
    private double a,b,c,s;
    @Override
    public double calcularArea(){
        s = (a+b+c)/2;
        return Math.sqrt(s*(s-a)*(s-b)*(s-c));
    }
    @Override
    public double calcularPerimetro(){
        return a+b+c;
    }
}
