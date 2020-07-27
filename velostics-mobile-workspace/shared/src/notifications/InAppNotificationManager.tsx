import React, {
  ComponentProps,
  FC,
  ReactElement,
  useCallback,
  useReducer,
  useRef
} from "react";

import { Popup } from "./molecules/Popup";
import { PopupGestureHandler } from "./PopupGestureHandler";

type NotificationOptions = Partial<
  Pick<
    ComponentProps<typeof PopupGestureHandler>,
    "onPress" | "duration" | "slideInDuration" | "slideOutDuration"
  >
>;

type State = {
  id: number;
  element: ReactElement;
}[];

const initialState = [];

const notificationReducer = (state: State, { type, payload }: any) => {
  switch (type) {
    case "add": {
      return [...state, payload];
    }
    case "remove": {
      const { id } = payload;
      return state.filter(notification => notification.id !== id);
    }
    case "clearAll": {
      return initialState;
    }
    default:
      return state;
  }
};

// eslint-disable-next-line import/no-mutable-exports
export let inAppCustomNotification: (
  notification: ReactElement,
  options?: NotificationOptions
) => void;

export let inAppNotification: (
  title: string,
  content: string,
  options?: NotificationOptions
) => void;

// eslint-disable-next-line import/no-mutable-exports
export let removeInAppNotification: (id: number) => void;
// eslint-disable-next-line import/no-mutable-exports
export let clearAllInAppNotifications: () => void;

export const InAppNotificationManager: FC = () => {
  // use a ref because we don't need to re-render
  const idCounter = useRef<number>(0);

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  removeInAppNotification = useCallback((id: number) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  inAppCustomNotification = useCallback(
    (notification: ReactElement, options?: NotificationOptions) => {
      const id = ++idCounter.current;

      dispatch({
        type: "add",
        payload: {
          id,
          notification: (
            <PopupGestureHandler
              key={id}
              zIndex={id}
              onDismissal={() => removeInAppNotification(id)}
              {...options}
            >
              {notification}
            </PopupGestureHandler>
          )
        }
      });
    },
    []
  );

  inAppNotification = useCallback(
    (title: string, content: string, options?: NotificationOptions) =>
      inAppCustomNotification(<Popup title={title}>{content}</Popup>, options),
    []
  );

  clearAllInAppNotifications = useCallback(
    () => dispatch({ type: "clearAll" }),
    []
  );

  return <>{state.map(({ notification }) => notification)}</>;
};
