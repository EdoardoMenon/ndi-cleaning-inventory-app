import Text from "@/components/text/Text";
import { FieldValues, Path, useController, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  label?: string;
}

function Input<T extends FieldValues>({
  name,
  label,
  style,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();
  const { field, fieldState } = useController({ name, control });

  return (
    <View style={styles.container}>
      {label && <Text variant="caption" style={styles.label}>{label}</Text>}
      <TextInput
        value={String(field.value ?? "")}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        style={[styles.input, fieldState.error && styles.inputError, style]}
        placeholderTextColor={styles.placeholder.color}
        {...props}
      />
      {fieldState.error && (
        <Text variant="caption" style={styles.errorText}>
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: 6,
  },
  label: {
    color: theme.colors.text,
  },
  input: {
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    paddingVertical: 8,
    fontSize: 17,
  },
  inputError: {
    borderBottomColor: theme.colors.primary,
  },
  placeholder: {
    color: theme.colors.lightBlue,
  },
  errorText: {
    color: theme.colors.primary,
  },
}));

export default Input;
