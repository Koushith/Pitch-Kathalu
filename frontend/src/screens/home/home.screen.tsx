import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeContainer } from "./home.styles";
import { uploadFile } from "@/utils";
import { Progress } from "@/components/ui/progress";

export const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    setError(""); // Reset error message

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    // Check if the file type is allowed (PDF or DOCX)
    if (
      selectedFile.type !== "application/pdf" &&
      selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Invalid file type. Please select a PDF or DOCX file.");
      return;
    }

    try {
      const { downloadURL, uploadStatus } = await uploadFile(
        selectedFile,
        (newProgress) => {
          setProgress(newProgress);
        }
      );

      console.log("File uploaded successfully:", downloadURL, uploadStatus);
    } catch (error) {
      setError("Error occurred during file upload.");
      console.error("Error occurred during file upload:", error);
    }
  };

  return (
    <HomeContainer className="flex gap-20 items-start justify-start lg:w-1/2">
      <div className="left">
        <h1 className="font-semibold leading-none tracking-tight">
          What's Poppin??
        </h1>
        <div className="mt-4">
          <Input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
          <Button
            variant="default"
            size="lg"
            className="mt-4"
            onClick={handleFileUpload}
          >
            Upload File
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Progress value={12} />
      </div>
    </HomeContainer>
  );
};
