import { pickMedia, PickMediaProps } from "@/utility/PickMedia";
import { ImagePickerAsset } from "expo-image-picker";
import { FieldValues, Path, useController, useFormContext } from "react-hook-form";

interface Props<T extends FieldValues> extends Omit<
  PickMediaProps,
  "setMedia" | "setError"
> {
  name: Path<T>;
  single?: boolean;
}

function useFormPickMedia<T extends FieldValues>({
  name,
  single,
  ...props
}: Props<T>) {
  const { control, setError, clearErrors } = useFormContext<T>();
  const { field, fieldState } = useController({ name, control });

  async function pickAndSetMedia() {
    await pickMedia({
      setMedia: (assets: ImagePickerAsset[]) => {
        try {
          const validAssets = assets.filter(
            (asset) =>
              asset &&
              asset.uri &&
              typeof asset.uri === "string" &&
              asset.uri.length > 0,
          );

          if (validAssets.length === 0) {
            setError(name, {
              type: "manual",
              message: "Invalid image selected. Please try another image.",
            });
            return;
          }

          field.onChange(single ? validAssets[0] : validAssets);
        } catch (error) {
          console.error("useFormPickMedia: Error setting media value:", error);
          setError(name, {
            type: "manual",
            message: "Error processing selected image. Please try again.",
          });
        }
      },
      setError: (message) => {
        setError(name, { type: "manual", message });
      },
      ...props,
    });
  }

  function clearMedia() {
    try {
      field.onChange("");
      clearErrors(name);
    } catch (error) {
      console.error("useFormPickMedia: Error clearing media:", error);
    }
  }

  return {
    pickMedia: pickAndSetMedia,
    clearMedia,
    error: fieldState.error?.message,
    value: field.value,
    setError: (message: string) => setError(name, { type: "manual", message }),
  };
}

export default useFormPickMedia;
