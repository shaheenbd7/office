package com.example.vagavagi;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface MyDao {

    @Insert
    void insert(TableRecord record);

    @Update
    void update(TableRecord record);

    @Delete
    void delete(TableRecord record);

    @Query("SELECT * FROM table_record ORDER BY id DESC")
    LiveData<List<TableRecord>> getAllRecord();
}
