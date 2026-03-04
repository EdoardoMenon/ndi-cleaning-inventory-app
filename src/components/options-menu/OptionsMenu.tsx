import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Pressable, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { StyleSheet } from "react-native-unistyles";
import Text from "../text/Text";

interface Option {
  label: string;
  onClick: () => void;
}

interface Props {
  options: Option[];
}

export interface OptionsMenuHandle {
  open: () => void;
  close: () => void;
}

const OptionsMenu = forwardRef<OptionsMenuHandle, Props>(function OptionsMenu(
  { options },
  ref
) {
  const sheetRef = useRef<{ open: () => void; close: () => void }>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.open(),
    close: () => sheetRef.current?.close(),
  }));

  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Delete: "trash-outline",
  };

  return (
    <RBSheet
      ref={sheetRef}
      draggable
      customStyles={{
        container: styles.sheetContainer,
        draggableIcon: styles.draggableIcon,
      }}
    >
      <View style={styles.container}>
        {options.map((option, index) => {
          const iconName = iconMap[option.label];
          return (
            <Pressable
              key={index}
              onPress={option.onClick}
              style={styles.option}
            >
              {iconName && (
                <Ionicons name={iconName} size={20} style={styles.optionIcon} />
              )}
              <Text variant="subheading">{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create((theme) => ({
  sheetContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  draggableIcon: {
    backgroundColor: "#444",
  },
  container: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  optionIcon: {
    color: theme.colors.text,
  },
}));

export default OptionsMenu;
