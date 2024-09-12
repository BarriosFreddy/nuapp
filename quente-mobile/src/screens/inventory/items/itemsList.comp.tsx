import React, { FC } from "react";
import { Item } from "../../../models/Item";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Text } from "@rneui/themed";
import { getMainPrice } from "../../../utils";
import { View, ViewStyle } from "react-native";

interface ItemsListProps {
  items: Item[];
  onSelect: (item: Item) => void;
  style?: ViewStyle;
}

const ItemsList: FC<ItemsListProps> = ({ items, onSelect, style }) => {
  const handleSelectedItem = (item: Item) => {
    onSelect && onSelect(item);
  };

  return (
    <ScrollView style={style && { ...style }}>
      {items?.map((item: Item, index) => (
        <ListItem key={index} onPress={() => handleSelectedItem(item)}>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.code}</ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <Text h4>$ {getMainPrice(item)}</Text>
          </View>
        </ListItem>
      ))}
      {items?.length === 0 && <Text>No se encontraron resultados</Text>}
    </ScrollView>
  );
};

export default ItemsList;
