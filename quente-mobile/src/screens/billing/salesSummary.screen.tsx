import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStores } from "../../models";
import { FAB, Icon, ListItem, Text } from "@rneui/themed";
import { Button, Screen, TextField } from "../../components";
import { colors, spacing } from "../../theme";
import IconNames from "../../shared/enums/IconNames";
import { ScrollView } from "react-native-gesture-handler";
import { formatCurrency } from "../../utils";
import dayjs from "dayjs";

const ModuleState = {
  CREATING: "CREATING",
  EDITING: "EDITING",
  LISTING: "LISTING",
  SHOWING: "SHOWING",
};

const SalesSummaryScreen: FC<{ navigation: any; route: any }> = observer(
  function SalesSummaryScreen({
    navigation,
    route,
  }: {
    navigation: any;
    route: any;
  }) {
    const {
      billingStore: { billingsByDate, getBillingsByDate },
    } = useStores();
    const billingsByDateRevd = [...billingsByDate].reverse();
    const tenDaysBefore = dayjs().subtract(10, 'days').format('YYYY-MM-DD')

    useEffect(() => {
      (async () => {
        await getBillingsByDate(tenDaysBefore);
      })();
    }, []);

    //////////////////////////////////////////////////

    // INIT

    return (
      <Screen
        contentContainerStyle={{ justifyContent: "flex-start" }}
        style={styles.screen}
      >
        <Text h4 style={{ marginBottom: spacing.sm }}>
          Venta diaria
        </Text>
        <ScrollView>
          {billingsByDateRevd.map((billingPerDay, index) => (
            <ListItem key={index}>
              <Icon name={IconNames.CALENDAR} type="material-community" />
              <ListItem.Content>
                <ListItem.Title>{dayjs(billingPerDay.createdAt).format('DD-MM-YYYY')}</ListItem.Title>
              </ListItem.Content>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {formatCurrency(billingPerDay.billAmount)}
                </Text>
              </View>
            </ListItem>
          ))}
          {billingsByDateRevd?.length === 0 && (
            <Text>No se encontraron resultados</Text>
          )}
        </ScrollView>
      </Screen>
    );
  }
);

export default SalesSummaryScreen;

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    alignContent: "stretch",
    padding: spacing.sm,
    height: "90%",
  },
  scrollviewContainer: {
    zIndex: 2,
    marginTop: 70,
    height: "85%",
  },
  camera: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
