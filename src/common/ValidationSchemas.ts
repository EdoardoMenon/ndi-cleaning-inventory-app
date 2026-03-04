import * as Yup from "yup";

export const AddFolderValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please enter at least 2 characters")
    .max(100, "Cannot be more than 100 characters")
    .required("Please enter a folder name"),
  photo: Yup.mixed().optional(),
});

export type AddFolderForm = Yup.InferType<typeof AddFolderValidationSchema>;
