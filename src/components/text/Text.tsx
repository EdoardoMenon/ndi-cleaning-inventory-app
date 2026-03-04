import { Text as RNText, TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

function Text({ style, ...props }: TextProps) {
  return <RNText style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text,
  },
}));

export default Text;
