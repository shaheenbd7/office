package com.example.fragmentdemo;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    private static final String TAG = "Adapter :: ";

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
    public void onBindViewHolder(@NonNull MyViewHolder holder, final int position) {
        final Data currentData = allData.get(position);
        holder.textViewId.setText("ID: " + currentData.getId());
        holder.textViewAuthor.setText("Author: " + currentData.getAuthor());

        // Picasso.get().load(currentData.getDownload_url()).into(holder.imageView);
       Glide.with(context).load(currentData.getDownload_url()).into(holder.imageView);

        holder.cell.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Log.d(TAG, "onClick: " );
                Toast.makeText(context, "Cell:: " + position, Toast.LENGTH_SHORT).show();

//                AppCompatActivity activity = (AppCompatActivity)view.getContext();
//                FragmentDetails fragmentDetails = new FragmentDetails();
//                activity.getSupportFragmentManager().beginTransaction().replace(R.id.start_point,fragmentDetails).addToBackStack(null).commit();

                Intent intent = new Intent(context, DetailsActivity.class);
                //intent.putExtra("position", String.valueOf(position));
                intent.putExtra("position", currentData.getId());
                context.startActivity(intent);
            }
        });

        Log.d(TAG, "onBindViewHolder: " + position);
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
