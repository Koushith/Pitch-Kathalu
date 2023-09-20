import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeContainer } from "./home.styles";
import { FileImage, UploadIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {
  const [paymentLink, setPaymentLink] = useState("");

  const navigate = useNavigate();

  // Define Callback Handler Functions
  const onOpenHandler = (response) => {
    alert("Payments Modal is Opened");
    alert(JSON.stringify(response));
    console.log("payment model res", response);
  };

  const onCloseHandler = () => {
    alert("Payments Modal is Closed");
  };

  const onPaymentSuccessHandler = (response) => {
    alert("Payment Success");
    console.log("Payment Success Response", response);
    Instamojo.close();
    navigate("/upload-script", {
      state: {
        status: "success",
        paymentId: "MOJO3913E05Q49944019",
      },
    });
  };

  const onPaymentFailureHandler = (response) => {
    alert("Payment Failure");
    console.log("Payment Failure Response", response);
    // TODO: change this later
    Instamojo.close();
    navigate("/upload-script", {
      state: {
        status: "success",
        paymentId: "MOJO3913E05Q49944019",
      },
    });
  };

  useEffect(() => {
    // Configure Handlers

    Instamojo.configure({
      handlers: {
        onOpen: onOpenHandler,
        onClose: onCloseHandler,
        onSuccess: onPaymentSuccessHandler,
        onFailure: onPaymentFailureHandler,
      },
    });
  }, []);

  const onButtonClick = () => {
    console.log("upload cliced");
    Instamojo.open("https://www.instamojo.com/@sampad");
  };

  const navigateToUpload = () => {
    navigate("/upload-script", {
      state: {
        paymentID: 1234,
      },
    });
  };

  return (
    <HomeContainer className="">
      {/* <h1 className="font-semibold leading-none mt-4 tracking-tight">Home</h1> */}
      <div className="flex gap-8 items-start mt-4 justify-start lg:w-1/2">
        <div
          style={{ width: "150px" }}
          className="bg-background"
          onClick={onButtonClick}
        >
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted cursor-pointer bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary"
            htmlFor="card"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <UploadIcon className="mb-6" />
            Upload Script
          </label>
        </div>
        {/* TODO: This is for testing- remove later */}
        <div
          style={{ width: "150px" }}
          className="bg-background"
          onClick={() => navigate("/profile")}
        >
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted cursor-pointer bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary"
            htmlFor="card"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <FileImage className="mb-6" />
            View Uploaded
          </label>
        </div>
      </div>
      {/* <Button onClick={onButtonClick}>Grenerate payment link</Button> */}
      <Toaster position="top-right" reverseOrder={false} />
    </HomeContainer>
  );
};

/**
 * Payment Success Response 
 * {status: 'success', paymentId: 'MOJO3913E05Q49944019'}
paymentId
: 
"MOJO3913E05Q49944019"
status
: 
"success"
 */
