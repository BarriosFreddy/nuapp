import React, { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Badge, ListItem } from "@rneui/themed";
import { formatCurrency, getExpirationDates, getMainPrice } from "../../utils";
import { View, ViewStyle } from "react-native";
import dayjs from "dayjs";
import { Billing } from "../../models/Billing";
import { Text } from "../../components";

interface BillingsListProps {
  billings: Billing[];
  onSelect: (billing: Billing) => void;
  style?: ViewStyle;
}

const BillingsList: FC<BillingsListProps> = ({ billings, onSelect, style }) => {
  const handleSelectedItem = (billing: Billing) => {
    onSelect && onSelect(billing);
  };

  return (
    <ScrollView style={style && { ...style }}>
      {billings?.map((billing: Billing, index) => (
        <ListItem key={index} onPress={() => handleSelectedItem(billing)}>
          <ListItem.Content>
            <ListItem.Title>{billing.code}</ListItem.Title>
            <ListItem.Subtitle>{billing.creationDate}</ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <Text size="lg">{formatCurrency(billing.billAmount)}</Text>
          </View>
        </ListItem>
      ))}
      {billings?.length === 0 && <Text>No se encontraron resultados</Text>}
    </ScrollView>
  );
};

export default BillingsList;
