package com.example.vagavagi;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.List;

public class ViewModel extends AndroidViewModel {

    MyRepository repository;
    LiveData<List<TableRecord>> allRecords;

    public ViewModel(@NonNull Application application) {
        super(application);
        repository = new MyRepository(application);
        allRecords = repository.getAllRecords();
    }

    public void insertRecord(TableRecord record) {
        repository.insert(record);
    }

    public LiveData<List<TableRecord>> getAllNotes() {
        return allRecords;
    }
}
