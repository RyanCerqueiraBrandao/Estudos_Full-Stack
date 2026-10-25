package com.example.gestaodeprodutos.adapter;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


import com.example.gestaodeprodutos.R;
import com.example.gestaodeprodutos.model.Produto;


import java.util.List;


public class ProdutoAdapter extends RecyclerView.Adapter<ProdutoAdapter.ViewHolder> {


    private List<Produto> lista;


    public ProdutoAdapter(List<Produto> lista) {
        this.lista = lista;
    }


    public void atualizarLista(List<Produto> novaLista) {
        this.lista = novaLista;
        notifyDataSetChanged();
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View item = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_produto, parent, false);
        return new ViewHolder(item);
    }


    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Produto p = lista.get(position);
        holder.txtNome.setText(p.getNome());
        holder.txtPreco.setText("R$ " + p.getPreco());
    }


    @Override
    public int getItemCount() {
        return lista != null ? lista.size() : 0;
    }


    public class ViewHolder extends RecyclerView.ViewHolder {


        TextView txtNome, txtPreco;


        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            txtNome = itemView.findViewById(R.id.txtNome);
            txtPreco = itemView.findViewById(R.id.txtPreco);
        }
    }
}

