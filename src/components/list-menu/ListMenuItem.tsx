import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import OptionsMenu, { OptionsMenuHandle } from "../options-menu/OptionsMenu";
import Text from "../text/Text";

interface Props {
  name: string;
  image?: string;
}

function ListMenuItem({ name, image }: Props) {
  const optionsRef = useRef<OptionsMenuHandle>(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.thumbnail}>
          <Ionicons name="folder" size={36} style={styles.folderIcon} />
        </View>

        <Text variant="subheading" style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Pressable
          onPress={() => optionsRef.current?.open()}
          style={styles.optionsButton}
          hitSlop={8}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            style={styles.optionsIcon}
          />
        </Pressable>
      </View>

      <OptionsMenu
        ref={optionsRef}
        options={[
          { label: "Delete", onClick: () => console.log("Delete clicked") },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderTopColor: theme.colors.secondary,
    borderTopWidth: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 6,
    backgroundColor: theme.colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  folderIcon: {
    color: "rgba(255,255,255,0.85)",
  },
  name: {
    flex: 1,
  },
  optionsButton: {
    paddingLeft: 8,
  },
  optionsIcon: {
    color: theme.colors.text,
  },
}));

export default ListMenuItem;
