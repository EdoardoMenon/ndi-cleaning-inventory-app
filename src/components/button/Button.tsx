import Text from "@/components/text/Text";
import { Pressable, PressableProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Variant = "primary";

interface Props extends PressableProps {
  label: string;
  variant?: Variant;
}

function Button({ label, variant = "primary", ...props }: Props) {
  styles.useVariants({ variant });

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      {...props}
    >
      <Text variant="subheading" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
  buttonPressed: {
    variants: {
      variant: {
        primary: {
          backgroundColor: "#b8202f",
        },
      },
    },
  },
  label: {
    color: "#fff",
  },
}));

export default Button;
