package com.example.vagavagi;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "shan";

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);

        Log.d(TAG, "onNewToken: "+s);

    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {


        Log.d(TAG, "onMessageReceived: " + " paichi ");

        super.onMessageReceived(remoteMessage);

        String title = remoteMessage.getNotification().getTitle();
        String body = remoteMessage.getNotification().getBody();

//        Map<String, String> extraData = remoteMessage.getData();
//
//        String brandId = extraData.get("brandId");
//        String category = extraData.get("category");
//
        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(this, "TAC")
                        .setContentTitle(title)
                        .setContentText(body)
                        .setSmallIcon(R.drawable.ic_launcher_background);
//
        Intent intent;
//        if (category.equals("shoes")) {
//            intent = new Intent(this, ReceiveNotificationActivity.class);
//
//        } else {
//            intent = new Intent(this, ReceiveNotificationActivity.class);
//
//        }
        intent = new Intent(this, ReceiveNotificationActivity.class);


//        intent.putExtra("brandId", brandId);
//        intent.putExtra("category", category);

        intent.putExtra("brandId", "1");
        intent.putExtra("category", "2");

        PendingIntent pendingIntent = PendingIntent.getActivity(this, 10, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        notificationBuilder.setContentIntent(pendingIntent);


        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);


        int id =  (int) System.currentTimeMillis();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            NotificationChannel channel = new NotificationChannel("TAC","demo",NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }
        notificationManager.notify(id,notificationBuilder.build());

    }
}
