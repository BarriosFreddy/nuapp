import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native';

type RowProps = {
  style?: ViewStyle;
  children: ReactNode;
};

export const Row = (props: RowProps) => {
  return <View style={[styles.container, props.style && {...props.style}]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
});
