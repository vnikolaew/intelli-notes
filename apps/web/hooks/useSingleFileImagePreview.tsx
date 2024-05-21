import { useState } from "react";

export function useSingleFileImagePreview() {
   const [inputFiles, setInputFile] =
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


   return { inputFiles, imagePreview, addImage, removeImage } as const;
}
