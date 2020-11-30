package com.example.fragmentdemo;


import android.content.Context;
import android.os.AsyncTask;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;

@Database(entities = {Data.class}, version = 1)
public abstract class MyDatabase extends RoomDatabase {

    private static MyDatabase instance;
    public abstract MyDao myDao();

    public static synchronized MyDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(),
                    MyDatabase.class, "my_database")
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
            myDao.insert(new Data("0", "Nadir Balcikli", 3264, 2176, "https://unsplash.com/photos/wE9nUW7tMmk", "https://picsum.photos/id/119/3264/2176"));
            return null;
        }
    }
}
