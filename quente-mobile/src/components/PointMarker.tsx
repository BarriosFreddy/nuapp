import {Text} from '@rneui/base';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import {colors} from '../theme';

type PointMarkerProps = {
  coordinate: LatLng;
  addresText: string;
  label: string;
  style?: StyleProp<any>;
  color: string;
};

export const PointMarker = (props: PointMarkerProps) => {
  return (
    <Marker tracksViewChanges={false} coordinate={props.coordinate}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text
          style={{
            backgroundColor: props.color,
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.white,
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 15,
          }}>
          {props.addresText && props.addresText}
        </Text>
        <Text
          style={{
            backgroundColor: props.color,
            width: 20,
            height: 25,
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.white,
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 15,
          }}>
          {props.label && props.label}
        </Text>
      </View>
    </Marker>
  );
};
