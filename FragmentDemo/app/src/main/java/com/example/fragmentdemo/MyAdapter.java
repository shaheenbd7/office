package com.example.fragmentdemo;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    private Context context;
    private List<Data> allData  = new ArrayList<>();

    public MyAdapter(Context context, List<Data> allData) {
        this.context = context;
        this.allData = allData;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.cell, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Data currentData = allData.get(position);
        // holder.imageView =
        holder.textView.setText("Author: " + "\n" + currentData.getAuthor());
        //Picasso.get().load(currentData.getDownload_url()).into(holder.imageView);
        Glide.with(context).load(currentData.getDownload_url()).into(holder.imageView);
    }

    @Override
    public int getItemCount() {
        return allData.size();
    }

    public void setData(List<Data> dataList) {
        this.allData = dataList;
        notifyDataSetChanged();
    }
}
