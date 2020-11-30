package com.example.fragmentdemo;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import java.util.List;

public class MyRepository {

    private MyDao myDao;
    private LiveData<List<Data> > dataList;

    public MyRepository(Application application) {
        MyDatabase database = MyDatabase.getInstance(application);
        myDao = database.myDao();
        dataList = myDao.getAllData();
    }

    public void insert(Data data) {
        new InsertNoteAsyncTask(myDao).execute(data);
    }

    private static class InsertNoteAsyncTask extends AsyncTask<Data, Void, Void> {
        private MyDao myDao;
        private InsertNoteAsyncTask(MyDao myDao) {
            this.myDao = myDao;
        }
        @Override
        protected Void doInBackground(Data... allData) {
            myDao.insert(allData[0]);
            return null;
        }
    }

    public LiveData<List<Data>> getAllData() {
        return dataList;
    }
}
