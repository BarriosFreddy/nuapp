import React, { FC, useEffect, useRef, useState } from "react"
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native"
import Toast from "react-native-toast-message"
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Row } from "@/components/Row"
import If from "@/components/If"
import ItemForm from "./ItemForm.comp"
import ItemsList from "./itemsList.comp"
import ItemDetails from "./ItemDetails.comp"
import ItemFormSection from "@/shared/enums/ItemFormSection"
import IconNames from "@/shared/enums/IconNames"
import SearchBar from "@/components/SearchBar"
import ApiFeedbackResponse from "@/services/apiFeedbackResponse"
import { Item, useStores } from "@/models"
import { Button, Screen } from "@/components"
import { FAB, Icon, Text } from "@rneui/themed"
import { $styles, colors, spacing } from "@/theme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useDidUpdate } from "@/hooks/useDidUpdate"

const ModuleState = {
  CREATING: "CREATING",
  EDITING: "EDITING",
  LISTING: "LISTING",
  SHOWING: "SHOWING",
}

const BOTTOM_HEIGHT = 200

export const ItemsScreen: FC<{ navigation: any; route: any }> = observer(function ItemsScreen({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) {
  const insets = useSafeAreaInsets()
  const windowHeight = Dimensions.get("window").height
  const [isSearching, setIsSearching] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleState, setModuleState] = useState(ModuleState.LISTING)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [formSection, setFormSection] = useState(ItemFormSection.MAIN)

  const {
    itemStore: { items, getItems, fetching, setItems, saveItem, updateItem, getAllItems },
    measurementUnitStore: { measurementUnits, findAll },
  } = useStores()
  const device = useCameraDevice("back")
  const { hasPermission, requestPermission } = useCameraPermission()
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      /* headerRight: () =>
          moduleState === ModuleState.EDITING ? (
            <Icon
              style={{ marginHorizontal: spacing.md }}
              name={IconNames.CHECK}
              type="material-community"
            />
          ) : null, */
    })
  }, [navigation, moduleState])

  if (!hasPermission) requestPermission()

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes: Code[]) => {
      if (codes.length > 0 && !!codes[0].value) {
        const { value } = codes[0]
        getItems(value)
        setSearchTerm(value)
      }
    },
  })

  useEffect(() => {
    ;(async () => {
      await getAllItems("")
    })()
  }, [])

  useDidUpdate(() => {
    if (isScanning && items.length === 1) {
      handleSelectedItem(items[0])
    }
    setIsScanning(false)
  }, [fetching])

  useEffect(() => {
    ;(async () => {
      await findAll()
    })()
  }, [])

  //////////////////////////////////////////////////

  // INIT

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value)
    !!value ? getItems(value) : setItems([])
  }

  const handleClearSearch = async () => {
    await getItems("")
  }

  const handleSave = async (itemData: Item) => {
    itemData.categoryId = "647feeb93e88cd392af5dc23"
    let response: ApiFeedbackResponse
    if (itemData._id) response = await updateItem(itemData)
    else response = await saveItem(itemData)
    if (response.ok) {
      Toast.show({
        type: "success",
        text1: "Guardado exitosamente!",
      })
      clear()
      await getItems(searchTerm)
    }
  }

  const clear = () => {
    setModuleState(ModuleState.LISTING)
  }

  const handleSelectedItem = (item: Item) => {
    const itemClone = JSON.parse(JSON.stringify(item))
    setSelectedItem(itemClone)
    setModuleState(ModuleState.SHOWING)
  }

  const handleNewItem = () => {
    setModuleState(ModuleState.CREATING)
    setFormSection(ItemFormSection.MAIN)
    setSelectedItem(null)
  }

  const handleCancel = () => {
    setModuleState(ModuleState.LISTING)
    setSelectedItem(null)
  }

  const handleEdit = (section: ItemFormSection) => {
    setModuleState(ModuleState.EDITING)
    setFormSection(section)
  }

  if (!device)
    return (
      <View>
        <ActivityIndicator size={50} color="black" /><Text>No hay camara disponible</Text>
      </View>
    )

  return (
      <Screen contentContainerStyle={$styles.flex1} style={styles.screen}>
        <If condition={moduleState === ModuleState.LISTING}>
          <If condition={isScanning}>
            <Camera
              style={[styles.camera, { height: windowHeight - insets.top - BOTTOM_HEIGHT }]}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              photoQualityBalance={"speed"}
            />
            <View
              style={{
                position: "absolute",
                top: windowHeight - BOTTOM_HEIGHT,
                width: "100%",
              }}
            >
              <Button text="DETENER SCANNER" onPress={() => setIsScanning(false)} />
            </View>
          </If>
          <If condition={!isScanning}>
            <Text h4 style={{ marginBottom: spacing.sm }}>
              Items
            </Text>
            <Row>
              <SearchBar
                placeholder="Buscar..."
                value={searchTerm}
                onFocus={() => setIsSearching(true)}
                onChangeText={handleSearchTermChange}
                onClear={handleClearSearch}
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
        <If condition={[ModuleState.CREATING, ModuleState.EDITING].includes(moduleState)}>
          <ItemForm
            style={{
              marginTop: spacing.sm,
              height: "95%",
            }}
            measurementUnits={measurementUnits}
            section={formSection}
            selectedItem={selectedItem}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </If>
        <If condition={moduleState === ModuleState.SHOWING}>
          <ItemDetails selectedItem={selectedItem} onEdit={handleEdit} onCancel={handleCancel} />
        </If>
      </Screen>
  )
})

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
})
