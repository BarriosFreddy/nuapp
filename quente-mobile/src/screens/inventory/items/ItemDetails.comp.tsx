import React from "react";
import { Item } from "../../../models/Item";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { Button } from "../../../components";
import { colors } from "../../../theme";

interface ItemDetailsProps {
  selectedItem: Item | null;
  onEdit: () => void;
  onCancel: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  selectedItem,
  onEdit,
  onCancel,
}) => {
  const handleEditItem = () => {
    onEdit && onEdit();
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  if (!selectedItem)
    return (
      <View>
        <Text>No hay item seleccionado</Text>
      </View>
    );

  return (
    <View>
      <Text h2>{selectedItem.name}</Text>
      <Text h4>Código: {selectedItem.code}</Text>
      <Text h4>Description: {selectedItem.description}</Text>

      <Button
        preset="reversed"
        style={{ marginTop: 20, backgroundColor: colors.palette.primary }}
        textStyle={{ fontWeight: "bold" }}
        text="EDITAR"
        onPress={handleEditItem}
      />
      <Button
        text={"CANCELAR"}
        style={{ marginTop: 20 }}
        textStyle={{ fontWeight: "bold" }}
        preset="filled"
        onPress={handleCancel}
      />
    </View>
  );
};

export default ItemDetails;
