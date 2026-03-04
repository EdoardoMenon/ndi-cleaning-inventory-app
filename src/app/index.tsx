import ListMenuItem from "@/components/list-menu/ListMenuItem";
import Text from "@/components/text/Text";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

const FOLDERS = [
  { id: "1", name: "Development Testing" },
  { id: "2", name: "NDI Consumables" },
  { id: "3", name: "Liverpool Civic Tower" },
];

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading">NDI Cleaning Inventory</Text>
      </View>

      <FlashList
        data={FOLDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListMenuItem name={item.name} />}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/AddFolder")}
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
}));
