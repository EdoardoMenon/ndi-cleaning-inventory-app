import Text from "@/components/text/Text";
import useFormPickMedia from "@/hooks/useFormPickMedia";
import { PickMediaProps } from "@/utility/PickMedia";
import { Ionicons } from "@expo/vector-icons";
import { ImagePickerAsset } from "expo-image-picker";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Image, Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props<T extends FieldValues> extends Omit<
  PickMediaProps,
  "setMedia" | "setError"
> {
  name: Path<T>;
}

function MediaInput<T extends FieldValues>({ name, ...props }: Props<T>) {
  const { setValue } = useFormContext<T>();
  const { pickMedia, value } = useFormPickMedia<T>({
    name,
    single: true,
    allowsEditing: true,
    ...props,
  });

  function clearMedia() {
    setValue(name, "" as never);
  }

  const imageUri = (value as ImagePickerAsset | null | undefined)?.uri ?? null;

  return (
    <Pressable
      style={[styles.container, imageUri ? styles.containerWithImage : null]}
      onPress={!imageUri ? pickMedia : undefined}
    >
      {imageUri ? (
        <>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={styles.removeButton}
            onPress={clearMedia}
            hitSlop={8}
          >
            <Ionicons name="close-circle" size={36} style={styles.removeIcon} />
          </Pressable>
        </>
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="camera-outline" size={32} style={styles.cameraIcon} />
          <Text variant="body" style={styles.label}>
            Add Photo
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: theme.colors.text,
    overflow: "hidden",
  },
  containerWithImage: {
    borderWidth: 0,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cameraIcon: {
    color: theme.colors.text,
  },
  label: {
    color: theme.colors.text,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  removeIcon: {
    color: "#fff",
  },
}));

export default MediaInput;
