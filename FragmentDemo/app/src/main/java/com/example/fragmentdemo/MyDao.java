package com.example.fragmentdemo;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface MyDao {

    @Insert
    void insert(Data data);

    @Query("SELECT * FROM data_table ORDER BY id ASC")
    LiveData< List<Data> > getAllData();

}
