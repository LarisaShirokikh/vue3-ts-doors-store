import { ref,  } from "vue";

export interface FormStateChapters {
  name: string;
  description: string;
  photoLink: string;
  photo: File | null;
}

export interface FormStateCatalogs {
  name: string;
  price: number;
  description: string;
  photoLink: string;
  selectedChapter: string[];
}

export const useForm = () => {
  const photo = ref<File | null>(null);
  const photoPreview = ref<string | null>(null);

  const handleChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        photo.value = file;
        photoPreview.value = URL.createObjectURL(file);
      }
    }
  };


  const addPhotoLink = (event: InputEvent) => {
    const photoLink = (event.target as HTMLInputElement).value;
    if (photoLink && photoLink.trim() !== "") {
      photoPreview.value = photoLink.trim();
    } else {
      photoPreview.value = null;
    }
  };

  const resetFormChapters = (formState: FormStateChapters) => {
    formState.name = "";
    photo.value = null;
    photoPreview.value = null;
    formState.photoLink = "";
    formState.description = "";
  };

  const resetFormCatalogs = (formState: FormStateCatalogs) => {
    formState.name = "";
    photo.value = null;
    photoPreview.value = null;
    formState.photoLink = "";
    formState.description = "";
  };

  return {
    photo,
    photoPreview,
    handleChange,
    addPhotoLink,
    resetFormChapters,
    resetFormCatalogs,
    //loadPhotoPreviews,
  };
};
