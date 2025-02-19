import { useEffect, useState } from "react";
import { AppState } from "react-native";

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  useEffect(() => {
    AppState.addEventListener("change", setAppState);

    return () => {
      AppState.removeEventListener("change", setAppState);
    };
  }, []);

  return appState;
}
