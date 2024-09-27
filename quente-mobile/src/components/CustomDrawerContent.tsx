import React from "react";
import { useStores } from "../models";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import ViewMode from "../shared/enums/ViewMode";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme";
import { Avatar, Button, Icon, Text } from "@rneui/themed";
import { Row } from "./Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconNames from "../shared/enums/IconNames";

const MENU_ITEMS = [
  {
    label: "Facturación",
    iconName: IconNames.CASH_REGISTER,
    screen: "BillingScreen",
  },
  {
    label: "Items",
    iconName: IconNames.CUBE_OUTLINE,
    screen: "ItemsScreen",
  },
  {
    label: "Ajustes",
    iconName: IconNames.COG_OUTLINE,
    screen: "BillingScreen",
  },
  {
    label: "Ayuda",
    iconName: IconNames.HELP,
    screen: "BillingScreen",
  },
];

export function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const {
    authenticationStore: { userAccount, logout },
  } = useStores();

  const { roles } = userAccount || {};

  const handlePressLogout = () => {
    logout();
  };

  const handleNavigation = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.sm,
          },
        ]}
      >
        <Row>
          <Icon
            size={50}
            name={IconNames.ACCOUNT}
            type={"material-community"}
          />
          <View style={{ marginLeft: spacing.sm, marginTop: spacing.md, }}>
            <Text style={styles.usernameText}>
              {userAccount?.firstName || ""}
            </Text>
          </View>
        </Row>
      </View>
      <DrawerContentScrollView {...props}>
        {MENU_ITEMS.map(({ label, iconName, screen }, i) => (
          <DrawerItem
            key={i}
            icon={() => <Icon name={iconName} type="material-community" />}
            label={label}
            onPress={() => (screen ? handleNavigation(screen) : () => {})}
          />
        ))}
        <DrawerItem
          icon={() => <Icon name="logout" type="material-community" />}
          label="Cerrar sesión"
          onPress={handlePressLogout}
        />
      </DrawerContentScrollView>
      <View
        style={[
          {
            paddingBottom: insets.bottom + spacing.sm,
          },
        ]}
      >
        <Text>Version 0.0.1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    padding: spacing.sm,
    borderColor: colors.secondary,
  },
  footer: {
    width: "100%",
    padding: spacing.sm,
    borderColor: colors.secondary,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  starIcon: {
    fontSize: 12,
    color: colors.gold,
  },
});
