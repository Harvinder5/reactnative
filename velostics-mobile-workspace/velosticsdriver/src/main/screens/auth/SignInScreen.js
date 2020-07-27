import React, { useContext, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Linking,
  Animated,
  Image,
  Keyboard,
  Platform
} from "react-native";
import { Observer, observer } from "mobx-react-lite";

import {
  Container,
  ForgotPasswordButtonContainer,
  LogoContainer
} from "./SignInScreen.styles";
import { Formik } from "formik";
import { NavBar } from "@velostics/shared";
import { AuthStoreContext } from "../../../stores/AuthStore";
import TextInput from "@velostics/shared/src/uikit/TextInput/TextInput";
import Button, { TextButton } from "@velostics/shared/src/uikit/buttons/Button";
import { Row } from "@velostics/shared/src/uikit/layouts/layout";
import { Text } from "@velostics/shared";
import { OtpModal } from "@velostics/shared/src/uikit";
import { loginValidationSchema } from "@velostics/shared/src/settings/validators";
import { handlePrivacyPolicyClick } from "@velostics/shared/src/settings/utilityFunctions";
import { startLocationUpdates } from "../../../helpers/backgroundLocationHelper";

const SignInScreen = ({ navigation }) => {
  const authStore = useContext(AuthStoreContext);
  const [animation] = useState(new Animated.Value(0));
  const [initialValues, setInitialValues] = useState({ phone: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    Animated.timing(animation, {
      toValue: 1,
      duration: 500
    }).start();
    // navigation.navigate('OtpScreen', {
    //   phone: '7006576673'
    // });
  }, []);

  const onSubmit = values => {
    Keyboard.dismiss();
    authStore.sendOtp(values.phone, () => {
      navigation.navigate("OtpScreen", {
        phone: values.phone
      });
    });
    // authStore.login(values, navigation);
  };

  return (
    <Container>
      <LogoContainer style={{ opacity: animation }}>
        <Image
          source={require("../../../../assets/small_logo.png")}
          style={styles.logoStyle}
        />
        <Text
          font="primarySemiBold"
          white
          h1
          center
          id="signin.welcomemessage"
          locale
        ></Text>
        <Text
          white
          h5
          center
          id="signin.enterphone"
          locale
          margin="25px 0px 10px 0px"
        />
        <Text
          white
          h5
          id="signin.verficationmessage"
          center
          locale
          margin="0px 25px 0px 25px"
        />
      </LogoContainer>
      {/* <OtpModal
        isVisible={isModalVisible}
        onResend={() => authStore.sendOtp(phoneNumber)}
        secondaryLoading={authStore.loginLoading}
        phone={phoneNumber}
        close={() => setIsModalVisible(false)}
        onVerified={data => authStore.login(data, navigation)}
      /> */}

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched, dirty }) => {
          return (
            <Observer>
              {() => {
                return (
                  <>
                    <TextInput
                      innerRef={inputRef}
                      maxLength={13}
                      error={touched.phone && errors.phone}
                      placeholder="signin.placeholder.phone"
                      containerStyle={styles.signinInput}
                      returnKeyType="done"
                      keyboardType="numeric"
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                    />

                    <Button
                      loading={authStore.loginLoading}
                      disabled={!dirty}
                      title="signin.buttontext"
                      style={styles.button}
                      lightPrimary
                      onPress={handleSubmit}
                    />
                    <Row aic marginVertical={8} center>
                      <Text h6 white locale id="signin.privacypolicytext" />
                      <TextButton
                        onPres
                        h6
                        title="signin.privacypolicy"
                        onPress={startLocationUpdates}
                      />
                    </Row>
                  </>
                );
              }}
            </Observer>
          );
        }}
      </Formik>
    </Container>
  );
};
const styles = StyleSheet.create({
  signinInput: {
    marginTop: 20
  },
  passwordInput: {
    marginTop: 8
  },
  button: {
    marginTop: 10
  },
  logoStyle: {
    height: 55,
    width: 55,
    resizeMode: "contain",
    marginBottom: 5
  },

  signupMessage: {
    marginTop: 15
  },

  signupmessageText: {
    marginRight: 3
  },
  footerMessage: {
    marginTop: 30
  }
});
export default observer(SignInScreen);
