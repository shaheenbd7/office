package com.example.notify;

import android.app.NotificationManager;
import android.content.ContentResolver;
import android.content.Context;
import android.net.Uri;

import androidx.core.app.NotificationCompat;
import androidx.core.app.Person;
import androidx.core.graphics.drawable.IconCompat;

import java.util.ArrayList;


import android.app.NotificationManager;
import android.content.ContentResolver;
import android.content.Context;
import android.net.Uri;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationCompat.MessagingStyle;
import androidx.core.app.Person;
import androidx.core.graphics.drawable.IconCompat;

// import com.example.android.wearable.wear.wearnotifications.common.R;

import java.util.ArrayList;


/**
 * Mock data for each of the Notification Style Demos.
 */
public final class MockDatabase {

    public static BigTextStyleReminderAppData getBigTextStyleData() {
        return BigTextStyleReminderAppData.getInstance();
    }

    /**
     * Represents data needed for BigTextStyle Notification.
     */
    public static class BigTextStyleReminderAppData extends MockNotificationData {

        private static BigTextStyleReminderAppData sInstance = null;

        // Unique data for this Notification.Style:
        private String mBigContentTitle;
        private String mBigText;
        private String mSummaryText;

        public static BigTextStyleReminderAppData getInstance() {
            if (sInstance == null) {
                sInstance = getSync();
            }

            return sInstance;
        }

        private static synchronized BigTextStyleReminderAppData getSync() {
            if (sInstance == null) {
                sInstance = new BigTextStyleReminderAppData();
            }

            return sInstance;
        }

        private BigTextStyleReminderAppData() {

            // Standard Notification values:
            // Title for API <16 (4.0 and below) devices.
            mContentTitle = "Veosens";
            // Content for API <24 (4.0 and below) devices.
            mContentText = "Be Active, Walk More";
            mPriority = NotificationCompat.PRIORITY_DEFAULT;

            // BigText Style Notification values:
            mBigContentTitle = "Veosens";
            mBigText = "Be Active, Walk More";
            mSummaryText = "Dogs and Garage";

            // Notification channel values (for devices targeting 26 and above):
            mChannelId = "channel_reminder_1";
            // The user-visible name of the channel.
            mChannelName = "Sample Reminder";
            // The user-visible description of the channel.
            mChannelDescription = "Sample Reminder Notifications";
            mChannelImportance = NotificationManager.IMPORTANCE_DEFAULT;
            mChannelEnableVibrate = false;
            mChannelLockscreenVisibility = NotificationCompat.VISIBILITY_PUBLIC;
        }

        public String getBigContentTitle() {
            return mBigContentTitle;
        }

        public String getBigText() {
            return mBigText;
        }

        public String getSummaryText() {
            return mSummaryText;
        }

        @Override
        public String toString() {
            return getBigContentTitle() + getBigText();
        }
    }

    /**
     * Represents standard data needed for a Notification.
     */
    public abstract static class MockNotificationData {

        // Standard notification values:
        protected String mContentTitle;
        protected String mContentText;
        protected int mPriority;

        // Notification channel values (O and above):
        protected String mChannelId;
        protected CharSequence mChannelName;
        protected String mChannelDescription;
        protected int mChannelImportance;
        protected boolean mChannelEnableVibrate;
        protected int mChannelLockscreenVisibility;

        // Notification Standard notification get methods:
        public String getContentTitle() {
            return mContentTitle;
        }

        public String getContentText() {
            return mContentText;
        }

        public int getPriority() {
            return mPriority;
        }

        // Channel values (O and above) get methods:
        public String getChannelId() {
            return mChannelId;
        }

        public CharSequence getChannelName() {
            return mChannelName;
        }

        public String getChannelDescription() {
            return mChannelDescription;
        }

        public int getChannelImportance() {
            return mChannelImportance;
        }

        public boolean isChannelEnableVibrate() {
            return mChannelEnableVibrate;
        }

        public int getChannelLockscreenVisibility() {
            return mChannelLockscreenVisibility;
        }
    }

    public static Uri resourceToUri(Context context, int resId) {
        return Uri.parse(
                ContentResolver.SCHEME_ANDROID_RESOURCE
                        + "://"
                        + context.getResources().getResourcePackageName(resId)
                        + "/"
                        + context.getResources().getResourceTypeName(resId)
                        + "/"
                        + context.getResources().getResourceEntryName(resId));
    }
}

