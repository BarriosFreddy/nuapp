import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from './Text';
import {colors, spacing} from '../theme';
import RideStatus from '../shared/enums/RideStatus';

const status = {
  [RideStatus.CHECKING]: {
    driver: 'Solicitud de viaje',
    passenger: 'Solicitando viaje',
  },
  [RideStatus.OFFERING]: {
    driver: 'Esperando que acepten tu oferta',
    passenger: '',
  },
  [RideStatus.PASSENGER_ACCEPTED]: {
    driver: 'Oferta aceptada, dirigete al punto de recogida',
    passenger: 'Tu conductor está en camino',
  },
  [RideStatus.PASSENGER_DECLINE]: {
    driver: 'Oferta rechazada',
    passenger: 'Oferta rechazada',
  },
  [RideStatus.RIDE_CANCELED]: {
    driver: 'Solicitud cancelada',
    passenger: 'Solicitud cancelada',
  },
  [RideStatus.DRIVER_ARRIVED]: {
    driver: 'Tu pasajero está en camino',
    passenger: 'Tu conductor ha llegado',
  },
  [RideStatus.PASSENGER_ARRIVED]: {
    driver: 'Tu pasajero ha llegado',
    passenger: 'Hora de iniciar el viaje',
  },
  [RideStatus.RIDE_STARTED]: {
    driver: 'Feliz viaje',
    passenger: 'Abrochate el cinturón, feliz viaje',
  },
  [RideStatus.RIDE_FINISHED]: {
    driver: 'Viaje finalizado',
    passenger: 'Viaje finalizado',
  },
};

const MessageLogComponent = ({
  rideStatus,
  userType,
  style,
}: {
  rideStatus: string;
  userType: 'driver' | 'passenger';
  style?: any;
}) => {
  const text =
    userType === 'driver'
      ? status[rideStatus].driver
      : status[rideStatus].passenger;

  return (
    <>
      <Text style={[styles.containerText, style && {...style}]}>{text}</Text>
    </>
  );
};

export default MessageLogComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    borderBottomWidth: 1,
    borderRadius: spacing.xs,
    borderColor: colors.palette.primary,
    backgroundColor: colors.white,
  },
  containerText: {
    color: colors.black,
    position: 'absolute',
    zIndex: 2,
    top: 20,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
