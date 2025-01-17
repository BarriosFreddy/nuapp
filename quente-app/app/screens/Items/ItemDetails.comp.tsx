import React from "react";
import { Item } from "@/models/Item";
import { View } from "react-native";
import { Chip, Icon, ListItem, Skeleton } from "@rneui/themed";
import { Button, Text } from "@/components";
import { colors, spacing } from "@/theme";
import { Row } from "@/components/Row";
import { getExpirationDates } from "@/utils";
import ItemFormSection from "@/shared/enums/ItemFormSection";
import { ScrollView } from "react-native-gesture-handler";
import IconNames from "@/shared/enums/IconNames";
import dayjs from "dayjs";

interface ItemDetailsProps {
  selectedItem: Item | null;
  onEdit: (section: ItemFormSection) => void;
  onCancel: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  selectedItem,
  onEdit,
  onCancel,
}) => {
  const handleEditItem = (section: ItemFormSection) => {
    onEdit && onEdit(section);
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
    <ScrollView>
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
      <Row style={{ justifyContent: "flex-end" }}>
        <Icon
          size={35}
          name="pencil"
          type="material-community"
          color="grey"
          onPress={() => handleEditItem(ItemFormSection.MAIN)}
        ></Icon>
      </Row>
      <Text size="xl">{selectedItem.name}</Text>
      <Text size="md">Código: {selectedItem.code}</Text>
      <Text size="md">Description: {selectedItem.description}</Text>
      <Row>
        <Text size="md">En stock</Text>
        {getExpirationDates(selectedItem).map(
          ({ expirationDate, lotUnits }, index) => (
            <Chip
              key={index}
              title={lotUnits + ""}
              titleStyle={{ fontWeight: "bold" }}
              buttonStyle={{
                backgroundColor:
                  dayjs(expirationDate).diff(dayjs(), "days") > 90
                    ? dayjs(expirationDate).diff(dayjs(), "days") > 180
                      ? colors.success
                      : colors.warning
                    : colors.error,
              }}
              containerStyle={{ marginHorizontal: spacing.xs }}
            />
          )
        )}
      </Row>
      <Text preset="subheading"></Text>
      <ListItem onPress={() => handleEditItem(ItemFormSection.PRICING)}>
        <Icon name={IconNames.CASH} type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>Precios</ListItem.Title>
          <ListItem.Subtitle>Configuración de precios</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => handleEditItem(ItemFormSection.STOCK)}>
        <Icon
          name={IconNames.CUBE_OUTLINE}
          type="material-community"
          color="grey"
        />
        <ListItem.Content>
          <ListItem.Title>Existencias</ListItem.Title>
          <ListItem.Subtitle>
            Configuración de existencias y control de vencimiento
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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

export default ItemDetails;
