import { useState } from "react";

/**
 * A re-usable hook for managing single file uploads.
 */
export function useSingleFileImagePreview() {
   const [inputFile, setInputFile] =
      useState<File>(null!);

   const [imagePreview, setImagePreview] =
      useState<string>(null!);

   const addImage = (imageFile: File) => {
      setInputFile(imageFile);

      const reader = new FileReader();
      reader.onloadend = () => {
         setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
   };

   const removeImage = () => {
      setInputFile(null!);
      setImagePreview(null!);
   };


   return { inputFile, imagePreview, addImage, removeImage } as const;
}
