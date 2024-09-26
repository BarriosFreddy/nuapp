import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Item } from "../../../models/Item";
import { Button, Text, TextField } from "../../../components";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors, spacing } from "../../../theme";
import { Icon } from "@rneui/themed";
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import If from "../../../components/If";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";
import { Row } from "../../../components/Row";
import ItemFormSection from "../../../shared/enums/ItemFormSection";
import ItemFormPricing from "./ItemFormPricing.comp";
import ItemFormStock from "./ItemFormStock.comp";
import { ScrollView } from "react-native-gesture-handler";
import { InvEnumeration } from "../../../models/inventory/inv-enumeration/InvEnumeration";
import IconNames from "../../../shared/enums/IconNames";

type ItemFormProps = {
  onCancel: () => void;
  onSave: (item: Item) => void;
  selectedItem: Item | null;
  section: ItemFormSection;
  style: ViewStyle;
  measurementUnits?: InvEnumeration;
};

const ItemForm: React.FC<ItemFormProps> = ({
  onCancel,
  onSave,
  selectedItem,
  section,
  style,
  measurementUnits,
}: ItemFormProps) => {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;
  const [isScanning, setIsScanning] = useState(false);
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  if (!hasPermission) requestPermission();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Item>({
    defaultValues: selectedItem || {
      code: "",
      name: "",
      description: "",
      laboratory: "",
    },
  });

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes: Code[]) => {
      if (codes.length > 0 && !!codes[0].value) {
        const { value } = codes[0];
        setValue("code", value);
      }
      setIsScanning(false);
    },
  });

  // INIT ==============================

  const onSubmit = async (data: Item) => {
    onSave && onSave(data);
  };

  const handleCancel = () => {
    reset();
    onCancel && onCancel();
  };

  if (!device)
    return (
      <View>
        <ActivityIndicator size={50} color="black" />;
        <Text>No hay camara disponible</Text>
      </View>
    );

  return (
    <ScrollView style={style && { ...style }}>
      <If condition={isScanning}>
        <Camera
          style={[styles.camera, { height: windowHeight - insets.top - 150 }]}
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
          <Button text="DETENER SCANNER" onPress={() => setIsScanning(false)} />
        </View>
      </If>
      <If condition={!isScanning}>
        <Text preset="heading">{selectedItem ? "Editando" : "Creando"} item</Text>
        <If condition={section === ItemFormSection.MAIN}>
          <View
            style={{
              marginTop: spacing.lg,
              alignSelf: "center",
              backgroundColor: colors.palette.gray400,
              width: "70%",
              height: 170,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                marginTop: spacing.xxxl,
                fontWeight: "bold",
                fontSize: spacing.md,
              }}
            >
              No Image
            </Text>
          </View>
          <Row>
            <Controller
              control={control}
              rules={{
                required: {
                  message: "Campo obligatorio",
                  value: true,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  containerStyle={[styles.textfield, { width: "90%" }]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  labelTx="itemsScreen.codeLabel"
                  status={errors.code ? "error" : undefined}
                  helper={errors.code?.message ? errors.code?.message : ""}
                />
              )}
              name="code"
            />
            <Button
              style={{
                width: 40,
                height: 40,
                marginTop: spacing.lg,
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
          <Controller
            control={control}
            rules={{
              required: {
                message: "Campo obligatorio",
                value: true,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                containerStyle={styles.textfield}
                autoCorrect={false}
                keyboardType="default"
                labelTx="itemsScreen.nameLabel"
                status={errors.name ? "error" : undefined}
                helper={errors.name?.message ? errors.name?.message : ""}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: {
                message: "Campo obligatorio",
                value: true,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                containerStyle={styles.textfield}
                autoCorrect={false}
                keyboardType="default"
                labelTx="itemsScreen.descriptionLabel"
                status={errors.name ? "error" : undefined}
                helper={errors.name?.message ? errors.name?.message : ""}
              />
            )}
            name="description"
          />
        </If>
        <If condition={section === ItemFormSection.PRICING}>
          <ItemFormPricing
            measurementUnits={measurementUnits}
            control={control}
            errors={errors}
          />
        </If>
        <If condition={section === ItemFormSection.STOCK}>
          <ItemFormStock control={control} errors={errors} />
        </If>
        <Button
          text={selectedItem ? "ACTUALIZAR" : "GUARDAR"}
          style={[
            { backgroundColor: colors.primary, marginBottom: spacing.md },
          ]}
          textStyle={{ fontWeight: "bold" }}
          preset="reversed"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          text={"CANCELAR"}
          textStyle={{ fontWeight: "bold" }}
          preset="filled"
          onPress={handleCancel}
        />
      </If>
    </ScrollView>
  );
};

export default ItemForm;

const FIELDS = [
  {
    name: "",
    rules: {
      required: {
        message: "Campo obligatorio",
        value: true,
      },
    },
    keyboardType: "default",
    labelTx: "itemsScreen.descriptionLabel",
  },
];

const styles = StyleSheet.create({
  textfield: { marginBottom: spacing.md },
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
