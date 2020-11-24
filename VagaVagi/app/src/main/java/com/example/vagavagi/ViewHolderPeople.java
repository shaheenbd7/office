package com.example.vagavagi;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


public class ViewHolderPeople extends RecyclerView.ViewHolder {

    public TextView name;
    public TextView status;
    public TextView balance;
    public ImageView imageView;

    public ViewHolderPeople(@NonNull View itemView) {
        super(itemView);

        name = (TextView) itemView.findViewById(R.id.person_name);
        status = (TextView) itemView.findViewById(R.id.person_status);
        balance = (TextView) itemView.findViewById(R.id.person_balance);
        imageView = (ImageView) itemView.findViewById(R.id.person_image);
    }
}
