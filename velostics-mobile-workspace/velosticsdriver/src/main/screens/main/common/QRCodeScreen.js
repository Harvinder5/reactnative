import React from 'react';
import styled from 'styled-components/native';
import { NavBar, Text, Button } from '@velostics/shared';
import { Card } from '@velostics/shared/src/uikit/layouts/layout';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background[0]};
`;
const Image = styled.Image`
  margin-top: 25px;
  width: 100%;
  resize-mode: contain;
`;
const ButtonContainer = styled.View`
  align-self: center;
  margin-top: 25px;
  width: 100%;
`;
const QRCodeScreen = ({ navigation }) => {
  return (
    <Container>
      <NavBar title="qrcode.title" />
      <Card>
        <Text id="qr.message" locale semiBold />
        <Image source={require('../../../../../assets/dummyqr.png')} />
        <ButtonContainer>
          <Button
            title="qr.button"
            lightPrimary
            expand
            onPress={() => navigation.pop()}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};
export default QRCodeScreen;
