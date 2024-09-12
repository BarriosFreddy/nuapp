import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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
import { useStores } from "../../../models";
import { FAB, Icon, Text } from "@rneui/themed";
import { Button, Screen, TextField } from "../../../components";
import { Row } from "../../../components/Row";
import { colors, spacing } from "../../../theme";
import If from "../../../components/If";
import { Item } from "../../../models/Item";
import { useDidUpdate } from "../../../hooks/useDidUpdate";
import ItemForm from "./ItemForm.comp";
import ItemsList from "./itemsList.comp";
import { ApiResponse } from "apisauce";
import ItemDetails from "./ItemDetails.comp";

const ModuleState = {
  CREATING: "CREATING",
  EDITING: "EDITING",
  LISTING: "LISTING",
  SHOWING: "SHOWING",
};

const ItemsScreen: FC<{ navigation: any; route: any }> = observer(
  function ItemsScreen({ navigation, route }: { navigation: any; route: any }) {
    const insets = useSafeAreaInsets();
    const windowHeight = Dimensions.get("window").height;
    const [isSearching, setIsSearching] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [moduleState, setModuleState] = useState(ModuleState.LISTING);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const {
      itemStore: { items, getItems, fetching, setItems, saveItem, updateItem },
    } = useStores();
    const device = useCameraDevice("back");
    const { hasPermission, requestPermission } = useCameraPermission();
    if (!hasPermission) requestPermission();

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

    useEffect(() => {
      (async () => {
        await getItems("");
      })();
    }, []);

    useDidUpdate(() => {
      if (items.length === 1) {
        handleSelectedItem(items[0]);
      }
    }, [fetching]);

    //////////////////////////////////////////////////

    // INIT

    const handleSearchTermChange = (value: string) => {
      setSearchTerm(value);
      !!value ? getItems(value) : setItems([]);
    };

    const handleSave = async (itemData: Item) => {
      itemData.categoryId = "647feeb93e88cd392af5dc23";
      let response: ApiResponse<any>;
      if (itemData._id) response = await updateItem(itemData);
      else response = await saveItem(itemData);
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Guardado exitosamente!",
        });
        clear();
        await getItems(searchTerm);
      }
    };

    const clear = () => {
      setModuleState(ModuleState.LISTING);
    };

    const handleSelectedItem = (item: Item) => {
      const itemClone = JSON.parse(JSON.stringify(item));
      setSelectedItem(itemClone);
      setModuleState(ModuleState.SHOWING);
    };

    const handleNewItem = () => {
      setModuleState(ModuleState.CREATING);
    };

    const handleCancel = () => {
      setModuleState(ModuleState.LISTING);
      setSelectedItem(null);
    };

    const handleEdit = () => {
      setModuleState(ModuleState.EDITING);
    };

    if (!device)
      return (
        <View>
          <ActivityIndicator size={50} color="black" />;
          <Text>No hay camara disponible</Text>
        </View>
      );

    return (
      <Screen style={styles.screen}>
        <If condition={moduleState === ModuleState.LISTING}>
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
            <View
              style={{
                position: "absolute",
                top: windowHeight - 150,
                width: "100%",
              }}
            >
              <Button
                text="DETENER SCANNER"
                onPress={() => setIsScanning(false)}
              />
            </View>
          </If>
          <If condition={!isScanning}>
            <Text h4 style={{ marginBottom: spacing.sm }}>
              Items
            </Text>
            <Row>
              <TextField
                containerStyle={{ width: "87%" }}
                onFocus={() => setIsSearching(true)}
                onChangeText={handleSearchTermChange}
                value={searchTerm}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Buscar..."
              />

              <Button
                style={{ width: 50, backgroundColor: colors.primary }}
                onPress={() => setIsScanning(true)}
              >
                <Icon
                  iconStyle={{ color: colors.white }}
                  name="barcode-scan"
                  type="material-community"
                ></Icon>
              </Button>
            </Row>
            <ItemsList
              style={{
                marginTop: spacing.sm,
                height: "85%",
              }}
              items={items}
              onSelect={handleSelectedItem}
            />
            <FAB
              placement="right"
              icon={{ name: "add", color: "white" }}
              color={colors.primary}
              onPress={handleNewItem}
            />
          </If>
        </If>
        <If
          condition={[ModuleState.CREATING, ModuleState.EDITING].includes(
            moduleState
          )}
        >
          <ItemForm
            selectedItem={selectedItem}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </If>
        <If condition={moduleState === ModuleState.SHOWING}>
          <ItemDetails selectedItem={selectedItem} onEdit={handleEdit} onCancel={handleCancel} />
        </If>
      </Screen>
    );
  }
);

export default ItemsScreen;

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "stretch",
    padding: spacing.sm,
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
