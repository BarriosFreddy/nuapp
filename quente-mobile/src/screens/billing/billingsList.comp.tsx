import React, { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from "@rneui/themed";
import { formatCurrency } from "../../utils";
import { View, ViewStyle } from "react-native";
import { BillingDTO } from "../../models/Billing";
import { Text } from "../../components";

interface BillingsListProps {
  billings: BillingDTO[];
  onSelect: (billing: BillingDTO) => void;
  style?: ViewStyle;
}

const BillingsList: FC<BillingsListProps> = ({ billings, onSelect, style }) => {
  const handleSelectedItem = (billing: BillingDTO) => {
    onSelect && onSelect(billing);
  };

  return (
    <ScrollView style={style && { ...style }}>
      {billings?.map((billing: BillingDTO, index) => (
        <ListItem key={index} onPress={() => handleSelectedItem(billing)}>
          <ListItem.Content>
            <ListItem.Title>{billing.code || '-'}</ListItem.Title>
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
