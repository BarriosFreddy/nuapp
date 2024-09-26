import React, { useEffect, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { View, StyleSheet, TextStyle } from "react-native";
import { Text, TextProps } from "./Text";
import { colors, spacing } from "../theme";
import { Icon } from "@rneui/themed";

type DropdownValue = {
  title: string;
  value: string;
};

type DropdownProps = {
  /**
   * item list
   */
  data: DropdownValue[];
  /**
   *
   * @param selectedItem
   * @returns
   */
  onSelect: (selectedItem: string) => void;
  /**
   * selected value
   */
  value: string | number;
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"];
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"];
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"];
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled";
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"];
};

const Dropdown = ({
  data,
  onSelect,
  value,
  label,
  labelTx,
  labelTxOptions,
  LabelTextProps,
}: DropdownProps) => {
  const selectRef = useRef<SelectDropdown>(null);
  const $labelStyles = [$labelStyle, LabelTextProps?.style];

  useEffect(() => {
    if (!value) return;
    const itemIndex = data.findIndex((item) => item.value === value);
    itemIndex > -1 && selectRef.current?.selectIndex(itemIndex);
  }, [value]);

  return (
    <>
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}
      <SelectDropdown
        ref={selectRef}
        data={data}
        onSelect={(selectedItem: any, index: number) => {
          onSelect && onSelect(selectedItem.value);
        }}
        defaultValue={value}
        renderButton={(selectedItem: any, isOpened: boolean) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || "Seleccionar"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                type="material-community"
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item: any, index, isSelected: boolean) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </>
  );
};

export default Dropdown;

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "auto",
    height: 45,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.palette.primary,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
