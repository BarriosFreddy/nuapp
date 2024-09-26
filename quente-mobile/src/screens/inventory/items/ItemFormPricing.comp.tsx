import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, useFieldArray } from "react-hook-form";
import { Text, TextField } from "../../../components";
import { spacing } from "../../../theme";
import { Button, ListItem } from "@rneui/themed";
import { getUUID } from "../../../utils";
import Dropdown from "../../../components/Dropdown";
import { InvEnumeration } from "../../../models/inventory/inv-enumeration/InvEnumeration";

interface ItemFormPricingProps {
  control: any;
  errors: any;
  measurementUnits?: InvEnumeration;
}

const ItemFormPricing: React.FC<ItemFormPricingProps> = ({
  control,
  errors: { pricesRatio },
  measurementUnits
}) => {
  const [expanded, setExpanded] = React.useState(
    {} as { [k: string]: boolean }
  );
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "pricesRatio", // unique name for your Field Array
    }
  );

  const measurementUnitsFormatted =  measurementUnits ? measurementUnits.values?.map(({ label, code }) => ({ title: label, value: code})) : []  

  // INIT

  const handleAdd = () => {
    append(getPriceRatio());
  };

  return (
    <View>
      <Text preset="subheading">
        Relación de precios
      </Text>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>
                  {field.measurementUnit} {field.price}
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
                name={`pricesRatio.${index}.measurementUnit`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    data={measurementUnitsFormatted}
                    onSelect={onChange}
                    value={value}
                    labelTx="itemsScreen.pricing.measurementUnitLabel"
                    status={
                      pricesRatio && pricesRatio[index]?.measurementUnit
                        ? "error"
                        : undefined
                    }
                    helper={
                      pricesRatio && pricesRatio[index]?.measurementUnit
                        ? pricesRatio[index]?.measurementUnit?.message
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
                    labelTx="itemsScreen.pricing.costLabel"
                    status={pricesRatio && pricesRatio[index]?.cost ? "error" : undefined}
                    helper={
                      pricesRatio && pricesRatio[index]?.cost?.message
                        ? pricesRatio[index]?.cost?.message
                        : ""
                    }
                  />
                )}
                name={`pricesRatio.${index}.cost`}
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
                    labelTx="itemsScreen.pricing.priceLabel"
                    status={pricesRatio && pricesRatio[index]?.price ? "error" : undefined}
                    helper={
                      pricesRatio && pricesRatio[index]?.price?.message
                        ? pricesRatio[index]?.price?.message
                        : ""
                    }
                  />
                )}
                name={`pricesRatio.${index}.price`}
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
                    labelTx="itemsScreen.pricing.multipleLabel"
                    status={
                      pricesRatio && pricesRatio[index]?.multiplicity ? "error" : undefined
                    }
                    helper={
                      pricesRatio && pricesRatio[index]?.multiplicity?.message
                        ? pricesRatio[index]?.multiplicity?.message
                        : ""
                    }
                  />
                )}
                name={`pricesRatio.${index}.multiplicity`}
              />
            </View>
          </ListItem.Accordion>
        </Fragment>
      ))}
      <Button
        type="outline"
        buttonStyle={{ marginVertical: spacing.sm }}
        title="AGREGAR RELACIÓN"
        onPress={handleAdd}
      ></Button>
    </View>
  );
};

function getPriceRatio() {
  return {
    measurementUnit: "",
    price: "",
    cost: "",
    hash: getUUID(),
    main: "",
    multiplicity: 1,
  };
}

export default ItemFormPricing;

const styles = StyleSheet.create({
  textfield: { marginBottom: spacing.sm },
});
