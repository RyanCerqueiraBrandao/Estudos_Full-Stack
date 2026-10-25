package com.example.gestaodeprodutos.repository;


import android.util.Log;


import androidx.lifecycle.MutableLiveData;


import com.example.gestaodeprodutos.model.Produto;
import com.example.gestaodeprodutos.network.ApiService;
import com.example.gestaodeprodutos.network.RetrofitClient;
import com.google.gson.Gson;


import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


// O Repository é responsável por acessar a API.
// Ele separa a ViewModel da lógica de rede.
public class ProdutoRepository {


    private ApiService apiService;


    // API KEY e Bearer Key
    private final String API_KEY = "sb_secret_0Ay5XejrP1adtJ8FHCwr1A_FyZ3mwRE";
    private final String AUTH = "sb_secret_0Ay5XejrP1adtJ8FHCwr1A_FyZ3mwRE";


    public ProdutoRepository() {
        apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    }


    public void listarProdutos(MutableLiveData<List<Produto>> produtosLiveData) {


        apiService.listarProdutos(API_KEY, AUTH).enqueue(new Callback<List<Produto>>() {
            @Override
            public void onResponse(Call<List<Produto>> call, Response<List<Produto>> response) {


                Log.d("API_DEBUG", "Codigo: " + response.code());
                Log.d("API_DEBUG", "Body: " + new Gson().toJson(response.body()));


                if (response.isSuccessful()) {
                    produtosLiveData.setValue(response.body());
                } else {
                    produtosLiveData.setValue(null);
                }
            }


            @Override
            public void onFailure(Call<List<Produto>> call, Throwable t) {
                produtosLiveData.setValue(null);
            }
        });
    }


    public MutableLiveData<Boolean> inserirProduto(Produto produto) {
        MutableLiveData<Boolean> sucesso = new MutableLiveData<>();


        apiService.inserirProduto(API_KEY, AUTH, produto).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                sucesso.setValue(response.isSuccessful());
            }


            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                sucesso.setValue(false);
            }
        });


        return sucesso;
    }
}
