import React, { useRef } from "react";
import { SearchBar as SearchBarRNE } from "@rneui/themed";
import { colors, spacing } from "../theme";

type SearchBarProps = {
  [key: string]: any;
};

const SearchBar = ({ ...props }: SearchBarProps) => {

  return (
    <SearchBarRNE
      lightTheme
      containerStyle={{
        width: "87%",
        height: spacing.xxl,
        backgroundColor: colors.white,
      }}
      inputContainerStyle={{
        height: spacing.xl,
        backgroundColor: colors.white,
      }}
      placeholder="Buscar..."
      {...props}
    />
  );
};

export default SearchBar;
