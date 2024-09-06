import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { spacing } from "./spacing";

export const presetStyle =  StyleSheet.create({
  fullButton: {
    marginTop: spacing.md,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: colors.primary,
  },
  fullButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
