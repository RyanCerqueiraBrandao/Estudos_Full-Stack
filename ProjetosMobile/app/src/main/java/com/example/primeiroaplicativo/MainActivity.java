package com.example.primeiroaplicativo;

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

        TextView texto = findViewById(R.id.textoPrincipal);
        Button botao = findViewById(R.id.botaoMudarTexto);
        EditText caixa = findViewById(R.id.caixadeTexto);

        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                texto.setText(caixa.getText());
            }
        });
    }
}