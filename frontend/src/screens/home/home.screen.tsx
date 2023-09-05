import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeContainer } from "./home.styles";
import { uploadFile } from "@/utils";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useUploadScriptMutation } from "@/slices/scriptApiSlice";
import { useSelector } from "react-redux";

export const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { mongoUserId, uid, displayName, email } = useSelector(
    (state) => state.auth.userInfo
  );
  console.log("user info---", mongoUserId, uid, displayName, email);
  const [uploadScript, { isSuccess }] = useUploadScriptMutation();

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
      setIsLoading(true);
      const { downloadURL, uploadStatus } = await uploadFile(selectedFile);
      setSelectedFile(null);

      const res = await uploadScript({
        scriptUrl: downloadURL,
        title: title,
        userId: mongoUserId,
        userUid: uid,
        userName: displayName,
        email: email,
      }).unwrap();
      console.log("res--------------", res);

      console.log("File uploaded successfully:", downloadURL, uploadStatus);
    } catch (error) {
      setError("Error occurred during file upload.");
      console.error("Error occurred during file upload:", error?.message);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <HomeContainer className="flex gap-20 items-start justify-start lg:w-1/2">
      <div className="left">
        <h1 className="font-semibold leading-none tracking-tight">
          What's Poppin??
        </h1>
        <div className="mt-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
          <Button
            variant="default"
            size="lg"
            className="mt-4"
            onClick={handleFileUpload}
          >
            {isLoading && (
              <Loader2 className="h-[1.2rem] w-[1.2rem] mr-2 animate-spin" />
            )}
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </HomeContainer>
  );
};
