package com.example.fragmentdemo;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import java.util.List;

public class DataViewModel extends AndroidViewModel {

    private MyRepository repo;
    private LiveData<List<Data>> allData;

    public DataViewModel(@NonNull Application application) {
        super(application);

        repo = new MyRepository(application);
        allData = repo.getAllData();
    }

    public void insert(Data data) {
        repo.insert(data);
    }

    public LiveData<List<Data>> getAllData() {
        return allData;
    }
}
