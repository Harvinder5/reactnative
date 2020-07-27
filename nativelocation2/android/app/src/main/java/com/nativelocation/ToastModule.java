package com.nativelocation;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";


    ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "ToastExample";
  }

 @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

    @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  @ReactMethod
    public void logit(String message){

      Log.d("HH", message);
  }



    @ReactMethod
    public void measureLayout(
            int tag,
            int ancestorTag,
            Promise promise) {
        try {
//            measureLayout(tag, ancestorTag, mMeasureBuffer);
//
            WritableMap map = Arguments.createMap();
//
//            map.putDouble("relativeX", PixelUtil.toDIPFromPixel(mMeasureBuffer[0]));
//            map.putDouble("relativeY", PixelUtil.toDIPFromPixel(mMeasureBuffer[1]));
//            map.putDouble("width", PixelUtil.toDIPFromPixel(mMeasureBuffer[2]));
//            map.putDouble("height", PixelUtil.toDIPFromPixel(mMeasureBuffer[3]));

//
            map.putString("relativeY","adadsad");
            map.putString("relativeY","sdasdasd");
            map.putString("width", "sdasdas");
            map.putString("height", "adasdsad");

            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }



}


 
//    @ReactMethod
//     public void show(Promise promise, String message, int duration) {
//     Toast.makeText(getReactApplicationContext(), message, duration).show();
//     // promise.resolve('hi');
//     // promise.reject('asdf')
//   }

//   onChange = () => {
//       emit.('locaiton', )
//   }