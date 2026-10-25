package com.example.gestaoprodutos;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class CadastroProdutoActivity extends AppCompatActivity {

    public class CadastroProduto extends AppCompatActivity {

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            EdgeToEdge.enable(this);
            setContentView(R.layout.activity_cadastro_produto);
            ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
                Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
                return insets;
            });
            EditText edtnome = findViewById(R.id.edtnome);
            EditText edtpreco = findViewById(R.id.edtpreco);
            Button btnSalvar = findViewById(R.id.btnSalvar);

            btnSalvar.setOnClickListener(v -> {
                String nome = edtnome.getText().toString();
                Double preco = Double.parseDouble(edtpreco.getText().toString());

                Intent resultado = new Intent();
                resultado.putExtra("nome",nome);
                resultado.putExtra("preco",preco);

                setResult(RESULT_OK,resultado);
                finish();
            });
        };

        }
    }