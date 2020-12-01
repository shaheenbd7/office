package com.example.demofragment;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class MyAdapter extends  RecyclerView.Adapter<MyViewHolder>{

    private Context context;
    public List<Data> dataList;

    public MyAdapter(Context context, List<Data> dataList) {
        this.context = context;
        this.dataList = dataList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cell_data, parent,false);
        return  new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        final Data data  = dataList.get(position);
        holder.textView.setText( data.getAuthor() );
        //holder.mNicknameTextView.setText( profile.getNickname() );
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }
}
