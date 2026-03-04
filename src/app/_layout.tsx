import "../unistyles";
import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
}
