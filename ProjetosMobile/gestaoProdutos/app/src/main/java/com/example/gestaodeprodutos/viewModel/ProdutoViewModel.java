package com.example.gestaodeprodutos.viewModel;


import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;


import com.example.gestaodeprodutos.model.Produto;
import com.example.gestaodeprodutos.repository.ProdutoRepository;


import java.util.List;


public class ProdutoViewModel extends ViewModel {


    private final ProdutoRepository repository;
    private final MutableLiveData<List<Produto>> produtos = new MutableLiveData<>();


    public ProdutoViewModel() {
        repository = new ProdutoRepository();
    }


    public LiveData<List<Produto>> getProdutos() {
        return produtos;
    }


    public void carregarProdutos() {
        repository.listarProdutos(produtos);
    }


    public LiveData<Boolean> salvarProduto(String nome, Double preco) {
        Produto p = new Produto(nome, preco);
        System.out.println(p);
        return repository.inserirProduto(p);
    }
}
