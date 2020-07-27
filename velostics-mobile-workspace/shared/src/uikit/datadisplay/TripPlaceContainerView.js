import React from "react";
import { View, StyleSheet, UIManager, Platform, Linking } from "react-native";
import { format } from "date-fns";
import { withTheme } from "styled-components";
import Dash from "react-native-dash";
import { Image } from "react-native";
import { Left, Row, Right, Content } from "./TripPlaceContainerView.styles";
import { NumberText } from "../text/Text";
import { CustomIcon } from "../../utils/Expo/UI";
import TripPlaceView from "./TripPlaceView";
import { STAGE_COMPLETED, stageCodes } from "../../settings/config";
const BASE_DISTANCE = 40;
const DETAILED_DISTANCE = BASE_DISTANCE + 5;
class TripPlaceContainerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: props.detailed ? DETAILED_DISTANCE : BASE_DISTANCE
    };
  }
  getDistance = () => {
    const { detailed } = this.props;
    this.bottom.measure((x, y, width, height) => {
      let _y = y === 0 ? BASE_DISTANCE : y;
      if (detailed && y === 0) {
        _y += 40;
      }
      this.setState({
        distance: _y - 35
      });
    });
  };
  handleDirectionClick = type => () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    if (type === "shipper") {
      const {
        data: { shipper }
      } = this.props;
      const latLng = `${shipper.latitude},${shipper.longitude}`;
      const label = shipper.name;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
    } else {
      const {
        data: { consignee }
      } = this.props;
      const latLng = `${consignee.latitude},${consignee.longitude}`;
      const label = consignee.name;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
    }
  };
  render() {
    const {
      data,
      theme,
      detailed,
      showDirection,
      arrived,
      reached
    } = this.props;
    const canShowDirection =
      stageCodes[data.stage].order >= 4 && stageCodes[data.stage].order <= 7;
    return (
      <View>
        <Dash
          dashLength={3}
          key={this.state.distance}
          style={[
            styles.verticalDash,
            {
              height:
                Platform.OS === "ios" ? this.state.distance : detailed ? 70 : 0
            }
          ]}
          dashThickness={6}
          dashColor={
            data.stage === STAGE_COMPLETED
              ? theme.colors.primary[1]
              : theme.colors.darkText[1]
          }
        />
        <View style={styles.tileContainer}>
          <View
            ref={ref => (this.homeImage = ref)}
            style={styles.iconContainer}
          >
            <NumberText number={1} checked={arrived} />
          </View>

          <TripPlaceView
            arrived={arrived}
            showDirection={canShowDirection && showDirection}
            onDirectionClick={this.handleDirectionClick("shipper")}
            style={{ marginTop: 5 }}
            heading={getValue(["shipper", "name"], data) || "-"}
            date={data.stage === STAGE_COMPLETED && data.actual_pickup_at}
            from={data.etd_from}
            to={data.etd_to}
            type="pickup"
            detail={
              detailed
                ? data.shipper
                  ? `${data.shipper.address1}\n${data.shipper.city}, ${data.shipper.state} ${data.shipper.zip_code}`
                  : "-"
                : ""
            }
          />
        </View>

        <Dash
          style={styles.horizontalDash}
          dashThickness={1}
          dashColor={"#b2b2b2"}
        />
        <View
          removeClippedSubviews={false}
          collapsable={false}
          renderToHardwareTextureAndroid={true}
          onLayout={this.getDistance}
          ref={ref => (this.bottom = ref)}
          style={styles.tileContainer}
        >
          <View style={styles.iconContainer}>
            <NumberText number={2} checked={reached} />
          </View>

          <TripPlaceView
            arrived={reached}
            onDirectionClick={this.handleDirectionClick("consignee")}
            showDirection={canShowDirection && showDirection}
            heading={data.consignee ? data.consignee.name : "-"}
            detail={
              detailed
                ? data.consignee
                  ? `${data.consignee.address1}\n${data.consignee.city}, ${data.consignee.state} ${data.consignee.zip_code} `
                  : "-"
                : ""
            }
            date={data.stage === STAGE_COMPLETED && data.actual_dropoff_at}
            from={data.due_date_from}
            to={data.due_date_to}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  horizontalDash: {
    flex: 1,
    height: 1,
    marginVertical: 15,
    marginRight: 20,
    marginLeft: 40
  },
  tileContainer: {
    flexDirection: "row",
    width: "100%"
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 10
  },
  verticalDash: {
    width: 1,
    marginLeft: 10,
    marginTop: 40,
    flexDirection: "column",
    position: "absolute",
    borderRadius: 100,
    overflow: "hidden"
  }
});
export default withTheme(TripPlaceContainerView);
