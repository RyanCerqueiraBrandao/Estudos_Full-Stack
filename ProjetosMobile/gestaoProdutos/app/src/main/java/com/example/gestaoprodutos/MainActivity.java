package com.example.gestaoprodutos;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
            private ArrayList<Produto> produtos;
            private ArrayAdapter<Produto> adapter;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                EdgeToEdge.enable(this);
                setContentView(R.layout.activity_main);
                ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
                    Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
                    v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
                    return insets;
                });

                ListView listaProdutos = findViewById(R.id.ListView);
                FloatingActionButton btnAdd = findViewById(R.id.btnadd);

                produtos = new ArrayList<>();
                //Pega os objetos classe da arraylist e transforma para algo visual
                adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, produtos);
                listaProdutos.setAdapter(adapter);

                btnAdd.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent intent = new Intent(MainActivity.this, CadastroProdutoActivity.class);
                                startActivityForResult(intent,1);
                    }
                });


            }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1 && resultCode == RESULT_OK && data != null){
             String nome = data.getStringExtra("nome");
             Double preco = data.getDoubleExtra("preco",0);

             produtos.add(new Produto(nome,preco));
             adapter.notifyDataSetChanged();

        }
    }
}