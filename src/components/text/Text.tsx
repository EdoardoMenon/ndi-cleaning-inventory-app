import { Text as RNText, TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Variant = "body" | "subheading" | "heading" | "title" | "caption";

interface Props extends TextProps {
  variant?: Variant;
}

function Text({ style, variant = "body", ...props }: Props) {
  styles.useVariants({ variant });

  return <RNText style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text,
    variants: {
      variant: {
        caption: { fontSize: 12 },
        body: { fontSize: 15 },
        subheading: { fontSize: 17 },
        heading: { fontSize: 22 },
        title: { fontSize: 28, fontWeight: "700" },
      },
    },
  },
}));

export default Text;
