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
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStores } from "../../models";
import { Icon, ListItem, Text } from "@rneui/themed";
import { Button, Screen, TextField } from "../../components";
import { Row } from "../../components/Row";
import { colors, spacing } from "../../theme";
import If from "../../components/If";
import {
  getMainPrice,
  formatCurrency,
  getMainPriceRatio,
  getDateObject,
  getDateAsString,
} from "../../utils";
import { Item, ItemDTO } from "../../models/Item";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import PaymentComp from "./payment.comp";
import { Billing } from "../../models/Billing";
import SearchBar from "../../components/SearchBar";
import IconNames from "../../shared/enums/IconNames";
import sqliteService from "../../services/sqlite.service";

const BillingScreen: FC<{ navigation: any; route: any }> = observer(
  function BillingScreen({
    navigation,
    route,
  }: {
    navigation: any;
    route: any;
  }) {
    const insets = useSafeAreaInsets();
    const [isSearching, setIsSearching] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [addedItemsList, setAddedItemsList] = useState<Array<Item>>([]);
    const windowHeight = Dimensions.get("window").height;
    let [itemUnits, setItemUnits] = useState({} as { [key: string]: number });
    const [total, setTotal] = useState(0);
    const [isPaying, setIsPaying] = useState(false);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const {
      authenticationStore: { userAccount },
      itemStore: { items, getAllItems, getItems, fetching, setItems },
      billingStore: { saveBilling, saving },
    } = useStores();
    const device = useCameraDevice("back");
    const { hasPermission, requestPermission } = useCameraPermission();
    const isReceivedLTTotal = receivedAmount < total;
    

    const codeScanner = useCodeScanner({
      codeTypes: ["qr", "ean-13"],
      onCodeScanned: (codes: Code[]) => {
        if (codes.length > 0 && !!codes[0].value) {
          const { value } = codes[0];
          getItems(value);
          setSearchTerm(value);
        }
        setIsScanning(false);
      },
    });

    if (!hasPermission) requestPermission();

    useEffect(() => {
      (async () => {
        await getAllItems();
      })();
    }, []);

    useDidUpdate(() => {
      if (items.length === 1) {
        handleSelectedItem(items[0]);
      }
    }, [fetching]);

    //////////////////////////////////////////////////

    // INIT

    if (!device)
      return (
        <View>
          <ActivityIndicator size={50} color="black" />;
          <Text>No hay camara disponible</Text>
        </View>
      );

    const handleSearchTermChange = (value: string) => {
      setSearchTerm(value);
      !!value ? getItems(value) : setItems([]);
    };

    const handleSelectedItem = (item: ItemDTO) => {
      const itemClone: Item = JSON.parse(item.data);
      let addedItemUnits = {} as { [key: string]: number };
      isAdded(item.code)
        ? (addedItemUnits[itemClone.code] = itemUnits[itemClone.code] + 1)
        : (addedItemUnits[itemClone.code] = 1);
      addedItemUnits = { ...itemUnits, ...addedItemUnits };
      setItemUnits(addedItemUnits);
      const addedItems = [...addedItemsList];
      if (!isAdded(item.code)) {
        const mainPriceRatio = getMainPriceRatio(itemClone);
        addedItems.unshift({
          ...itemClone,
          price: getMainPrice(itemClone),
          measurementUnit: mainPriceRatio?.measurementUnit,
          multiplicity: mainPriceRatio?.multiplicity,
        });
      }
      setAddedItemsList(addedItems);
      calculateTotal(addedItems, addedItemUnits);
      setIsSearching(false);
      setItems([]);
      setSearchTerm("");
    };

    const calculateTotal = (addedItems: any[], itemUnitsAdded: any) => {
      const totalAmount = addedItems
        .map(({ price, code }) => price * itemUnitsAdded[code])
        .reduce((acc, value) => +acc + +value, 0);
      setTotal(totalAmount);
    };

    const isAdded = (itemCode: string) =>
      addedItemsList.some(({ code }) => code === itemCode);

    const removeItem = ({ code }: Item) => {
      const itemsArray = Object.assign([], addedItemsList);
      const itemUnitsAddedArray = Object.assign([], itemUnits);
      const itemIndex = itemsArray.findIndex(
        (item: Item) => item.code === code
      );
      delete itemUnitsAddedArray[code];
      if (itemIndex !== -1) itemsArray.splice(itemIndex, 1);
      setAddedItemsList(itemsArray);
      setItemUnits(itemUnitsAddedArray);
      calculateTotal(itemsArray, itemUnitsAddedArray);
    };

    const handleCharge = () => {
      setIsPaying(true);
    };

    const handleSave = async () => {
      if (isReceivedLTTotal) {
        Toast.show({
          type: "error",
          text1: "El dinero recibido no puede ser menor al total de la compra",
        });
        return;
      }

      const billingData: Billing = {
        createdAt: getDateObject(),
        receivedAmount,
        billAmount: total,
        items: getItemsData(),
        creationDate: getDateAsString(),
        clientId: "65ac390a0276b80f5712a96c",
      };
      const response = await saveBilling(billingData);
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Guardado exitosamente!",
        });
        clear();
      }
    };

    const getItemsData = () =>
      addedItemsList.map(
        ({ _id, name, code, price, measurementUnit, multiplicity }) => ({
          _id,
          name,
          code,
          price,
          units: itemUnits[code],
          measurementUnit,
          multiplicity,
        })
      );

    const hanndleReceivedAmount = (receivedAmount: number) =>
      setReceivedAmount(receivedAmount);

    const clear = () => {
      setIsPaying(false);
      setAddedItemsList([]);
      setTotal(0);
    };

    const handleClearSearch = () => {
      // setIsSearching(true);
    };

    return (
      <Screen style={styles.screen}>
        <If condition={!isPaying}>
          <If condition={isScanning}>
            <Camera
              style={[
                styles.camera,
                { height: windowHeight - insets.top - 150 },
              ]}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              photoQualityBalance={"speed"}
            />
          </If>
          <If condition={!isScanning}>
            <Row>
              <SearchBar
                containerStyle={{ width: "80%" }}
                onFocus={() => setIsSearching(true)}
                onChangeText={handleSearchTermChange}
                onClear={handleClearSearch}
                value={searchTerm}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Buscar..."
              />
              <Button
                style={{
                  width: 50,
                  height: 40,
                  backgroundColor: colors.primary,
                }}
                onPress={() => setIsScanning(true)}
              >
                <Icon
                  iconStyle={{ color: colors.white }}
                  name={IconNames.BARCODE_SCAN}
                  type="material-community"
                ></Icon>
              </Button>
            </Row>
            <Text h4 style={{ marginBottom: spacing.sm }}>
              {isSearching
                ? "Resultados de búsqueda"
                : `Productos agregados ${addedItemsList.length}`}
            </Text>
            <ScrollView
              style={{
                marginBottom: 250,
              }}
            >
              <If condition={isSearching}>
                {items?.map((item, index) => (
                  <ListItem
                    key={index}
                    onPress={() => handleSelectedItem(item)}
                  >
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.code}</ListItem.Subtitle>
                    </ListItem.Content>
                    <View>
                      <Text h4>{formatCurrency(item.price)}</Text>
                    </View>
                  </ListItem>
                ))}
                {items?.length === 0 && (
                  <Text>No se encontraron resultados</Text>
                )}
              </If>
              <If condition={!isSearching}>
                {addedItemsList?.map((item: Item, index) => (
                  <ListItem key={index}>
                    <ListItem.Content>
                      <ListItem.Title>
                        {itemUnits[item.code]} x {item.name}
                      </ListItem.Title>
                      <ListItem.Subtitle>{item.code}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Row>
                      <Text h4 style={{ marginRight: spacing.sm }}>
                         {formatCurrency(getMainPrice(item))}
                      </Text>
                      <Icon
                        size={30}
                        name={IconNames.TRASH_CAN_OUTLINE}
                        type="material-community"
                        onPress={() => removeItem(item)}
                      />
                    </Row>
                  </ListItem>
                ))}
              </If>
            </ScrollView>
          </If>
        </If>
        <If condition={!isScanning}>
          <View
            style={{
              position: "absolute",
              top: windowHeight - 200,
              width: "95%",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Row style={{ marginBottom: spacing.sm }}>
              <Text h4>Total </Text>
              <Text h4>{formatCurrency(total)}</Text>
            </Row>
            <Button
              disabled={addedItemsList.length === 0}
              text={isPaying ? "FACTURAR" : "COBRAR"}
              onPress={isPaying ? handleSave : handleCharge}
            ></Button>
          </View>
        </If>
        <If condition={isScanning}>
          <View
            style={{
              position: "absolute",
              top: windowHeight - 150,
              width: "95%",
            }}
          >
            <Button
              text="DETENER SCANNER"
              onPress={() => setIsScanning(false)}
            />
          </View>
        </If>
        <If condition={isPaying}>
          <PaymentComp
            total={total}
            onBack={() => setIsPaying(false)}
            setReceivedAmount={hanndleReceivedAmount}
          />
        </If>
      </Screen>
    );
  }
);

export default BillingScreen;

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "stretch",
    margin: spacing.sm,
    height: "100%",
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
