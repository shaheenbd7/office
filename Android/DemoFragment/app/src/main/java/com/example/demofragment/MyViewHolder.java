package com.example.demofragment;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class MyViewHolder extends RecyclerView.ViewHolder {

    public TextView textView;
    public ImageView imageView;

    public MyViewHolder(@NonNull View itemView) {
        super(itemView);

        textView = (TextView) itemView.findViewById(R.id.author_name);
        imageView = (ImageView) itemView.findViewById(R.id.image_view);

    }
}
