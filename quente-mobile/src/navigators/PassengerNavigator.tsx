import React, {FC, useCallback} from 'react';
import BillingScreen from '../screens/billing/billing.screen';
import {observer} from 'mobx-react-lite';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import {useStores} from '../models';
import ViewMode from '../shared/enums/ViewMode';
import {Text} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {spacing} from '../theme';
import {CustomDrawerContent} from '../components/CustomDrawerContent';

const DrawerStack = createDrawerNavigator();

const PassengerNavigator: FC = observer(function PassengerNavigator() {
  const {
    preferencesStore: {mode, setMode},
  } = useStores();


  const getScreenOptions = useCallback(() => {
    const screenOptions: DrawerNavigationOptions = {
      title: 'Quente',
      headerTitleAlign: 'center',
    };
    return screenOptions;
  }, []);

  return (
    <DrawerStack.Navigator
      screenOptions={getScreenOptions()}
      drawerContent={props => (
        <CustomDrawerContent
          mode={mode}
          {...props}
        />
      )}>
      <DrawerStack.Screen
        options={{}}
        name="BillingScreen"
        component={BillingScreen}
      />
    </DrawerStack.Navigator>
  );
});

export default PassengerNavigator;

const styles = StyleSheet.create({
  cancelButton: {
    marginHorizontal: spacing.sm,
    fontSize: spacing.md,
  },
});
