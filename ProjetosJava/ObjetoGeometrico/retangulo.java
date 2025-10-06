package ObjetoGeometrico;

public class retangulo implements ObjetoGeometrico {
    private double b,h;
    @Override
    public double calcularArea() {
        return b*h;
    }
    @Override
    public double calcularPerimetro(){
        return 2*b+2*h;
    }
}
