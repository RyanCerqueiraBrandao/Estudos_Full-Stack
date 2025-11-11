package com.example.aplicativo2;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        EditText op1 = findViewById(R.id.n1);
        EditText op2 = findViewById(R.id.n2);
        TextView resultado = findViewById(R.id.Resultado);


        Button Adicao = findViewById(R.id.Adicao);
        Button subtracao = findViewById(R.id.subtracao);
        Button divisao = findViewById(R.id.divisao);
        Button multiplicacao = findViewById(R.id.multiplicacao);
        Button circunferencia = findViewById(R.id.calcularcirc);

        Adicao.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String numero1 = op1.getText().toString();
                String numero2 = op2.getText().toString();
                if (numero1.isBlank() || numero2.isBlank()) {
                    resultado.setText("Digite os dois Valores");
                    return;
                }
                Double op1 = Double.parseDouble(numero1);
                Double op2 = Double.parseDouble(numero2);

                resultado.setText("Resultado: " + (op1 + op2));

            }

        });

        subtracao.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String numero1 = op1.getText().toString();
                String numero2 = op2.getText().toString();
                if (numero1.isBlank() || numero2.isBlank()) {
                    return;
                }
                Double op1 = Double.parseDouble(numero1);
                Double op2 = Double.parseDouble(numero2);

                resultado.setText("Resultado: " + (op1 - op2));

            }

        });
        multiplicacao.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String numero1 = op1.getText().toString();
                String numero2 = op2.getText().toString();
                if (numero1.isBlank() || numero2.isBlank()) {
                    return;
                }
                Double op1 = Double.parseDouble(numero1);
                Double op2 = Double.parseDouble(numero2);

                resultado.setText("Resultado: " + (op1 * op2));

            }

        });
        divisao.setOnClickListener(new View.OnClickListener() {

                                       @Override
                                       public void onClick(View v) {
                                           String numero1 = op1.getText().toString();
                                           String numero2 = op2.getText().toString();
                                           if (numero1.isBlank() || numero2.isBlank()) {
                                               return;
                                           }
                                           Double op1 = Double.parseDouble(numero1);
                                           Double op2 = Double.parseDouble(numero2);

                                           resultado.setText("Resultado: " + (op1 / op2));

                                       }

        });
        circunferencia.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, SegundaTela.class);
                startActivity(intent);
            }
        });

        ;
    }

}