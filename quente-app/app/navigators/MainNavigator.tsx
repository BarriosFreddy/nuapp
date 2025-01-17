import React, { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useStores } from "../models";
import { StyleSheet } from "react-native";
import { spacing } from "../theme";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { Icon } from "@rneui/themed";
import IconNames from "@/shared/enums/IconNames";
import { BillingsScreen, ItemsScreen } from "@/screens";
/* import SalesSummaryScreen from "@/screens/billing/salesSummary.screen";
import HistoricalBillingsScreen from "@/screens/billing/historicalBillings.screen"; */

const DrawerStack = createDrawerNavigator();

const MainNavigator: FC = observer(function MainNavigator() {
  const {
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen
        options={{}}
        name="BillingScreen"
        component={BillingsScreen}
      />
{/*       <DrawerStack.Screen
        options={{}}
        name="SalesSummaryScreen"
        component={SalesSummaryScreen}
      />
      <DrawerStack.Screen
        options={{}}
        name="HistoricalBillingsScreen"
        component={HistoricalBillingsScreen}
      /> */}
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
