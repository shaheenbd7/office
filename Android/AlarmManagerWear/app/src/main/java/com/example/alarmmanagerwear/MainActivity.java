package com.example.alarmmanagerwear;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.wearable.activity.WearableActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TimePicker;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;

public class MainActivity extends FragmentActivity implements TimePickerDialog.OnTimeSetListener {

    private static final String TAG = "MainActivity";

    private TextView mTextView;

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    ArrayList<ExampleItem> exampleList = new ArrayList<>();

    // Notification
    public static final int NOTIFICATION_ID = 888;
//    private NotificationManagerCompat mNotificationManagerCompat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.text);

        // Enables Always-on
        //setAmbientEnabled();

        //createDummyData();

        createRecylerView();

        //mNotificationManagerCompat = NotificationManagerCompat.from(getApplicationContext());

        Button addBtn = (Button)findViewById(R.id.add_button);
        addBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: ADD TIME");
                DialogFragment timePicker = new TimePickerFragment();
                timePicker.show(getSupportFragmentManager(), "time picker");
            }
        });



//        FloatingActionButton add_button = (FloatingActionButton) findViewById(R.id.add_button);
//        add_button.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
////                DialogFragment timePicker = new TimePickerFragment();
////                timePicker.show(getSupportFragmentManager(), "time picker");
//                Log.d(TAG, "onClick: FABS");
//            }
//        });
    }

    public void createDummyData() {
        exampleList.add(new ExampleItem(R.drawable.account_box, "Line 1", "Description 1"));
        exampleList.add(new ExampleItem(R.drawable.directions_bike, "Line 2", "Description 2"));
        exampleList.add(new ExampleItem(R.drawable.emoji_people, "Line 3", "Description 3"));
        exampleList.add(new ExampleItem(R.drawable.account_box, "Line 4", "Description 4"));
        exampleList.add(new ExampleItem(R.drawable.account_box, "Line 5", "Description 5"));
    }

    public void createRecylerView() {
        mRecyclerView = findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(this);
        mAdapter = new ExampleAdapter(exampleList);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerView.setAdapter(mAdapter);
    }

    @Override
    public void onTimeSet(TimePicker timePicker, int hourOfDay, int minute) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, hourOfDay);
        c.set(Calendar.MINUTE, minute);
        c.set(Calendar.SECOND, 0);
        updateTimeText(c);
        startAlarm(c);
    }

    public void addNewItem(String txt) {
        int  sz = exampleList.size();
        exampleList.add(sz, new ExampleItem(R.drawable.ic_alarms, txt, "Once"));
        mAdapter.notifyItemInserted(sz);
    }

    private void updateTimeText(Calendar c) {
        String timeText = "";
        timeText += DateFormat.getTimeInstance(DateFormat.SHORT).format(c.getTime());
        Log.d(TAG, "updateTimeText: " + timeText);
        //mTextView.setText(timeText);
        addNewItem(timeText);
        //generateBigTextStyleNotification();
    }

    private void startAlarm(Calendar c) {
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, AlertReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 1, intent, 0);
        if (c.before(Calendar.getInstance())) {
            c.add(Calendar.DATE, 1);
        }
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, c.getTimeInMillis(), pendingIntent);
    }
    private void cancelAlarm() {
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, AlertReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 1, intent, 0);
        alarmManager.cancel(pendingIntent);
        //mTextView.setText("Alarm canceled");
    }

//    private void generateBigTextStyleNotification() {
//
//        Log.d(TAG, "generateBigTextStyleNotification()");
//
//        // Main steps for building a BIG_TEXT_STYLE notification:
//        //      0. Get your data
//        //      1. Create/Retrieve Notification Channel for O and beyond devices (26+)
//        //      2. Build the BIG_TEXT_STYLE
//        //      3. Set up main Intent for notification
//        //      4. Create additional Actions for the Notification
//        //      5. Build and issue the notification
//
//        // 0. Get your data (everything unique per Notification).
//        MockDatabase.BigTextStyleReminderAppData bigTextStyleReminderAppData =
//                MockDatabase.getBigTextStyleData();
//
//        // 1. Create/Retrieve Notification Channel for O and beyond devices (26+).
//        String notificationChannelId =
//                NotificationUtil.createNotificationChannel(this, bigTextStyleReminderAppData);
//
//
//        // 2. Build the BIG_TEXT_STYLE.
//        NotificationCompat.BigTextStyle bigTextStyle = new NotificationCompat.BigTextStyle()
//                // Overrides ContentText in the big form of the template.
//                .bigText(bigTextStyleReminderAppData.getBigText())
//                // Overrides ContentTitle in the big form of the template.
//                .setBigContentTitle(bigTextStyleReminderAppData.getBigContentTitle())
//                // Summary line after the detail section in the big form of the template.
//                // Note: To improve readability, don't overload the user with info. If Summary Text
//                // doesn't add critical information, you should skip it.
//                .setSummaryText(bigTextStyleReminderAppData.getSummaryText());
//
//
//        // 3. Set up main Intent for notification.
//        Intent notifyIntent = new Intent(this, BigTextMainActivity.class);
//
//        // When creating your Intent, you need to take into account the back state, i.e., what
//        // happens after your Activity launches and the user presses the back button.
//
//        // There are two options:
//        //      1. Regular activity - You're starting an Activity that's part of the application's
//        //      normal workflow.
//
//        //      2. Special activity - The user only sees this Activity if it's started from a
//        //      notification. In a sense, the Activity extends the notification by providing
//        //      information that would be hard to display in the notification itself.
//
//        // For the BIG_TEXT_STYLE notification, we will consider the activity launched by the main
//        // Intent as a special activity, so we will follow option 2.
//
//        // For an example of option 1, check either the MESSAGING_STYLE or BIG_PICTURE_STYLE
//        // examples.
//
//        // For more information, check out our dev article:
//        // https://developer.android.com/training/notify-user/navigation.html
//
//        // Sets the Activity to start in a new, empty task
//        notifyIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//
//        PendingIntent notifyPendingIntent =
//                PendingIntent.getActivity(
//                        this,
//                        0,
//                        notifyIntent,
//                        PendingIntent.FLAG_UPDATE_CURRENT
//                );
//
//
//        // 4. Create additional Actions (Intents) for the Notification.
//
//        // In our case, we create two additional actions: a Snooze action and a Dismiss action.
//        // Snooze Action.
//        Intent snoozeIntent = new Intent(this, BigTextIntentService.class);
//        snoozeIntent.setAction(BigTextIntentService.ACTION_SNOOZE);
//
//        PendingIntent snoozePendingIntent = PendingIntent.getService(this, 0, snoozeIntent, 0);
//        NotificationCompat.Action snoozeAction =
//                new NotificationCompat.Action.Builder(
//                        R.drawable.ic_alarm_white_48dp,
//                        "Snooze",
//                        snoozePendingIntent)
//                        .build();
//
//
//        // Dismiss Action.
//        Intent dismissIntent = new Intent(this, BigTextIntentService.class);
//        dismissIntent.setAction(BigTextIntentService.ACTION_DISMISS);
//
//        PendingIntent dismissPendingIntent = PendingIntent.getService(this, 0, dismissIntent, 0);
//        NotificationCompat.Action dismissAction =
//                new NotificationCompat.Action.Builder(
//                        R.drawable.ic_cancel_white_48dp,
//                        "Dismiss",
//                        dismissPendingIntent)
//                        .build();
//
//
//        // 5. Build and issue the notification.
//
//        // Because we want this to be a new notification (not updating a previous notification), we
//        // create a new Builder. Later, we use the same global builder to get back the notification
//        // we built here for the snooze action, that is, canceling the notification and relaunching
//        // it several seconds later.
//
//        // Notification Channel Id is ignored for Android pre O (26).
//        NotificationCompat.Builder notificationCompatBuilder =
//                new NotificationCompat.Builder(
//                        getApplicationContext(), notificationChannelId);
//
//        notificationCompatBuilder.setWhen(System.currentTimeMillis()+3000);
//
//        GlobalNotificationBuilder.setNotificationCompatBuilderInstance(notificationCompatBuilder);
//
//        Notification notification = notificationCompatBuilder
//                // BIG_TEXT_STYLE sets title and content for API 16 (4.1 and after).
//                .setStyle(bigTextStyle)
//                // Title for API <16 (4.0 and below) devices.
//                .setContentTitle(bigTextStyleReminderAppData.getContentTitle())
//                // Content for API <24 (7.0 and below) devices.
//                .setContentText(bigTextStyleReminderAppData.getContentText())
//                .setSmallIcon(R.drawable.ic_launcher)
//                .setLargeIcon(BitmapFactory.decodeResource(
//                        getResources(),
//                        R.drawable.ic_alarm_white_48dp))
//                .setContentIntent(notifyPendingIntent)
//                .setDefaults(NotificationCompat.DEFAULT_ALL)
//                // Set primary color (important for Wear 2.0 Notifications).
//                .setColor(ContextCompat.getColor(getApplicationContext(), R.color.black))
//
//                // SIDE NOTE: Auto-bundling is enabled for 4 or more notifications on API 24+ (N+)
//                // devices and all Wear devices. If you have more than one notification and
//                // you prefer a different summary notification, set a group key and create a
//                // summary notification via
//                // .setGroupSummary(true)
//                // .setGroup(GROUP_KEY_YOUR_NAME_HERE)
//
//                .setCategory(Notification.CATEGORY_REMINDER)
//
//                // Sets priority for 25 and below. For 26 and above, 'priority' is deprecated for
//                // 'importance' which is set in the NotificationChannel. The integers representing
//                // 'priority' are different from 'importance', so make sure you don't mix them.
//                .setPriority(bigTextStyleReminderAppData.getPriority())
//
//                // Sets lock-screen visibility for 25 and below. For 26 and above, lock screen
//                // visibility is set in the NotificationChannel.
//                .setVisibility(bigTextStyleReminderAppData.getChannelLockscreenVisibility())
//
//                // Adds additional actions specified above.
//                .addAction(snoozeAction)
//                .addAction(dismissAction)
//
//                .build();
//
//        mNotificationManagerCompat.notify(NOTIFICATION_ID, notification);
//    }
}
