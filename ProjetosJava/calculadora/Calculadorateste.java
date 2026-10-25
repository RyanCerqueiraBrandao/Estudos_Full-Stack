import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CalculadoraTeste {

    Calculadora calculadora = new Calculadora();

    @Test
    public void testarSoma() {
        assertEquals(15, calculadora.somar(10, 5));
    }

    @Test
    public void testarSubtracao() {
        assertEquals(5, calculadora.subtrair(10, 5));
    }

    @Test
    public void testarMultiplicacao() {
        assertEquals(50, calculadora.multiplicar(10, 5));
    }

    @Test
    public void testarDivisao() {
        assertEquals(2, calculadora.dividir(10, 5));
    }

    @Test
    public void testarMultiplicacaoPorZero() {
        assertEquals(0, calculadora.multiplicar(10, 0));
    }
}