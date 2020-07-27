import React, { useContext, useEffect, useState, useRef } from "react";
import parse from "parse-otp-message";
import { StyleSheet, ActivityIndicator, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { withTheme } from "styled-components";
import SmsRetriever from "react-native-sms-retriever";

import {
  Container,
  OtpTextInputContainer,
  LoaderContainer
} from "./OtpScreen.styles";
import { NavBar, Text, TextButton } from "@velostics/shared";
import { AuthStoreContext } from "../../../stores/AuthStore";
import CodeInput from "react-native-confirmation-code-field";

const OtpScreen = ({ navigation, theme }) => {
  const phone = navigation.getParam("phone");
  const field = useRef(null);
  const endingWidth = phone.substr(phone.length - 4);
  const authStore = useContext(AuthStoreContext);
  const handleSubmit = code => {
    authStore.confirmOtp({ phone, otp: code });
  };
  const handleResend = () => {
    authStore.sendOtp(phone);
    listenForSms();
  };
  const pasteCode = code => {
    if (field.current) {
      field.current.handlerOnTextChange(code);
    }
  };
  listenForSms = async () => {
    if (Platform.OS === "ios") {
      return;
    }
    try {
      const registered = await SmsRetriever.startSmsRetriever();

      if (registered) {
        SmsRetriever.addSmsListener(event => {
          try {
            const result = parse(event.message);
            pasteCode(result.code);
            SmsRetriever.removeSmsListener();
          } catch (e) {
            console.log(e);
          }
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  useEffect(() => {
    // Get the SMS message (second gif)
    listenForSms();
  }, []);
  const renderLoader = force => {
    if (authStore.confirmOtpLoading || authStore.loginLoading || force) {
      return (
        <LoaderContainer>
          <ActivityIndicator size="large" />
        </LoaderContainer>
      );
    }
    return null;
  };

  return (
    <Container>
      <NavBar noLocale showBackText={false} />
      {renderLoader()}
      <Text
        center
        font="primary"
        h1
        margin="30px 0px 10px 0px"
        id="otpscreen.title"
        locale
        white
      ></Text>
      <Text white center margin="0px 30px 20px 30px" font="primarySemiBold">
        <Text white id="otpscreen.des" locale /> {endingWidth}.
      </Text>

      <TextButton
        color="primary"
        colorIndex="2"
        id={authStore.sendingOtp ? "otpscreen.sending" : "otpscreen.sendotp"}
        center
        disabled={authStore.sendingOtp}
        onPress={handleResend}
        font="primary"
        size="h3"
      />

      <OtpTextInputContainer>
        <CodeInput
          ref={field}
          autoFocus
          codeLength={6}
          cellProps={{
            style: {
              height: 50
            }
          }}
          activeColor={theme.colors.primary[2]}
          variant="border-b"
          inactiveColor={theme.colors.pureGrey[2]}
          onFulfill={handleSubmit}
        />
      </OtpTextInputContainer>
    </Container>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6"
  },

  underlineStyleBase: {
    width: 35,
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6"
  }
});
export default withTheme(observer(OtpScreen));
