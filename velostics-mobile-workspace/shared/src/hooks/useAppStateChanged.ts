import { useRef } from "react";

import { AppStateStatus } from "react-native";

import { useAppState } from "./useAppState";

export function useAppStateChanged() {
  const currentAppState = useAppState();
  const previousAppState = useRef<AppStateStatus>();

  if (currentAppState !== previousAppState.current) {
    previousAppState.current = currentAppState;
    return true;
  }

  return false;
}
