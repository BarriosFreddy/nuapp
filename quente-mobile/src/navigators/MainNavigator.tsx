import React, { FC, useCallback } from "react";
import BillingScreen from "../screens/billing/billing.screen";
import { observer } from "mobx-react-lite";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useStores } from "../models";
import { StyleSheet } from "react-native";
import { spacing } from "../theme";
import { CustomDrawerContent } from "../components/CustomDrawerContent";
import ItemsScreen from "../screens/inventory/items/items.screen";
import { Icon } from "@rneui/themed";
import IconNames from "../shared/enums/IconNames";

const DrawerStack = createDrawerNavigator();

const MainNavigator: FC = observer(function MainNavigator() {
  const {
    preferencesStore: { mode },
  } = useStores();

  const getScreenOptions = useCallback(() => {
    const screenOptions: DrawerNavigationOptions = {
      title: "Quente",
      headerTitleAlign: "center",
    };
    return screenOptions;
  }, []);

  return (
    <DrawerStack.Navigator
      screenOptions={getScreenOptions()}
      drawerContent={(props) => <CustomDrawerContent mode={mode} {...props} />}
    >
      <DrawerStack.Screen
        options={{}}
        name="BillingScreen"
        component={BillingScreen}
      />
      <DrawerStack.Screen
        options={{}}
        name="ItemsScreen"
        component={ItemsScreen}
      />
    </DrawerStack.Navigator>
  );
});

export default MainNavigator;

const styles = StyleSheet.create({
  cancelButton: {
    marginHorizontal: spacing.sm,
    fontSize: spacing.md,
  },
});
