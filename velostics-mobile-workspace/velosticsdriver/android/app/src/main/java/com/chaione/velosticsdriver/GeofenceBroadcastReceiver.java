package com.chaione.velosticsdriver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.ReactApplicationContext;


import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingEvent;

import java.util.List;

public class GeofenceBroadcastReceiver extends BroadcastReceiver {
    // ...
    public void onReceive(Context context, Intent intent) {
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
        if (geofencingEvent.hasError()) {
            Log.e("GEO", "ERROR IN ON RECEIVE");
            return;
        }

        int geofenceTransition = geofencingEvent.getGeofenceTransition();
        List<Geofence> triggeringGeofences = geofencingEvent.getTriggeringGeofences();

        // Test that the reported transition was of interest.
        if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
            Log.d("LENGTH of geo", ""+ triggeringGeofences.size());
            Log.i("GEO", "ENTERERED GEO_ID"+ triggeringGeofences.get(0).getRequestId());

            try {
                Intent brintent = new Intent("GeoLocationUpdate");
                brintent.putExtra("geo-fence-enter", triggeringGeofences.get(0).getRequestId());
                LocalBroadcastManager.getInstance(context).sendBroadcast(brintent);

            }catch(Exception e) {
                Log.e("GEO",e.toString());
            }


        } else if  (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {
            Log.i("GEO", "EXITED GEO");
            try {
                Intent brintent = new Intent("GeoLocationUpdate");
                brintent.putExtra("geo-fence-exit", triggeringGeofences.get(0).getRequestId());
                LocalBroadcastManager.getInstance(context).sendBroadcast(brintent);

            }catch(Exception e) {
                Log.e("GEO",e.toString());
            }
        }
        else {
            Log.i("GEO", "inside receiver else");

        }

    }
    private void sendMessage(Location location) {
        try {

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
