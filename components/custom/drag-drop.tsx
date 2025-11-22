"use client";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF"];

export default function DragAndDrop({setPreviewUrl}: {setPreviewUrl: (url: string | null) => void}) {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (selectedFile: File) => {
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  // Generate preview URL safely
  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url); 
  }, [file, setPreviewUrl]);

  return (
    <div className="flex flex-col w-full  min-h-52 h-full justify-center items-center gap-4">
      <FileUploader
        handleChange={handleChange}
        name="file"
        classes="w-full h-full bg-transparent "
      />

      
    </div>
  );
}
