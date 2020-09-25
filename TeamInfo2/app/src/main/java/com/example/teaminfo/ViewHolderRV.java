package com.example.teaminfo;

import android.content.Context;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;

public class ViewHolderRV  extends RecyclerView.ViewHolder {

    View mView;

    public ViewHolderRV(@NonNull View itemView) {
        super(itemView);

        mView = itemView;
    }

    public void setData(Context context, String name, String email, String contactNo, String image) {

        TextView mNameView = mView.findViewById(R.id.rProfileName);
        TextView mEmailView = mView.findViewById(R.id.rEmail);
        TextView mContactNoView = mView.findViewById(R.id.rContactNo);
        ImageView mImageView = mView.findViewById(R.id.rProfileImage);

        mNameView.setText(name);
        mEmailView.setText(email);
        mContactNoView.setText(contactNo);
        Glide.with(context).load(image).apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL)).into(mImageView);
       // Picasso.get().load(image).into(mImageView);

//        var requestOptions = RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL);

    }

}
