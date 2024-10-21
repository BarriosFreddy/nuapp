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
import { FAB, Icon, Text } from "@rneui/themed";
import { Button, Screen, TextField } from "../../components";
import { Row } from "../../components/Row";
import { colors, spacing } from "../../theme";
import If from "../../components/If";
import { ApiResponse } from "apisauce";
import ItemFormSection from "../../shared/enums/ItemFormSection";
import IconNames from "../../shared/enums/IconNames";
import SearchBar from "../../components/SearchBar";
import BillingDetails from "./billingDetails.comp";
import BillingsList from "./billingsList.comp";
import { Billing } from "../../models/Billing";

const ModuleState = {
  CREATING: "CREATING",
  EDITING: "EDITING",
  LISTING: "LISTING",
  SHOWING: "SHOWING",
};

const HistoricalBillingsScreen: FC<{ navigation: any; route: any }> = observer(
  function HistoricalBillingsScreen({ navigation, route }: { navigation: any; route: any }) {
    const insets = useSafeAreaInsets();
    const windowHeight = Dimensions.get("window").height;
    const [isSearching, setIsSearching] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [moduleState, setModuleState] = useState(ModuleState.LISTING);
    const [selectedItem, setSelectedItem] = useState<Billing | null>(null);
    const [formSection, setFormSection] = useState(ItemFormSection.MAIN);

    const {
      billingStore: { billings, getBillings },
    } = useStores();

    useEffect(() => {
      (async () => {
        await getBillings();
      })();
    }, []);

    //////////////////////////////////////////////////

    // INIT

    const clear = () => {
      setModuleState(ModuleState.LISTING);
    };

    const handleSelectedItem = (billing: Billing) => {
      const billingClone = JSON.parse(JSON.stringify(billing));
      setSelectedItem(billingClone);
      setModuleState(ModuleState.SHOWING);
    };

    const handleCancel = () => {
      setModuleState(ModuleState.LISTING);
      setSelectedItem(null);
    };

    return (
      <Screen
        contentContainerStyle={{ justifyContent: "flex-start" }}
        style={styles.screen}
      >
        <If condition={moduleState === ModuleState.LISTING}>
          <Text h4 style={{ marginBottom: spacing.sm }}>
            Facturas
          </Text>
          <BillingsList
            style={{
              marginTop: spacing.sm,
              height: "85%",
            }}
            billings={billings}
            onSelect={handleSelectedItem}
          />
        </If>
        <If condition={moduleState === ModuleState.SHOWING}>
          <BillingDetails
            selectedItem={selectedItem}
            onCancel={handleCancel}
          />
        </If>
      </Screen>
    );
  }
);

export default HistoricalBillingsScreen;

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
