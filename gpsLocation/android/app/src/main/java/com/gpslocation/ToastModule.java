package com.gpslocation;

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

  // doing some task by calling a method
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  // calling a method
  @ReactMethod
  public void logit(String message) {

    Log.d("HH", message);
  }

  // callback method
  @ReactMethod
  public void doCallBackTask(int number, Callback successCallback, Callback failedCallback) {

    try {
      if (number == 100) {
        throw new Exception("input number is 100 not allowed");
      }
      // Success
      String name = "NAME";
      String email = "kdahdsh@kdhs";
      int age = 100;
      successCallback.invoke(name, email, age);

    } catch (Exception e) {
      failedCallback.invoke(e.getMessage());
    }
  }

  // Promise = async and await
  @ReactMethod
  public void doPromiseTask(int number, Promise promise) {
    try {

      WritableMap mapResult = Arguments.createMap();
      mapResult.putString("name", "Davy Jones");
      mapResult.putString("email", "Davy@Jones.com");
      mapResult.putInt("hh", 100);
      promise.resolve(mapResult);

    } catch (Exception e) {
      promise.reject("An error Occured", e);
    }
  }

}

// @ReactMethod
// public void show(Promise promise, String message, int duration) {
// Toast.makeText(getReactApplicationContext(), message, duration).show();
// // promise.resolve('hi');
// // promise.reject('asdf')
// }

// onChange = () => {
// emit.('locaiton', )
// }