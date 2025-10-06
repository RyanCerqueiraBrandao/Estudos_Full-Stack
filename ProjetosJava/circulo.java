public class circulo implements ObjetoGeometrico {
    private double raio,x,y;
    @Override
    public double calcularArea() {
        return Math.PI*raio*raio;
    }
    @Override
    public double calcularPerimetro() {
       return 2*Math.PI*raio;
    }
}
