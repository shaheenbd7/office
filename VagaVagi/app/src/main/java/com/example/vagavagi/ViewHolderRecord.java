package com.example.vagavagi;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ViewHolderRecord extends RecyclerView.ViewHolder {

    public TextView textView_record_description;
    public TextView textView_record_status;
    public TextView textView_record_date;
    public ImageView image_record;

    public ViewHolderRecord(@NonNull View itemView) {
        super(itemView);

        textView_record_description = (TextView) itemView.findViewById(R.id.textView_record_description);
        textView_record_status = (TextView) itemView.findViewById(R.id.textView_record_status);
        textView_record_date = (TextView) itemView.findViewById(R.id.textView_record_date);
        image_record = (ImageView) itemView.findViewById(R.id.image_record);
    }
}
