import {Button, Card, CheckBox, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, spacing} from '../theme';
import {Row} from './Row';
import {Icon} from './Icon';
import {UserType} from '../shared/enums/UserType';
import {
  CancelOptionsDriver,
  CancelOptionsPassenger,
} from '../shared/enums/CancelOptions';

type CancelModalProps = {
  userType: UserType;
  onClose: () => void;
  onConfirm: () => void;
};

export const CancelModal = (props: CancelModalProps) => {
  const [selectedOption, setSelectedOption] = useState<String | null>(null);

  const cancelOptions =
    props.userType === UserType.DRIVER
      ? CancelOptionsDriver
      : CancelOptionsPassenger;

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <Row style={{justifyContent: 'flex-end'}}>
          <Icon icon="x" onPress={handleClose} />
        </Row>
        <Text style={styles.title}>¿Por qué quieres cancelar?</Text>
        {Object.entries(cancelOptions).map(([key, value]) => (
          <CheckBox
            key={key}
            titleProps={{
              style: {
                fontSize: 18,
                marginLeft: spacing.xxs,
              },
            }}
            checked={selectedOption === key}
            onPress={() => setSelectedOption(key)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={value}
          />
        ))}
        <Button
          disabled={!selectedOption}
          color="error"
          title="CONFIRMAR"
          buttonStyle={{
            height: 50,
            borderRadius: 3,
          }}
          containerStyle={{
            marginVertical: spacing.md,
          }}
          titleStyle={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.palette.transparentBlack700,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    padding: spacing.sm,
    backgroundColor: colors.white,
  },
  title: {
    textAlign: 'center',
    fontSize: spacing.lg,
    fontWeight: '700',
  },
});
