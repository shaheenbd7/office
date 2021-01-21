package com.example.vagavagi;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class AdapterRecord extends RecyclerView.Adapter<ViewHolderRecord> {

    private Context context;
    public List<Record> recordList;

    public AdapterRecord(Context context, List<Record> recordList) {
        this.context = context;
        this.recordList = recordList;
    }

    @NonNull
    @Override
    public ViewHolderRecord onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_record, parent,false);
        return  new ViewHolderRecord(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderRecord holder, int position) {
        final Record record = recordList.get(position);
        holder.textView_record_description.setText( record.getRecordDescription() );
        holder.textView_record_status.setText( record.getRecordStatus() );
        holder.textView_record_date.setText( record.getRecordDate() );
    }


    @Override
    public int getItemCount() {
        return recordList.size();
    }
}
