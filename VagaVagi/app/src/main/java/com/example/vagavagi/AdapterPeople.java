package com.example.vagavagi;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class AdapterPeople extends RecyclerView.Adapter<ViewHolderPeople> {

    private Context context;
    public List<Person> personList;

    public AdapterPeople(Context context, List<Person> personList) {
        this.context = context;
        this.personList = personList;
    }

    @NonNull
    @Override
    public ViewHolderPeople onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_person, parent,false);
        return  new ViewHolderPeople(v);
        //return null;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderPeople holder, int position) {
        final Person person = personList.get(position);
        holder.name.setText( person.getName() );
        holder.status.setText( person.getStatus() );
        holder.balance.setText( person.getBalance() );
        //holder.imageView.
    }

    @Override
    public int getItemCount() {
        return personList.size();
    }
}
