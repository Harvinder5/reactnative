import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import format from 'date-fns/format';
import { NOTIFICATIONS_TYPE, STAGE_COMPLETED } from '../../settings';
import {
  Container,
  NotificationImage,
  RightIcon,
  TimeText,
  DescriptionText,
  ContentContainer,
  ShipmentDetailContainer
} from './NotificationListTile.styles';
import { StatusTile, StageTile } from '../datadisplay';
import { Text } from '../text/Text';
import { Row } from '../layouts/layout';
const NotificationListTile = ({
  data,
  navigation,
  onPress,
  isSameDriver = true
}) => {
  return (
    <Container unread={!data.is_read} activeOpacity={0.7} onPress={onPress}>
      <Row aic jsb marginVertical={5}>
        <Text lightPrimary={!data.unread} semiBold={!data.unread} h4>
          {data.shipment.shipment_name}
        </Text>
        <Row aic>
          <TimeText font={!data.unread ? 'primarySemiBold' : 'primary'}>
            {format(data.created_at, 'hh:mm A')}
          </TimeText>
          <RightIcon name="right-open" />
        </Row>
      </Row>

      {isSameDriver && (
        <StageTile
          status={data.shipment.stage}
          dotStatus={data.shipment.status}
        />
      )}
      <Row ais>
        <NotificationImage>
          <Text white h3 font="primarySemiBold" textTransform="uppercase">
            {data.user.name[0]}
            {data.user.name[1]}
          </Text>
        </NotificationImage>
        <ContentContainer>
          {data.type === NOTIFICATIONS_TYPE.message ||
          data.type === NOTIFICATIONS_TYPE.groupMessage ? (
            <DescriptionText>{data.body}</DescriptionText>
          ) : (
            <>
              <Text>{data.body}</Text>
              {isSameDriver && (
                <ShipmentDetailContainer>
                  <Text>
                    <Text capitalize>
                      {getValue(['shipment', 'shipper', 'name'], data)}
                    </Text>{' '}
                    {getValue(['shipment', 'shipper', 'name'], data) &&
                      getValue(['shipment', 'consignee', 'name'], data) &&
                      '>'}{' '}
                    <Text capitalize>
                      {getValue(['shipment', 'consignee', 'name'], data)}
                    </Text>
                  </Text>
                  <StageTile
                    status={getValue(['shipment', 'stage'], data)}
                    margin="4px 0px"
                    h3
                  />
                  {data.shipment.status &&
                  data.shipment.stage !== STAGE_COMPLETED ? (
                    <StatusTile
                      status={data.shipment.status}
                      style={styles.statusTile}
                    />
                  ) : null}
                  {getValue(
                    ['shipment', 'driver_request', 'driver', 'name'],
                    data
                  ) && (
                    <Text h4 font="primary">
                      <Text font="primary" h4 id="notification.driver" locale />
                      {getValue(
                        ['shipment', 'driver_request', 'driver', 'name'],
                        data
                      )}
                    </Text>
                  )}
                </ShipmentDetailContainer>
              )}
            </>
          )}
        </ContentContainer>
      </Row>
      {/* <StageTile /> */}
      {/* <Row noCenter marginVertical={5}>
        {data.type === NOTIFICATIONS_TYPE.message ||
        data.type === NOTIFICATIONS_TYPE.groupMessage ? (
          <>
            <View>
              <Text
                white
                h3
                semiBold
                style={{
                  position: 'absolute',
                  top: 10,
                  alignSelf: 'center',
                  zIndex: 10
                }}
              >
                {data.user ? data.user.name[0] : ''}
              </Text>
              <NotificationImage
              // source={require("../../../../assets/blankAvatar.png")}
              />
            </View>
            <View style={styles.contentContainer}></View>
          </>
        ) : (
          <>
            <NotificationImage
            // source={require("../../../../assets/velosticsAvatar.png")}
            />
            <View style={styles.contentContainer}>
              <Text>
                <Text capitalize>
                  {getValue(['shipment', 'shipper', 'name'], data)}
                </Text>{' '}
                {getValue(['shipment', 'shipper', 'name'], data) &&
                  getValue(['shipment', 'consignee', 'name'], data) &&
                  '>'}{' '}
                <Text capitalize>
                  {getValue(['shipment', 'consignee', 'name'], data)}
                </Text>
              </Text>

              <StageTile status={data.shipment.stage} />
              {data.shipment.status &&
              data.shipment.stage !== STAGE_COMPLETED ? (
                <StatusTile
                  status={data.shipment.status}
                  style={styles.statusTile}
                />
              ) : null}
              {data.shipment.eta ? (
                <Text h4 semiBold margin="1px 0px">
                  ETA: <Text> {format(data.created_at, 'hh:mm A')}</Text>
                </Text>
              ) : null}
              <DescriptionText>{data.body}</DescriptionText>
            </View>
          </>
        )}
      </Row> */}
    </Container>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 10,
    flex: 1
  },
  statusTile: {
    marginBottom: 2
  }
});
export default withNavigation(NotificationListTile);
