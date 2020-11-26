package com.example.vagavagi;

import android.content.Context;
import android.os.AsyncTask;

import androidx.annotation.NonNull;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;

public abstract class MyDatabase extends RoomDatabase {

    private static MyDatabase instance;

    public abstract MyDao myDao();

    public static synchronized MyDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(),
                    MyDatabase.class, "note_database")
                    .fallbackToDestructiveMigration()
                    .addCallback(roomCallback)
                    .build();
        }
        return instance;
    }

    private static RoomDatabase.Callback roomCallback = new RoomDatabase.Callback() {
        @Override
        public void onCreate(@NonNull SupportSQLiteDatabase db) {
            super.onCreate(db);
            new PopulateDbAsyncTask(instance).execute();
        }
    };

    private static class PopulateDbAsyncTask extends AsyncTask<Void, Void, Void> {
        private MyDao myDao;
        private PopulateDbAsyncTask(MyDatabase db) {
            myDao = db.myDao();
        }
        @Override
        protected Void doInBackground(Void... voids) {
            myDao.insert(new TableRecord(1,"27_Nov_2020", "1", "2","3", "4", "Description 1","1000","2"));
            myDao.insert(new TableRecord(2,"27_Nov_2020", "1", "2","3", "4", "Description 1","1000","2"));
            myDao.insert(new TableRecord(3,"27_Nov_2020", "1", "2","3", "4", "Description 1","1000","2"));
            return null;
        }
    }


}
