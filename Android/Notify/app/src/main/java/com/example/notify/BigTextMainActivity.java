package com.example.notify;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Bundle;

//import com.example.android.wearable.wear.wearnotifications.MainActivity;
//import com.example.android.wearable.wear.wearnotifications.R;

/**
 * Template class meant to include functionality for your Reminder/Alarm App. (This project's main
 * focus is on Notification Styles.)
 */
public class BigTextMainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_big_text_main);

        // Cancel Notification
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.cancel(MainActivity.NOTIFICATION_ID);

        // TODO: Handle and display reminder from your database
    }
}