import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import axios from "axios";
import Config from "react-native-config";
import { ModalContentContainer, ModalContent } from "./OtpModal.styles";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Formik } from "formik";
import { Text } from "../text/Text";
import { Row } from "../layouts/layout";
import TextInput from "../TextInput/TextInput";
import Button, { TextButton } from "../buttons/Button";
import { otpValidationSchema } from "../../settings/validators";

const initialValues = {
  otp: ""
};
const authHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(
      "5a065ba89ba75d7c2109267369b00fa1:6d5c53332ea6ccc35fbee832e85dddfb642624445c46245ebd383487e7d58ed8"
    )}`
  }
};
const OtpModal = ({
  isVisible,
  phone,
  close,
  onVerified,
  onResend,
  secondaryLoading
}) => {
  const [loading, setLoading] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const [otpError, setOtpError] = useState(false);
  useEffect(() => {
    let interval;
    if (phone) {
      setResendTime(30);
      interval = setInterval(() => {
        setResendTime(resendTime => resendTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [phone]);
  resendOtp = () => {
    setResendTime(30);
    onResend();
  };
  onSubmit = async values => {
    setLoading(true);
    if (otpError) {
      setOtpError(false);
    }
    const formData = new URLSearchParams();
    formData.append("phone", phone);
    formData.append("otp", values.otp.trim());
    console.log(formData);
    try {
      const { data } = await axios.post(
        `${Config.API_HOST}/oauth/login-otp`,
        formData,
        authHeaders
      );
      console.log(data);
      onVerified(data);
      close();
    } catch (e) {
      setOtpError(e);
      console.log(e);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isVisible={isVisible} onBackdropPress={close}>
      {/* <ModalContentContainer> */}
      <ModalContent>
        <Text
          locale
          id="signin.otp.title"
          h3
          lightPrimary
          font="primarySemiBold"
          center
          margin="5px 0px"
        />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={otpValidationSchema}
        >
          {({ handleSubmit, handleChange, errors, dirty, touched }) => {
            return (
              <>
                <TextInput
                  maxLength={6}
                  type="profile"
                  placeholder="signin.otp.placeholder"
                  locale
                  textType="number"
                  onChangeText={text => {
                    if (otpError) {
                      setOtpError(false);
                    }
                    handleChange("otp")(text);
                  }}
                  marginVertical={10}
                />
                {touched.otp && errors.otp && (
                  <Text color="red" id={errors.otp} locale />
                )}
                {otpError ? <Text color="red">{otpError}</Text> : null}
                <Row>
                  <TextButton
                    onPress={resendOtp}
                    disabled
                    title="signin.otp.resend"
                    marginVertical={10}
                  />
                  {resendTime > 0 && (
                    <Text font="primarySemiBold" lightPrimary>
                      {" "}
                      {resendTime}
                    </Text>
                  )}
                </Row>
                <Button
                  disabled={!dirty}
                  title="signin.otp.button"
                  marginVertical={15}
                  loading={loading || secondaryLoading}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </ModalContent>
      {/* </ModalContentContainer> */}
    </Modal>
  );
};
export default OtpModal;
