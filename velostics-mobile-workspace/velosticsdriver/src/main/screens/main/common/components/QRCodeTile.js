import React from "react";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import Dash from "react-native-dash";
import hexToRgba from "hex-to-rgba";
import { Row } from "@velostics/shared/src/uikit/layouts/layout";
import { Image } from "react-native";
import { stageCodes } from "@velostics/shared/src/settings";
import { TextButton } from "@velostics/shared/src/uikit/buttons/Button";

const QRCodeTile = ({ navigation, data }) => {
  if (stageCodes[data.stage].order >= 4 || stageCodes[data.stage] <= 7) {
    return (
      <>
        <Dash
          style={styles.dashStyle}
          dashThickness={1}
          dashGap={0}
          dashColor={hexToRgba("#b2b2b2", 0.5)}
        />
        <Row aic marginVertical={7}>
          <Image
            source={require("../../../../../../assets/qrcode.png")}
            style={{
              padding: 2,
              height: 25,
              width: 25,
              marginRight: 7
            }}
          />
          <TextButton
            title="trip.qrcode"
            size="h5"
            font="primaryMedium"
            onPress={() => navigation.navigate("QRCode")}
          />
        </Row>
      </>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  dashStyle: {
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 12
  }
});
export default withNavigation(QRCodeTile);
