package com.example.vagavagi;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class AdapterGroup extends RecyclerView.Adapter<ViewHolderGroup> {
    private Context context;
    public List<Group> groups;

    public AdapterGroup(Context context, List<Group> groups) {
        this.context = context;
        this.groups = groups;
    }

    @NonNull
    @Override
    public ViewHolderGroup onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_group, parent,false);
        return  new ViewHolderGroup(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderGroup holder, int position) {
        final Group group = groups.get(position);
        holder.group_name.setText( group.getName() );
        holder.group_status.setText( group.getStatus() );
        holder.group_amount.setText( group.getAmount() );
    }

    @Override
    public int getItemCount() {
        return groups.size();
    }
}
