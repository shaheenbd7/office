package com.shan.axon;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.squareup.picasso.Picasso;

import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<ViewHolder> {

    private Context context;
    public List<Person> personData;

    public MyAdapter(Context context, List<Person> personData) {
        this.context = context;
        this.personData = personData;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int i) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_person, parent,false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        Person per = personData.get(position);

        // Set Data

        holder.mNameView.setText(      "Name:  " + per.getName());
        holder.mEmailView.setText(     "Email: " + per.getEmail());
        holder.mContactNoView.setText( "Contact No: " + per.getContactNo());

        String image = "https://firebasestorage.googleapis.com/v0/b/axonrcpc.appspot.com/o/namrataShirodar.jpg?alt=media&token=c83c0aa9-7312-445c-9980-413a5056e376";

        //Glide.with(context).load(per.image).apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL)).into(holder.mProfileImage);
        //Picasso.get().load(image).into(holder.mProfileImage);
        Picasso.get()
                .load(per.getProfileImage())
                .into(holder.mProfileImage);
        //holder.mProfileImage.setImageResource(R.drawable.namrata);


    }


    @Override
    public int getItemCount() {
        return personData.size();
    }

}
