import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";

export default (isFocused, callback) => {
  // isFocused means that screen is in the foreground
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 2000
        },
        callback // here this callback will have location wrapped in it
      );
      setSubscriber(sub);
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [isFocused]); // here the variable in the array if ever that variable is going to change its value then this useeffect os going to execute again

  return [err]; // returning in the array is just the convention of the hooks
};
