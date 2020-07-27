import React from "react";
import { Text } from "@velostics/shared";
import styled from "styled-components";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.primary[0]};
`;
export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 15px;
  width: 90%;
  align-self: center;
`;
export const ImageContainer = styled.View`
  flex: 4;
  width: 100%;
  /* background-color: orange; */
`;
export const Image = styled.Image`
  /* height: 200px; */
  resize-mode: contain;
  height: 400px;
  align-self: center;
  width: 90%;
`;
export const TopContainer = styled.View`
  flex: 2;
  /* background-color: green; */
`;
export const MessageContainer = styled.View`
  position: absolute;
  padding: 0px 3px;
  align-items: center;
  justify-content: center;
  top: 45%;
  border-radius: 10px;
  height: 45px;
  background-color: ${props => props.theme.colors.grey[2]};
  align-self: center;
  width: 80%;
`;

export const Header = ({ title, description }) => {
  return (
    <TopContainer>
      <Text
        color="white"
        size="h1"
        locale
        id={title}
        center
        font="primarySemiBold"
        margin="25% 0px 10px 0px"
      />
      <Text
        color="white"
        center
        size="h3"
        margin="12px 8% 10px 8%"
        locale
        id={description}
      ></Text>
    </TopContainer>
  );
};
const Message = ({ message }) => {
  return (
    <MessageContainer>
      <Text font="primarySemiBold" center size="h3" id={message} locale />
    </MessageContainer>
  );
};
export const ImageContent = ({ source, message }) => {
  return (
    <ImageContainer>
      <Image source={source} />
      <Message message={message} />
    </ImageContainer>
  );
};
