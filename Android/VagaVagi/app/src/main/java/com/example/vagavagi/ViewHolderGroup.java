package com.example.vagavagi;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ViewHolderGroup extends RecyclerView.ViewHolder {

    public TextView group_name;
    public TextView group_status;
    public TextView group_amount;
    public ImageView group_imageView;

    public ViewHolderGroup(@NonNull View itemView) {
        super(itemView);

        group_name = (TextView) itemView.findViewById(R.id.textView_group_name);
        group_status = (TextView) itemView.findViewById(R.id.textView_group_status);
        group_amount = (TextView) itemView.findViewById(R.id.textView_group_amount);
        group_imageView = (ImageView) itemView.findViewById(R.id.image_group);
    }
}
