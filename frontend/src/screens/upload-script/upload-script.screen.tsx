import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useUploadScriptMutation,
  useSubmitScriptMutation,
} from '@/slices/scriptApiSlice'
import { uploadFile } from '@/utils'
import { Loader2 } from 'lucide-react'
import { title } from 'process'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const UploadScriptScreen = () => {
  // const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')
  //const [title, setTitle] = useState('')
  const [logline, setLogLine] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [personalConnect, setPersonalConnect] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { mongoUserId, uid, displayName, email } = useSelector(
    (state) => state?.auth.userInfo
  )
  const [submitScript] = useSubmitScriptMutation()

  // const handleFileUpload = async () => {
  //   setError(""); // Reset error message

  //   if (!selectedFile) {
  //     setError("No file selected.");
  //     return;
  //   }

  //   // Check if the file type is allowed (PDF or DOCX)
  //   if (
  //     selectedFile.type !== "application/pdf" &&
  //     selectedFile.type !==
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //   ) {
  //     setError("Invalid file type. Please select a PDF or DOCX file.");
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const { downloadURL, uploadStatus } = await uploadFile(selectedFile);
  //     //TODO: remove the mock state.status === "success"
  //     // eslint-disable-next-line no-constant-condition
  //     if (true) {
  //       const res = await uploadScript({
  //         scriptUrl: downloadURL,
  //         title: title,
  //         userId: mongoUserId,
  //         userUid: uid,
  //         userName: displayName,
  //         email: email,
  //         //   status: state?.status,
  //         //   paymentId: state?.paymentId,
  //         //TODO: mock page
  //         status: "success",
  //         paymentId: 123456,
  //       }).unwrap();
  //       console.log("res--------------", res);
  //       setSelectedFile(null);
  //       console.log("File uploaded successfully:", downloadURL, uploadStatus);
  //       toast.success("File uploaded successfully");
  //     } else {
  //       alert("payment failed");
  //     }
  //   } catch (error) {
  //     setError(`Error occurred during file upload. ${error?.message} `);
  //     console.error("Error occurred during file upload:", error);
  //   } finally {
  //     setIsLoading(false);
  //     setSelectedFile(null);
  //   }
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0] // Get the selected file
  //   setSelectedFile(file)
  // }

  const submitScriptHandler = async () => {
    try {
      const res = await submitScript({
        logline,
        synopsis,
        personalConnect,
        userId: mongoUserId,
        userUid: uid,
        userName: displayName,
        email: email,
      }).unwrap()

      console.log("submitted???", res)
    } catch (e) {
      console.log('Something went wrong....', e)
    }
  }

  return (
    <>
      <div className="left mt-6">
        <h1 className="font-semibold leading-none tracking-tight">
          Upload Your Script 🚀
        </h1>
        <div className="mt-6 w-1/2">
          <div>
            <label htmlFor="title"> Log Line</label>
            <Input
              type="text"
              className="mt-2"
              value={logline}
              onChange={(e) => setLogLine(e.target.value)}
            />
            <p className="">one-sentence summary or description of a movie</p>
          </div>
          <div>
            <label htmlFor="title"> Synopsis</label>
            <Input
              type="text"
              className="mt-2"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
            <p className="">
              write-up that describes the plot and world of your story.
            </p>
          </div>

          <div>
            <label htmlFor="title"> Personal Connect</label>
            <Input
              type="text"
              className="mt-2"
              value={personalConnect}
              onChange={(e) => setPersonalConnect(e.target.value)}
            />
            <p className="">
            Tell us why you want to tell this story.
            </p>
          </div>
          {/* <div className="mt-4">
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
          </div> */}
          <Button
            variant="default"
            size="lg"
            className="mt-4"
            onClick={submitScriptHandler}
          >
            {isLoading && (
              <Loader2 className="h-[1.2rem] w-[1.2rem] mr-2 animate-spin" />
            )}
            {isLoading ? 'Sublitting...' : 'Submit'}
          </Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  )
}
