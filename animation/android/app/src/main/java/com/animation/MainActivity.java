package com.animation;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  private static final String TAG = "MainActivity";

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "animation";
  }

  @Override
  protected void onPause() {
    Log.d(TAG, "onPause: ");
    super.onPause();
  }

  @Override
  protected void onStop() {
    Log.d(TAG, "onStop: ");
    super.onStop();
  }

  @Override
  protected void onRestart() {
    Log.d(TAG, "onRestart: ");
    super.onRestart();
  }

  @Override
  protected void onResume() {
    Log.d(TAG, "onResume: ");
    super.onResume();
  }

  @Override
  protected void onStart() {
    Log.d(TAG, "onStart: ");
    super.onStart();
  }


  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    Log.d(TAG, "onCreate: ");
    super.onCreate(savedInstanceState, persistentState);
  }

  @Override
  protected void onDestroy() {
    Log.d(TAG, "onDestroy: ");
    super.onDestroy();
  }
}
