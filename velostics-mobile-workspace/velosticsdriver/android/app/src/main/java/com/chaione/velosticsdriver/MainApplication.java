package com.chaione.velosticsdriver;

import android.app.Application;

import com.chaione.velosticsdriver.location.LocationModule;
import com.chaione.velosticsdriver.location.LocationPackage;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import me.furtado.smsretriever.RNSmsRetrieverPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.chaione.velosticsdriver.generated.BasePackageList;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.rnscreens.RNScreensPackage;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;

import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.chaione.velosticsdriver.LocationManagerPackage;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsPackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList(),
    Arrays.<SingletonModule>asList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new AndroidOpenSettingsPackage(),
            new RNDeviceInfo(),
            new RNSmsRetrieverPackage(),
            new AsyncStoragePackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeOneSignalPackage(),
            new VectorIconsPackage(),
          new ReactNativeFirebaseAppPackage(),
          new ReanimatedPackage(),
          new ReactNativeFirebaseAnalyticsPackage(),
          new ReactNativeFirebaseCrashlyticsPackage(),
          new RNGestureHandlerPackage(),
          new RNScreensPackage(),
          new LocationManagerPackage(),
          new LocationPackage(),
          new CodePush(BuildConfig.CODE_PUSH_ANDROID, MainApplication.this, BuildConfig.DEBUG),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
