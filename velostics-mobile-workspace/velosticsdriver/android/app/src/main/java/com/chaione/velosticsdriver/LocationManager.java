package com.chaione.velosticsdriver;
//
import android.app.ActivityManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;


public class LocationManager extends ReactContextBaseJavaModule {

  public static long DISTANCE = 20 ;
  public static long TIME_IN_MILLIS = 500;
  public static String DESCRIPTION = "";
  public static boolean IS_DEBUG = true;
  public static String TITLE = "Notification";
  public static boolean IS_SHOW_NOTIFICATION = true;
  private GeofencingClient geofencingClient;
  private List<Geofence> geofenceList = new ArrayList<>();
  private PendingIntent geofencePendingIntent;
  private static Context appContext;
  public LocationManager(ReactApplicationContext reactContext) {
    super(reactContext);
    appContext = reactContext;
    BroadcastReceiver geoLocationReceiver = new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        String geoFenceIdEnterId = intent.getStringExtra("geo-fence-enter");
        String geoFenceExitId = intent.getStringExtra("geo-fence-exit");
        if(!TextUtils.isEmpty(geoFenceIdEnterId)) {
            LocationManager.this.sendGeoFenceEvent("enter", geoFenceIdEnterId);

        } else if (!TextUtils.isEmpty(geoFenceExitId)){
            LocationManager.this.sendGeoFenceEvent("exit", geoFenceExitId);
        } else {
            Location message = intent.getParcelableExtra("message");
            LocationManager.this.sendEvent(message);
        }


      }
    };
    LocalBroadcastManager.getInstance(getReactApplicationContext()).registerReceiver(geoLocationReceiver, new IntentFilter("GeoLocationUpdate"));
    geofencingClient = LocationServices.getGeofencingClient(getReactApplicationContext());

  }

  @Override
  public String getName() {
    return "BGLocationManager";
  }


  @ReactMethod
  public void start(final ReadableMap options, Promise promise) {
        try {
      DISTANCE = options.hasKey("distanceFilter") ? (long) options.getDouble("distanceFilter") : 20;
      TIME_IN_MILLIS = options.hasKey("timeInterval") ? (long) options.getDouble("timeInterval") : 500;
      IS_DEBUG = options.hasKey("debug") && options.getBoolean("debug");
      IS_SHOW_NOTIFICATION = options.hasKey("showNotification") && options.getBoolean("showNotification");
      TITLE = options.hasKey("title") ? options.getString("title") : "Location Enabled";
      DESCRIPTION = options.hasKey("description") ? options.getString("description") : "";
    } catch (Exception e) {
      e.printStackTrace();
    }
    String result = "Success";
    try {
      Intent intent = new Intent(GeoLocationService.FOREGROUND);
      intent.setClass(this.getReactApplicationContext(), GeoLocationService.class);
      getReactApplicationContext().startService(intent);
    } catch (Exception e) {
      promise.reject(e);
      return;
    }
    promise.resolve(result);
  }

  @ReactMethod
  public void stop(Promise promise) {
    String result = "Success";
    try {
      Intent intent = new Intent(GeoLocationService.FOREGROUND);
      intent.setClass(this.getReactApplicationContext(), GeoLocationService.class);
      this.getReactApplicationContext().stopService(intent);
    } catch (Exception e) {
      promise.reject(e);
      return;
    }
    promise.resolve(result);
  }

  @ReactMethod
  public void getSignature(Promise promise) {
    AppSignatureHelper appSignature = new AppSignatureHelper(getReactApplicationContext());
    ArrayList<String> sigs =  appSignature.getAppSignatures();
    for (String result : sigs) {
      promise.resolve(result);
    }
  }

  @ReactMethod
  public void startGeoFencing(final ReadableMap options, Promise promise) {

    Log.e("readable_map", options.toString());

    boolean status = false;
    int position = -1;

    String id = options.hasKey("id") ? options.getString("id") : "";
    double latitude = options.hasKey("latitude") ? options.getDouble("latitude") : 0.0;
    double longitude = options.hasKey("longitude") ? options.getDouble("longitude") : 0.0;
    int radius = options.hasKey("radius") ? options.getInt("radius") : 0;

    if (geofenceList.size() > 0) {
        for (int i = 0; i < geofenceList.size(); i++) {
          if (geofenceList.get(i).getRequestId().equalsIgnoreCase(options.getString("id"))) {
            status = true;
            position = i;
          }
        }
      }

      if (!status) {

        Log.e("geolat" + latitude + "__longitude" + longitude + "__id" + id, "__radius"+radius);

        geofenceList.add(new Geofence.Builder()
                .setRequestId(id)
                .setCircularRegion(latitude, longitude, radius)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build());


      } else {
        geofenceList.remove(position);
        Log.e("item_removed", "from list");
        geofenceList.add(new Geofence.Builder()
                .setRequestId(id)
                .setCircularRegion(latitude, longitude, radius)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build());
      }

    geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
            .addOnSuccessListener(new OnSuccessListener<Void>() {
              @Override
              public void onSuccess(Void aVoid) {
                Log.d("GEO", "INSIDE SUCCESS");
              }
            }).addOnFailureListener(new OnFailureListener() {
      @Override
      public void onFailure(@NonNull Exception e) {
        e.printStackTrace();
        Log.e("geofence_error", e.getMessage().toString()+"........."+e.getLocalizedMessage().toString());
        Log.d("GEO", "INSIDE FAILURE");
      }
    });
  }

  @ReactMethod
  public void removeGeoFenceById(String id) {
   Log.d("GEO", "CALLED REMOVED");
    ArrayList<String> list = new ArrayList<>();
    list.add(id);

    geofencingClient.removeGeofences(list).addOnSuccessListener(new OnSuccessListener<Void>() {
      @Override
      public void onSuccess(Void aVoid) {
        Log.d("GEO", "REMOVE SUCCESS");
      }
    });
  }

  @ReactMethod
  public void removeAllGeoFences() {
    Log.d("GEO", "CALLED REMOVE ALL");
    ArrayList<String> removeAllList = new ArrayList<>();

    for (int i = 0; i < geofenceList.size(); i++) {
      removeAllList.add(geofenceList.get(i).getRequestId());
    }
//    if(removeAllList.size() > 0) {
//    geofencingClient.removeGeofences(removeAllList).addOnSuccessListener(new OnSuccessListener<Void>() {
//      @Override
//      public void onSuccess(Void aVoid) {
//        Log.d("GEO", "REMOVE ALL SUCCESS");
//      }
//    });
//    }
      geofencingClient.removeGeofences(getGeofencePendingIntent())
              .addOnSuccessListener(new OnSuccessListener<Void>() {
                  @Override
                  public void onSuccess(Void aVoid) {
                      // Geofences removed
                      // ...
                              Log.d("GEO", "REMOVE ALL SUCCESS");

                  }
              })
              .addOnFailureListener(new OnFailureListener() {
                  @Override
                  public void onFailure(@NonNull Exception e) {
                      // Failed to remove geofences
                      // ...
                              Log.d("GEO", "REMOVE ALL FAILURE");
//
                  }
              });
  }

//  public removeGeoFence(id) {
//
//  }
//  public void rmeoveAll(id) {
//
//  }
  private void sendEvent(Location message) {
    WritableMap map = Arguments.createMap();
    WritableMap coordMap = Arguments.createMap();
    coordMap.putDouble("latitude", message.getLatitude());
    coordMap.putDouble("longitude", message.getLongitude());
    coordMap.putDouble("accuracy", message.getAccuracy());
    coordMap.putDouble("altitude", message.getAltitude());
    coordMap.putDouble("heading", message.getBearing());
    coordMap.putDouble("speed", message.getSpeed());

    map.putMap("coords", coordMap);
    map.putDouble("timestamp", message.getTime());

    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("location", map);
  }
    private void sendGeoFenceEvent(String type, String geoFenceId) {
        WritableMap map = Arguments.createMap();

        map.putString("id", geoFenceId);
        if(type.equalsIgnoreCase("enter")) {
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("geo-fence-enter", map);
        } else if (type.equalsIgnoreCase(("exit"))) {
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("geo-fence-exit", map);

        }

    }


  private GeofencingRequest getGeofencingRequest() {
    GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
    builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER);
    builder.addGeofences(geofenceList);
    return builder.build();
  }


  private PendingIntent getGeofencePendingIntent() {
    if (geofencePendingIntent != null) {
      return geofencePendingIntent;
    }

    Intent intent = new Intent(getReactApplicationContext(), GeofenceBroadcastReceiver.class);
    geofencePendingIntent = PendingIntent.getBroadcast(getReactApplicationContext(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    return geofencePendingIntent;
  }
  public static Context getAppContext() {
        return appContext;
  }
}