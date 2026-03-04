import {
  AddFolderForm,
  AddFolderValidationSchema,
} from "@/common/ValidationSchemas";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import MediaInput from "@/components/media-input/MediaInput";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function AddFolder() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: { name: "", photo: undefined },
    resolver: yupResolver(AddFolderValidationSchema),
  });

  const onSubmit: SubmitHandler<AddFolderForm> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="close" size={30} style={styles.closeIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <MediaInput<AddFolderForm> name="photo" />
          <Input<AddFolderForm> name="name" placeholder="Enter Folder Name" />
          <Button
            label="Create Folder"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeIcon: {
    color: theme.colors.text,
  },
  content: {
    paddingHorizontal: 16,
    gap: 24,
  },
}));
