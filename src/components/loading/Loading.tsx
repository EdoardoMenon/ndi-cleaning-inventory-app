import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

interface Props extends ActivityIndicatorProps {
  margin?: number;
}

function Loading({ size = "large", margin, ...props }: Props) {
  const { theme } = useUnistyles();

  if (margin)
    return (
      <View style={{ margin: margin }}>
        <ActivityIndicator color={theme.colors.primary} size={size} {...props} />
      </View>
    );

  return <ActivityIndicator color={theme.colors.primary} size={size} {...props} />;
}

export default Loading;
