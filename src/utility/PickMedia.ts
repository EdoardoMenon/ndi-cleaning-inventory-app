import {
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  ImagePickerAsset,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaType,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Alert, Linking, Platform } from "react-native";

export interface PickMediaProps {
  setMedia: (mediaAssets: ImagePickerAsset[]) => void;
  setError: (error: string) => void;
  mediaTypes?: MediaType[];
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export type MediaSource = "camera" | "library";

export async function showMediaSourcePicker(
  onSourceSelected: (source: MediaSource) => void,
) {
  Alert.alert(
    "",
    "How would you like to select the media?",
    [
      {
        text: "Camera",
        onPress: () => onSourceSelected("camera"),
      },
      {
        text: "Photo Library",
        onPress: () => onSourceSelected("library"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    { cancelable: true },
  );
}

async function requestCameraPermissions(
  setError: (error: string) => void,
): Promise<boolean> {
  try {
    const { status: currentStatus } = await getCameraPermissionsAsync();
    let finalStatus = currentStatus;

    if (currentStatus !== "granted") {
      const { status: requestedStatus } = await requestCameraPermissionsAsync();
      finalStatus = requestedStatus;
    }

    if (finalStatus !== "granted") {
      if (finalStatus === "denied") {
        Alert.alert(
          "Camera Access Required",
          "This app needs access to your camera to take photos. Please enable camera access in Settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () =>
                setError("Camera access is required to take photos."),
            },
            {
              text: "Go to Settings",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ],
        );
        return false;
      } else {
        setError("Camera access is required to take photos. Please try again.");
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Camera permission error:", error);
    setError("Unable to request camera permissions.");
    return false;
  }
}

async function requestMediaLibraryPermissions(
  setError: (error: string) => void,
): Promise<boolean> {
  try {
    const { status: currentStatus } = await getMediaLibraryPermissionsAsync();
    let finalStatus = currentStatus;

    if (currentStatus !== "granted") {
      const { status: requestedStatus } =
        await requestMediaLibraryPermissionsAsync();
      finalStatus = requestedStatus;
    }

    if (finalStatus !== "granted") {
      if (finalStatus === "denied") {
        Alert.alert(
          "Media Access Required",
          "This app needs access to your photos to upload images. Please enable photo access in Settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () =>
                setError("Media access is required to upload images."),
            },
            {
              text: "Go to Settings",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ],
        );
        return false;
      } else {
        setError(
          "Media access is required to upload images. Please try again.",
        );
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Media library permission error:", error);
    setError("Unable to request media library permissions.");
    return false;
  }
}

export async function pickMediaFromCamera({
  setMedia,
  setError,
  mediaTypes,
  allowsEditing,
  aspect,
  quality,
}: PickMediaProps) {
  try {
    const hasPermission = await requestCameraPermissions(setError);
    if (!hasPermission) return;

    const result = await launchCameraAsync({
      mediaTypes: mediaTypes ?? ["images"],
      allowsEditing: allowsEditing ?? true,
      ...(aspect && { aspect }),
      quality: quality ?? 1,
      base64: false,
    });

    if (result.canceled) {
      return;
    }

    if (!result.assets || result.assets.length === 0) {
      setError("No photo was taken. Please try again.");
      return;
    }

    const validAssets = result.assets.filter(
      (asset) => asset.uri && asset.uri.length > 0,
    );

    if (validAssets.length > 0) {
      setMedia(validAssets);
    } else {
      setError("Photo could not be processed. Please try again.");
    }
  } catch (error) {
    console.error("Camera error:", error);
    setError(
      `Unable to access camera: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

export async function pickMediaFromLibrary({
  setMedia,
  setError,
  mediaTypes,
  allowsEditing,
  aspect,
  quality,
}: PickMediaProps) {
  try {
    const hasPermission = await requestMediaLibraryPermissions(setError);
    if (!hasPermission) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: mediaTypes ?? ["images"],
      allowsEditing: allowsEditing ?? true,
      ...(aspect && { aspect }),
      quality: quality ?? 1,
      allowsMultipleSelection: false,
      base64: false,
    });

    if (result.canceled) {
      return;
    }

    if (!result.assets || result.assets.length === 0) {
      setError("No image was selected. Please try again.");
      return;
    }

    const validAssets = result.assets.filter(
      (asset) => asset.uri && asset.uri.length > 0,
    );

    if (validAssets.length > 0) {
      setMedia(validAssets);
    } else {
      setError(
        "Selected image could not be processed. Please try another image.",
      );
    }
  } catch (error) {
    console.error("Media picker error:", error);
    setError(
      `Unable to access media library: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

export async function pickMedia(props: PickMediaProps) {
  showMediaSourcePicker(async (source: MediaSource) => {
    if (source === "camera") {
      await pickMediaFromCamera(props);
    } else {
      await pickMediaFromLibrary(props);
    }
  });
}
