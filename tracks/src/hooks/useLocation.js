import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";

export default (isFocused, callback) => {
  // isFocused means that screen is in the foreground
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 2000,
            distanceInterval: 10
          },
          callback // here this callback will have location wrapped in it
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (isFocused) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [isFocused, callback]); // this is dependency list // here the variable in the array if ever that variable is going to change its value then this useeffect os going to execute again

  return [err]; // returning in the array is just the convention of the hooks
};
