/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
import React, {
  useRef,
  useMemo,
  useEffect,
  useContext,
  useState,
  useCallback
} from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import OneSignal from "react-native-onesignal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  HeaderContainer,
  ChatHeadContainer,
  ChatHeadAvatar,
  ChatHeadContentContainer
} from "./ChatScreen.styles";
import { AuthStoreContext } from "../../../../stores/AuthStore";
import { Row, WithLoading } from "@velostics/shared/src/uikit";
import { Text, CustomIcon, NavBar } from "@velostics/shared";
import ChatTile from "@velostics/shared/src/uikit/listtiles/ChatTile";
import ChatTextInput from "@velostics/shared/src/uikit/TextInput/ChatTextInput";
import ShipmentService from "../../../../services/ShipmentService";

const { height } = Dimensions.get("screen");
let CHAT_HEIGHT;
if (height > 740) {
  CHAT_HEIGHT = 58;
} else if (height > 690) {
  CHAT_HEIGHT = 55;
} else if (height > 650) {
  CHAT_HEIGHT = 53;
} else {
  CHAT_HEIGHT = 52;
}

const Contactheads = [
  { source: require("../../../../../assets/contact3.png") },
  { source: require("../../../../../assets/contact2.png") },
  { source: require("../../../../../assets/contact3.png") }
];
const shipmentService = new ShipmentService();

const ChatScreen = ({ navigation }) => {
  const authStore = useContext(AuthStoreContext);
  const showGoto = navigation.getParam("showGoto", true);
  const [message, setMessage] = useState("");
  const id = navigation.getParam("id");
  const [error, setError] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [shipment, setShipment] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const socketInit = useCallback(() => {
    const id = navigation.getParam("id");
    authStore.socket.emit("join-shipment", id);
    authStore.socket.on("shipment-listener", function(val) {
      if (val.object === "group-chat") {
        if (val.user.id !== authStore.userData.id) {
          setData([val, ...data]);
        }
      }
    });

    return () => {
      authStore.socket.emit("leave-shipment", id);
    };
  }, [data]);
  useEffect(() => {
    // socketInit();
  }, [data]);

  const listEl = useRef(null);
  const getData = async () => {
    const id = navigation.getParam("id");
    if (error) {
      setLoading(true);
    }
    setError(false);
    try {
      const shipmentDetail = await shipmentService.getShipmentById(id);
      const data = await shipmentService.getShipmentChat(id);
      console.log(data);
      console.log(shipmentDetail);
      setShipment(shipmentDetail);
      setData(data.results.filter(elm => elm.type === "text"));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  };
  const getChatData = async () => {
    try {
      const data = await shipmentService.getShipmentChat(id);
      setData(data.results.filter(elm => elm.type === "text"));
    } catch (e) {
      console.log(e);
    }
  };
  const onMessageChange = async message => {
    setMessage(message);
  };
  const onMessagePress = async () => {
    const shipmentService = new ShipmentService();
    setMessageLoading(true);
    try {
      const response = await shipmentService.sendShipmentChat(
        navigation.getParam("id"),
        {
          type: "text",
          body: message
        }
      );
      console.log(response);
      setData([response, ...data]);
      setMessage("");
    } catch (e) {
      console.log(e);
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => getChatData(), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const ownername = useMemo(
    () =>
      shipment.collaborators
        ? shipment.collaborators.find(elm => elm.role === "owner")
          ? shipment.collaborators.find(elm => elm.role === "owner").user.name
          : ""
        : "",

    [shipment]
  );
  return (
    <Container>
      <NavBar
        title={loading ? "trip.title.loading" : shipment.shipment_name}
        titleProps={{ capitalize: true }}
        noLocale={!loading}
        rightText={showGoto ? "chat.goto" : false}
        onRightPress={() =>
          navigation.navigate("TripScreen", {
            id: id
          })
        }
      />
      <WithLoading loading={loading} error={error} onRetry={getData}>
        <HeaderContainer>
          <Row>
            <ChatHeadAvatar
              source={require("../../../../../assets/chatheadowner.png")}
              size={35}
            />
            <ChatHeadContentContainer>
              <Text semiBold h4>
                Owner
              </Text>
              <Text>{ownername}</Text>
            </ChatHeadContentContainer>
          </Row>
          <ChatHeadContainer>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChatContacts", {
                  data: shipment
                })
              }
              style={styles.viewContact}
            >
              <CustomIcon name="team" lightPrimary size={15} />
              <Text
                semiBold
                lightPrimary
                locale
                id="chat.viewcontacts"
                margin="0px 0px 0px 5px"
              />
            </TouchableOpacity>
          </ChatHeadContainer>
        </HeaderContainer>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          // style={{ flex: 1 }}
          viewIsInsideTabBar
          extraHeight={100}
          enableAutomaticScroll={true}
          extraScrollHeight={100}
          nestedScrollEnabled
          style={{ flex: 1 }}
          renderToHardwareTextureAndroid
        >
          <FlatList
            ref={listEl}
            onContentSizeChange={() =>
              listEl.current.scrollToOffset({ offset: 0, animated: true })
            }
            onLayout={() =>
              listEl.current.scrollToOffset({ offset: 0, animated: true })
            }
            style={{ height: (CHAT_HEIGHT / 100) * height }}
            keyExtractor={item => item.id}
            data={data}
            inverted
            renderItem={({ item }) => (
              <ChatTile data={item} user={authStore.userData.id} />
            )}
          />
          <View style={{ paddingTop: 20 }}>
            <ChatTextInput
              placeholder="Write a message"
              onChangeText={onMessageChange}
              onPress={onMessagePress}
              value={message}
            />
          </View>
        </KeyboardAwareScrollView>
      </WithLoading>
    </Container>
  );
};
const styles = StyleSheet.create({
  viewContact: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default ChatScreen;
