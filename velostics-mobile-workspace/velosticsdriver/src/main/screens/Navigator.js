import React, { useContext } from "react";
import { View } from "react-native";
import hexToRgba from "hex-to-rgba";
import { observer } from "mobx-react-lite";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import { Text } from "@velostics/shared";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Profile from "./main/Profile/ProfileScreen";
import ProfilePhotoScreen from "./main/Profile/ProfilePhotoScreen";
import Shipments from "./main/shipments/Shipments";
import AppLoading from "./auth/AppLoading";
import SignInScreen from "./auth/SignInScreen";
import TripScreen from "./main/common/TripScreen";
import { Label, TabBarIcon } from "./Navigator.styles";
import ProcessShipment from "./main/common/ProcessShipmentScreen";
import QRCode from "./main/common/QRCodeScreen";
import Rejection from "./main/common/RejectionScreen";
import MessagesScreen from "./main/messages/Messages";
import Chat from "./main/common/ChatScreen";
import ChatContacts from "./main/common/ChatContactsScreen";
import { AuthStoreContext } from "../../stores/AuthStore";
import { ShipmentTabNumber } from "./main/shipments/Shipments.styles";
import OtpScreen from "./auth/OtpScreen";
import NotificationPermission from "./main/common/NotificationPermission";
import LocationPermission from "./main/common/LocationPermission";

const common = {
  TripScreen,
  ProcessShipment,
  QRCode,
  Rejection,
  NotificationPermission,
  LocationPermission,
  Chat,
  ChatContacts
};
const tabProps = screenProps => ({
  backgroundColor: `${screenProps.colors.white[0]}`,
  borderWidth: 0.5,
  borderColor: `${screenProps.colors.white[0]}`,
  borderTopColor: hexToRgba(screenProps.colors.grey[0], 0.5)
});
const NotificationTabBarIcon = observer(props => {
  const authStore = useContext(AuthStoreContext);
  const number = authStore.dashboardData.unread_notifications;
  const renderNumber = () => {
    if (number && Number(number) > 0) {
      return (
        <ShipmentTabNumber top={-5} number={number}>
          <Text h7 white>
            {Number(number) > 9 ? "9+" : number}
          </Text>
        </ShipmentTabNumber>
      );
    }
    return null;
  };

  return (
    <View style={{ width: 60, alignItems: "center" }}>
      <TabBarIcon {...props} />
      {renderNumber()}
    </View>
  );
});

const ShipmentTabBarIcon = observer(props => {
  const authStore = useContext(AuthStoreContext);
  const number = authStore.dashboardData.unviewed_shipments;
  const renderNumber = () => {
    if (number && Number(number) > 0) {
      return (
        <ShipmentTabNumber top={-5} number={number}>
          <Text h7 white>
            {Number(number) > 9 ? "9+" : number}
          </Text>
        </ShipmentTabNumber>
      );
    }
    return null;
  };

  return (
    <View style={{ width: 60, alignItems: "center" }}>
      <TabBarIcon {...props} />
      {renderNumber()}
    </View>
  );
});
const ShipmentsStack = createStackNavigator(
  {
    Shipments,
    ...common
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const ProfileStack = FluidNavigator(
  {
    Profile,
    ProfilePhotoScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: true
    },
    headerMode: "none",
    navigationOptions: {
      header: null,
      gesturesEnabled: true
    }
  }
);
const MessagesStack = createStackNavigator(
  {
    MessagesScreen,
    ...common
  },
  {
    // initialRouteName: 'Chat',
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);
const AppStack = createMaterialTopTabNavigator(
  {
    Shipments: {
      screen: ShipmentsStack,
      navigationOptions: ({ screenProps }) => {
        return {
          tabBarOptions: {
            style: {
              ...tabProps(screenProps)
              // borderTopWidth: 1
            },
            indicatorStyle: {
              height: 0
            },
            showIcon: true
          },
          tabBarLabel: ({ focused }) => (
            <Label id="navigation.shipments" locale focused={focused} />
          ),
          tabBarIcon: ({ tintColor, focused }) => (
            <ShipmentTabBarIcon
              name="truck"
              size={focused ? 22 : 20}
              focused={focused}
            ></ShipmentTabBarIcon>
          )
        };
      }
    },

    Messages: {
      screen: MessagesStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarOptions: {
          style: {
            ...tabProps(screenProps)
          },
          indicatorStyle: {
            height: 0
          },

          showIcon: true
        },
        tabBarLabel: ({ focused }) => (
          <Label id="navigation.notifications" locale focused={focused} />
        ),
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <NotificationTabBarIcon
              name="bell-alt"
              size={focused ? 22 : 20}
              focused={focused}
            ></NotificationTabBarIcon>
          );
        }
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarOptions: {
          style: {
            ...tabProps(screenProps)
          },
          indicatorStyle: {
            height: 0
          },
          showIcon: true
        },
        tabBarLabel: ({ focused }) => (
          <Label id="navigation.profile" locale focused={focused} />
        ),
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarIcon
            name="profile"
            size={focused ? 22 : 20}
            focused={focused}
          />
        )
      })
    }
  },
  {
    // initialRouteName: 'Messages',
    lazy: "true",
    swipeEnabled: true,
    tabBarPosition: "bottom"
  }
);
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    OtpScreen: OtpScreen,
    NotificationPermission,
    LocationPermission
  },
  {
    headerMode: "none",
    initialRouteName: "SignIn",
    navigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AppLoading,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
