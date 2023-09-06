import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeContainer } from "./home.styles";
import { uploadFile } from "@/utils";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useUploadScriptMutation } from "@/slices/scriptApiSlice";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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

      const res = await uploadScript({
        scriptUrl: downloadURL,
        title: title,
        userId: mongoUserId,
        userUid: uid,
        userName: displayName,
        email: email,
      }).unwrap();
      console.log("res--------------", res);
      setSelectedFile(null);
      console.log("File uploaded successfully:", downloadURL, uploadStatus);
      toast.success("File uploaded successfully");
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
      <div className="left mt-6">
        <h1 className="font-semibold leading-none tracking-tight">
          Upload Your Script 🚀
        </h1>
        <div className="mt-6">
          <label htmlFor="title"> Title</label>
          <Input
            type="text"
            className="mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mt-4">
            <div className="flex items-center bg-background justify-center w-full ">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs">PDF or DOCX</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {selectedFile && <p>Selected File: {selectedFile?.name}</p>}
          </div>
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

      <Toaster position="top-right" reverseOrder={false} />
    </HomeContainer>
  );
};
