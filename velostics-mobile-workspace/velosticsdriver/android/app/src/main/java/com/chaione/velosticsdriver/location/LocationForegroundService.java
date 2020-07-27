package com.chaione.velosticsdriver.location;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.chaione.velosticsdriver.GeoLocationHeadlessService;
import com.chaione.velosticsdriver.MainActivity;
import com.chaione.velosticsdriver.R;
import com.google.gson.Gson;

public class LocationForegroundService extends Service implements LocationEventReceiver {
    public static final String CHANNEL_ID = "ForegroundServiceChannel";
    public static final int NOTIFICATION_ID = 1;
    public static final String LOCATION_EVENT_NAME = "com.rnbglocation.LOCATION_INFO";
    public static final String LOCATION_EVENT_DATA_NAME = "LocationData";
    public static final int LOCATION_UPDATE_INTERVAL = 120000;
    public static final String JS_LOCATION_LAT_KEY = "latitude";
    public static final String JS_LOCATION_LON_KEY = "longitude";
    public static final String JS_LOCATION_TIME_KEY = "timestamp";
    public static final String JS_LOCATION_EVENT_NAME = "location_received";

    private AlarmManager mAlarmManager;
    private BroadcastReceiver mEventReceiver;
    private PendingIntent mLocationBackgroundServicePendingIntent;
    private Gson mGson;

    private NotificationManager mNotificationManager;
    private NotificationCompat.Builder mBuilder;

    @Override
    public void onCreate() {
        super.onCreate();
        mAlarmManager = (AlarmManager) getApplicationContext().getSystemService(Context.ALARM_SERVICE);
        mGson = new Gson();
        createEventReceiver();
        registerEventReceiver();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();
        startForeground(NOTIFICATION_ID, createNotification());

        createLocationPendingIntent();
        mAlarmManager.setRepeating(
            AlarmManager.RTC,
            System.currentTimeMillis(),
            LOCATION_UPDATE_INTERVAL,
            mLocationBackgroundServicePendingIntent
        );

        return START_NOT_STICKY;
    }

    @Override
    public void createEventReceiver() {
        mEventReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                LocationCoordinates locationCoordinates = mGson.fromJson(
                        intent.getStringExtra(LOCATION_EVENT_DATA_NAME), LocationCoordinates.class);


                Intent service = new Intent(getApplicationContext(), GeoLocationHeadlessService.class);
                Bundle bundle = new Bundle();
                Bundle coords = new Bundle();
                coords.putDouble("latitude", locationCoordinates.getLatitude());
                coords.putDouble("longitude", locationCoordinates.getLongitude());
                coords.putDouble("accuracy", locationCoordinates.getAccuracy());
                coords.putDouble("heading", locationCoordinates.getHeading());


                bundle.putBundle("coords", coords);
                bundle.putDouble("timestamp", locationCoordinates.getTimestamp() );

                service.putExtras(bundle);
                getApplicationContext().startService(service);
                /*
                TODO: do any kind of logic in here with the LocationCoordinates class
                e.g. like a request to an API, etc --> all on the native side
                */
            }
        };
    }

    @Override
    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction(LOCATION_EVENT_NAME);
        registerReceiver(mEventReceiver, eventFilter);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        unregisterReceiver(mEventReceiver);
        mAlarmManager.cancel(mLocationBackgroundServicePendingIntent);
        stopSelf();
        super.onDestroy();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    private Notification createNotification() {
       /* Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentIntent(pendingIntent)
                .build();*/

        String NOTIFICATION_CHANNEL_ID = "com.chaione.velosticsdriver";
        String channelName = "My Background Service";

        Intent startIntent = new Intent(getApplicationContext(), MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 1000, startIntent, 0);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.BigTextStyle bigTextStyle = new NotificationCompat.BigTextStyle();
            bigTextStyle.setBigContentTitle(LocationModule.TITLE);
            bigTextStyle.bigText(LocationModule.DESCRIPTION);
            builder.setStyle(bigTextStyle);
        } else {
            builder.setContentTitle("hellow").setContentText("Location");
        }

        builder.setWhen(System.currentTimeMillis());
        builder.setSmallIcon(R.mipmap.ic_launcher);
        builder.setPriority(Notification.PRIORITY_MAX);
        builder.setFullScreenIntent(contentIntent, true);
        mNotificationManager = (NotificationManager) com.chaione.velosticsdriver.LocationManager.getAppContext().getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel notificationChannel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, "Location", importance);
            builder.setChannelId(NOTIFICATION_CHANNEL_ID);
            mNotificationManager.createNotificationChannel(notificationChannel);
        }

        Notification notification = builder.build();



        builder.setContentIntent(contentIntent);
        return builder.build();
    }

    private void createLocationPendingIntent() {
        Intent i = new Intent(getApplicationContext(), LocationBackgroundService.class);
        mLocationBackgroundServicePendingIntent = PendingIntent.getService(getApplicationContext(), 1, i, PendingIntent.FLAG_UPDATE_CURRENT);
    }
}
