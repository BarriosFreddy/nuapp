import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, useFieldArray } from "react-hook-form";
import { Text, TextField } from "@/components";
import { spacing } from "@/theme";
import { Button, ListItem } from "@rneui/themed";
import { cloneObject, getUUID } from "@/utils";

interface ItemFormStockProps {
  control: any;
  errors: any;
}

const ItemFormStock: React.FC<ItemFormStockProps> = ({
  control,
  errors: { expirationControl },
}) => {
  const [expanded, setExpanded] = useState({} as { [k: string]: boolean });
  const [addedNew, setAddedNew] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm
    name: "expirationControl", // unique name for your Field Array
  });

  useEffect(() => {
    if (addedNew) {
      const { id } = cloneObject(fields).pop();
      if (!id) return;
      const expandedClone = cloneObject(expanded);
      expandedClone[id] = true;
      setExpanded(expandedClone);
      setAddedNew(false);
    }
  }, [fields, expanded, addedNew]);

  const handleAdd = () => {
    append(getNewExpirationControl(), {
      shouldFocus: true,
      focusIndex: fields.length - 1,
    });
    setAddedNew(true);
    /*     

     */
  };

  return (
    <View>
      <Text preset="subheading">
        Existencias
      </Text>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>
                  {field.lotUnits} - {field.lot}
                </ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expanded[field.id]}
            onPress={() => {
              setExpanded({ ...expanded, [field.id]: !expanded[field.id] });
            }}
          >
            <View style={{ backgroundColor: "white", padding: spacing.sm }}>
              <Controller
                control={control}
                rules={{
                  required: {
                    message: "Campo obligatorio",
                    value: true,
                  },
                }}
                name={`expirationControl.${index}.lotUnits`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value + ""}
                    containerStyle={[styles.textfield]}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    labelTx="itemsScreen:stock.lotUnitsLabel"
                    status={
                      expirationControl && expirationControl[index]?.lotUnits
                        ? "error"
                        : undefined
                    }
                    helper={
                      expirationControl &&
                      expirationControl[index]?.lotUnits?.message
                        ? expirationControl[index]?.lotUnits?.message
                        : ""
                    }
                  />
                )}
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
                    value={value + ""}
                    containerStyle={[styles.textfield]}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    labelTx="itemsScreen:stock.lotLabel"
                    status={
                      expirationControl && expirationControl[index]?.lot
                        ? "error"
                        : undefined
                    }
                    helper={
                      expirationControl &&
                      expirationControl[index]?.lot?.message
                        ? expirationControl[index]?.lot?.message
                        : ""
                    }
                  />
                )}
                name={`expirationControl.${index}.lot`}
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
                    value={value + ""}
                    containerStyle={[styles.textfield]}
                    autoCapitalize="none"
                    keyboardType="default"
                    labelTx="itemsScreen:stock.expirationDateLabel"
                    status={
                      expirationControl &&
                      expirationControl[index]?.expirationDate
                        ? "error"
                        : undefined
                    }
                    helper={
                      expirationControl &&
                      expirationControl[index]?.expirationDate?.message
                        ? expirationControl[index]?.expirationDate?.message
                        : ""
                    }
                  />
                )}
                name={`expirationControl.${index}.expirationDate`}
              />
            </View>
          </ListItem.Accordion>
        </Fragment>
      ))}
      <Button
        type="outline"
        buttonStyle={{ marginVertical: spacing.sm }}
        title="AGREGAR EXISTENCIA"
        onPress={handleAdd}
      ></Button>
    </View>
  );
};

function getNewExpirationControl() {
  return {
    lotUnits: "",
    lot: "",
    expirationDate: "",
  };
}

export default ItemFormStock;

const styles = StyleSheet.create({
  textfield: { marginBottom: spacing.sm },
});
