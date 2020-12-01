package com.example.fragmentdemo;

import android.media.Image;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class MyViewHolder extends RecyclerView.ViewHolder {

    public TextView textViewId;
    public TextView textViewAuthor;
    public ImageView imageView;
    public RelativeLayout cell;

    public MyViewHolder(@NonNull View itemView) {
        super(itemView);

        textViewId = (TextView) itemView.findViewById(R.id.data_id);
        textViewAuthor = (TextView) itemView.findViewById(R.id.data_author);
        imageView = (ImageView) itemView.findViewById(R.id.card_image);
        cell = (RelativeLayout) itemView.findViewById(R.id.cell_data);
    }
}
