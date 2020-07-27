import React from "react";
import { withTheme } from "styled-components";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Text } from "../text/Text";
import Button from "../buttons/Button";
const IMAGE_URL =
  "https://user-images.githubusercontent.com/38377482/64945352-faba1c00-d88d-11e9-87d6-613badf42d85.png";
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Loader = styled.ActivityIndicator``;
const ImageBackground = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const WarningText = styled(Text)`
  align-self: center;
  margin-bottom: 25px;
`;
const BottomContainer = styled.View`
  position: absolute;
  align-self: center;
  bottom: 20px;
`;
const WithLoading = ({ error, loading, children, theme, onRetry }) => {
  if (error) {
    return (
      <Container>
        <ImageBackground source={require("../../../assets/error.png")}>
          <BottomContainer>
            <WarningText h3 color="grey">
              {error}
            </WarningText>
            {onRetry ? (
              <Button title="error.retry" lightPrimary onPress={onRetry} />
            ) : null}
          </BottomContainer>
        </ImageBackground>
      </Container>
    );
  }
  if (loading) {
    return (
      <Container>
        <Loader size="large" color={theme.colors.primary[0]} />
      </Container>
    );
  }
  return children || null;
};
WithLoading.defaultProps = {
  loading: false,
  error: false,
  onRetry: false
};
WithLoading.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  onRetry: PropTypes.any
};
export default withTheme(WithLoading);
