import React from "react";
import { View } from "react-native";
import { Chip, Icon, ListItem, Skeleton } from "@rneui/themed";
import { Button, Text } from "../../components";
import { colors, spacing } from "../../theme";
import { Row } from "../../components/Row";
import { formatCurrency, getExpirationDates } from "../../utils";
import ItemFormSection from "../../shared/enums/ItemFormSection";
import { ScrollView } from "react-native-gesture-handler";
import IconNames from "../../shared/enums/IconNames";
import dayjs from "dayjs";
import { Billing } from "../../models/Billing";

interface BillingDetailsProps {
  selectedItem: Billing | null;
  onCancel: () => void;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({
  selectedItem,
  onCancel,
}) => {
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
    <ScrollView>
      <Text size="md">Código: {selectedItem.createdAt?.date}</Text>
      <Text size="md">Total: {selectedItem.billAmount}</Text>
      <Text size="md">Items</Text>
      {selectedItem.items?.map((item, index) => (
        <ListItem key={index}>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.units} {item.measurementUnit}</ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <Text size="lg">{formatCurrency(item.price * item.units)}</Text>
          </View>
        </ListItem>
      ))}
      <Button
        text={"REGRESAR"}
        style={{ marginTop: 20 }}
        textStyle={{ fontWeight: "bold" }}
        preset="filled"
        onPress={handleCancel}
      />
    </ScrollView>
  );
};

export default BillingDetails;
