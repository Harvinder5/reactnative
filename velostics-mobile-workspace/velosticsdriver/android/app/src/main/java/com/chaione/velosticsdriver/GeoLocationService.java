package com.chaione.velosticsdriver;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.Serializable;

import javax.annotation.Nullable;

public class GeoLocationService extends Service {

    public static final String FOREGROUND = "com.chaione.velosticsdriver.location.FOREGROUND";
    private static int GEOLOCATION_NOTIFICATION_ID = 12345689;
    LocationManager locationManager = null;
    private NotificationManager mNotificationManager;
    private NotificationCompat.Builder mBuilder;

    LocationListener locationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            if (com.chaione.velosticsdriver.LocationManager.IS_DEBUG) {
                Toast.makeText(com.chaione.velosticsdriver.LocationManager.getAppContext(), "Latitude" + location.getLatitude() + "Longitude" + location.getLongitude(), Toast.LENGTH_SHORT).show();

                Log.d("Distance", "distance " + com.chaione.velosticsdriver.LocationManager.DISTANCE + "time " + com.chaione.velosticsdriver.LocationManager.TIME_IN_MILLIS);
            }
            Intent service = new Intent(getApplicationContext(), GeoLocationHeadlessService.class);
            Bundle bundle = new Bundle();
            Bundle coords = new Bundle();
            coords.putDouble("latitude", location.getLatitude());
            coords.putDouble("longitude", location.getLongitude());
            coords.putDouble("accuracy", location.getAccuracy());
            coords.putDouble("altitude", location.getAltitude());
            coords.putDouble("heading", location.getBearing());
            coords.putDouble("speed", location.getSpeed());


            bundle.putBundle("coords", coords);
//            bundle.putString("sfs", "sd");
            bundle.putDouble("timestamp", location.getTime() );
//            WritableMap map = Arguments.createMap();
//            WritableMap coordMap = Arguments.createMap();
//            coordMap.putDouble("latitude", location.getLatitude());
//            coordMap.putDouble("longitude", location.getLongitude());
//            coordMap.putDouble("accuracy", location.getAccuracy());
//            coordMap.putDouble("altitude", location.getAltitude());
//            coordMap.putDouble("heading", location.getBearing());
//            coordMap.putDouble("speed", location.getSpeed());
//
//            map.putMap("coords", coordMap);
//            map.putDouble("timestamp", location.getTime());
//
//            bundle.putSerializable("name", (Serializable) map);

            service.putExtras(bundle);
            getApplicationContext().startService(service);

//            GeoLocationService.this.sendMessage(location);
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {}

        @Override
        public void onProviderEnabled(String s) {}

        @Override
        public void onProviderDisabled(String s) {}
    };

    @Override
    @TargetApi(Build.VERSION_CODES.M)
    public void onCreate() {
        locationManager = getSystemService(LocationManager.class);

        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION);
        if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                    com.chaione.velosticsdriver.LocationManager.TIME_IN_MILLIS,
                    com.chaione.velosticsdriver.LocationManager.DISTANCE,
                    locationListener);
        }
    }

    private void sendMessage(Location location) {
        try {
            Intent intent = new Intent("GeoLocationUpdate");
            intent.putExtra("message", location);
            LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDestroy() {
        locationManager.removeUpdates(locationListener);
        
        super.onDestroy();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startForeground(GEOLOCATION_NOTIFICATION_ID, getCompatNotification());
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private Notification getCompatNotification() {
        String NOTIFICATION_CHANNEL_ID = "com.chaione.velosticsdriver";
        String channelName = "My Background Service";

        Intent startIntent = new Intent(getApplicationContext(), MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 1000, startIntent, 0);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.BigTextStyle bigTextStyle = new NotificationCompat.BigTextStyle();
            bigTextStyle.setBigContentTitle(com.chaione.velosticsdriver.LocationManager.TITLE);
            bigTextStyle.bigText(com.chaione.velosticsdriver.LocationManager.DESCRIPTION);
            builder.setStyle(bigTextStyle);
        } else {
            builder.setContentTitle(com.chaione.velosticsdriver.LocationManager.TITLE).setContentText("Location");
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
}
