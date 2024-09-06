import {Avatar, ListItem, Text} from '@rneui/base';
import React from 'react';
import {LayoutChangeEvent, StyleSheet, TextStyle, View} from 'react-native';
import {Ride} from '../models/RideStore';
import {colors} from '../theme';

type PassengerCardProps = {
  onLayout: (event: LayoutChangeEvent) => void;
  ride: Ride;
};

const PassengerCard = ({onLayout, ride}: PassengerCardProps) => {
  return (
    <ListItem
      onLayout={event => {
        onLayout && onLayout(event);
      }}>
      <ListItem.Content>
        <ListItem.Title style={styles.originText}>
          {`${ride.origin?.displayName} (${ride.pickupDistance?.text})`}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.destinationText}>
          {`${ride.destination?.displayName} (${ride.rideDistance?.text})`}
        </ListItem.Subtitle>
        <Text style={styles.fareText}>$ {ride.clientPrice} </Text>
      </ListItem.Content>
      <View>
        <Avatar
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        />
        <Text style={$fs10}>John Doe</Text>
      </View>
    </ListItem>
  );
};

export default PassengerCard;

const $fs10: TextStyle = {
  fontSize: 10,
};

const styles = StyleSheet.create({
  originText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'justify'
  },
  destinationText: {
    fontSize: 18,
    textAlign: 'justify'
  },
  fareText: {
    fontSize: 25,
    color: colors.primary,
  },
});
