package com.chaione.velosticsdriver.location;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.chaione.velosticsdriver.AppSignatureHelper;
import com.chaione.velosticsdriver.GeofenceBroadcastReceiver;
import com.chaione.velosticsdriver.LocationManager;
import com.chaione.velosticsdriver.MainActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
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
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;


public class LocationModule extends ReactContextBaseJavaModule implements LocationEventReceiver, JSEventSender {
    private static final String MODULE_NAME = "LocationManager";
    private static final String CONST_JS_LOCATION_EVENT_NAME = "JS_LOCATION_EVENT_NAME";
    private static final String CONST_JS_LOCATION_LAT = "JS_LOCATION_LAT_KEY";
    private static final String CONST_JS_LOCATION_LON = "JS_LOCATION_LON_KEY";
    private static final String CONST_JS_LOCATION_TIME = "JS_LOCATION_TIME_KEY";

    public static long DISTANCE = 100 ;
    public static long TIME_IN_MILLIS = 500;

    public static String DESCRIPTION = "enabled";
    public static boolean IS_DEBUG = true;
    public static String TITLE = "Location Tracking";


    private GeofencingClient geofencingClient;
    private List<Geofence> geofenceList = new ArrayList<>();
    private PendingIntent geofencePendingIntent;


    private Context mContext;
    private Intent mForegroundServiceIntent;
    private BroadcastReceiver mEventReceiver;
    private Gson mGson;

    LocationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mForegroundServiceIntent = new Intent(mContext, LocationForegroundService.class);
        mGson = new Gson();
        createEventReceiver();
        registerEventReceiver();

        BroadcastReceiver geoLocationReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String geoFenceIdEnterId = intent.getStringExtra("geo-fence-enter");
                String geoFenceExitId = intent.getStringExtra("geo-fence-exit");
                if(!TextUtils.isEmpty(geoFenceIdEnterId)) {
                    LocationModule.this.sendGeoFenceEvent("enter", geoFenceIdEnterId);

                } else if (!TextUtils.isEmpty(geoFenceExitId)){
                    LocationModule.this.sendGeoFenceEvent("exit", geoFenceExitId);
                } else {
                    Location message = intent.getParcelableExtra("message");
                    LocationModule.this.sendEvent(message);
                }


            }
        };
        LocalBroadcastManager.getInstance(getReactApplicationContext()).registerReceiver(geoLocationReceiver, new IntentFilter("GeoLocationUpdate"));
        geofencingClient = LocationServices.getGeofencingClient(getReactApplicationContext());



    }

    @ReactMethod
    public void start(final ReadableMap options, Promise promise) {
        Log.i("BGLocation", "started");
        try {
            DISTANCE = options.hasKey("distanceFilter") ? (long) options.getDouble("distanceFilter") : 100;
            TIME_IN_MILLIS = options.hasKey("timeInterval") ? (long) options.getDouble("timeInterval") : 500;
            IS_DEBUG = options.hasKey("debug") && options.getBoolean("debug");
            TITLE = options.hasKey("title") ? options.getString("title") : "Location Tracking";
            DESCRIPTION = options.hasKey("description") ? options.getString("description") : "enabled";
        } catch (Exception e) {
            e.printStackTrace();
        }
        ContextCompat.startForegroundService(mContext, mForegroundServiceIntent);
        promise.resolve("success");
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
    public void getSignature(Promise promise) {
        AppSignatureHelper appSignature = new AppSignatureHelper(getReactApplicationContext());
        ArrayList<String> sigs =  appSignature.getAppSignatures();
        for (String result : sigs) {
            promise.resolve(result);
        }
    }
    @ReactMethod
    public void stop() {
        mContext.stopService(mForegroundServiceIntent);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(CONST_JS_LOCATION_EVENT_NAME, LocationForegroundService.JS_LOCATION_EVENT_NAME);
        constants.put(CONST_JS_LOCATION_LAT, LocationForegroundService.JS_LOCATION_LAT_KEY);
        constants.put(CONST_JS_LOCATION_LON, LocationForegroundService.JS_LOCATION_LON_KEY);
        constants.put(CONST_JS_LOCATION_TIME, LocationForegroundService.JS_LOCATION_TIME_KEY);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    public void createEventReceiver() {
        mEventReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                LocationCoordinates locationCoordinates = mGson.fromJson(
                        intent.getStringExtra(LocationForegroundService.LOCATION_EVENT_DATA_NAME), LocationCoordinates.class);
                WritableMap eventData = Arguments.createMap();
                eventData.putDouble(
                        LocationForegroundService.JS_LOCATION_LAT_KEY,
                        locationCoordinates.getLatitude());
                eventData.putDouble(
                        LocationForegroundService.JS_LOCATION_LON_KEY,
                        locationCoordinates.getLongitude());
                eventData.putDouble(
                        LocationForegroundService.JS_LOCATION_TIME_KEY,
                        locationCoordinates.getTimestamp());
                // if you actually want to send events to JS side, it needs to be in the "Module"
                sendEventToJS(getReactApplicationContext(),
                        LocationForegroundService.JS_LOCATION_EVENT_NAME, eventData);
            }
        };
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

    @Override
    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction(LocationForegroundService.LOCATION_EVENT_NAME);
        mContext.registerReceiver(mEventReceiver, eventFilter);
    }

    @Override
    public void sendEventToJS(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        Log.i("BGLocation", "" + params.toString());
        if(IS_DEBUG == true) {
            Toast.makeText(getReactApplicationContext(), "" + params.getDouble("latitude"), Toast.LENGTH_LONG).show();
        }
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
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
}
