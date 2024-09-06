import React, {FC, useState} from 'react';
import {useStores} from '../models';
import PassengerNavigator from './PassengerNavigator';
import ViewMode from '../shared/enums/ViewMode';
import {observer} from 'mobx-react-lite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = observer(function MainNavigator() {
  const {
    preferencesStore: {mode},
  } = useStores();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen
          name="PassengerNavigator"
          component={PassengerNavigator}
        />

    </Stack.Navigator>
  );
});

export default MainNavigator;