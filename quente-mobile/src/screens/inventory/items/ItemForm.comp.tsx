import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Item } from "../../../models/Item";
import { Button, TextField } from "../../../components";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { colors, spacing } from "../../../theme";
import { Icon, Text } from "@rneui/themed";
import { TxKeyPath } from "../../../i18n";
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

type ItemFormProps = {
  onCancel: () => void;
  onSave: (item: Item) => void;
  selectedItem: Item | null;
};

const ItemForm: React.FC<ItemFormProps> = ({
  onCancel,
  onSave,
  selectedItem,
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
    <View>
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
        <Row>
          <Text h4>{selectedItem ? "Editando" : "Creando"} item</Text>
          <Button
            style={{ width: 40, marginLeft: spacing.sm, backgroundColor: colors.primary }}
            onPress={() => setIsScanning(true)}
          >
            <Icon
              iconStyle={{ color: colors.white }}
              name="barcode-scan"
              type="material-community"
            ></Icon>
          </Button>
        </Row>
        {FIELDS.map(({ name, rules, keyboardType, labelTx }) => (
          <Controller
            key={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                containerStyle={styles.textfield}
                autoCorrect={false}
                keyboardType={keyboardType as KeyboardTypeOptions}
                labelTx={labelTx as TxKeyPath}
                status={errors[name as keyof Item] ? "error" : undefined}
                helper={
                  errors[name as keyof Item]?.message
                    ? errors[name as keyof Item]?.message
                    : ""
                }
              />
            )}
            name={name as keyof Item}
          />
        ))}
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
    </View>
  );
};

export default ItemForm;

const FIELDS = [
  {
    name: "code",
    rules: {
      required: {
        message: "Campo obligatorio",
        value: true,
      },
    },
    keyboardType: "default",
    labelTx: "itemsScreen.codeLabel",
  },
  {
    name: "name",
    rules: {
      required: {
        message: "Campo obligatorio",
        value: true,
      },
    },
    keyboardType: "default",
    labelTx: "itemsScreen.nameLabel",
  },
  {
    name: "description",
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
