package com.example.vagavagi;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import java.util.List;

public class MyRepository {

    MyDao mydao;
    LiveData<List<TableRecord>> allRecords;

    public MyRepository(Application application) {
        MyDatabase database = MyDatabase.getInstance(application);
        mydao = database.myDao();
        allRecords = mydao.getAllRecord();
    }

    public void insert(TableRecord record) {
        new InsertNoteAsyncTask(mydao).execute(record);
    }

    public LiveData<List<TableRecord>> getAllRecords() {
        return allRecords;
    }

    private static class InsertNoteAsyncTask extends AsyncTask<TableRecord, Void, Void> {
        private MyDao myDao;
        private InsertNoteAsyncTask(MyDao noteDao) {
            this.myDao = noteDao;
        }
        @Override
        protected Void doInBackground(TableRecord... notes) {
            myDao.insert(notes[0]);
            return null;
        }
    }
}
