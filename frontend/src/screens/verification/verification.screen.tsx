import { useGetVerificationStatusQuery } from "@/slices/postApiSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { VerificationContainer } from "./verification.styles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VerificationScreen = () => {
  const [status, setStatus] = useState("");
  const { state } = useLocation();
  const { callbackId, reclaimUrl } = state;
  console.log("location", state, callbackId, reclaimUrl);
  const { toast } = useToast();

  const { data, isLoading, refetch } =
    useGetVerificationStatusQuery(callbackId);
  const navigate = useNavigate();
  const refetchStatus = async () => {
    await refetch();
    setStatus(data?.status);
    console.log(data?.status);
    if (data?.status === "VERIFIED") {
      navigate("/profile");
    }
    if (data?.status === "FAILED") {
      //TODO: handle error

      toast({
        title: "Something went wrong, couldn't verify.",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("effect ran");
    const id = setInterval(() => {
      refetchStatus();
    }, 5000);

    return () => clearInterval(id); // Clear the interval when component unmounts
  }, [data]);
  console.log("statusssss--", status);
  console.log("statusssss--", data);

  return (
    <VerificationContainer className="flex  rounded-lg">
      <div>
        <QRCode appUrl={reclaimUrl} />
      </div>
    </VerificationContainer>
  );
};

export const QRCode = ({ appUrl }: any) => {
  return (
    <div className="border rounded-lg p-10">
      <h1 className="title text-center font-medium leading-3">
        Almost there. verify that you own this Account!!
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a
          className="link text-sm mt-4 text-primary underline"
          target="_blank"
          rel="noreferrer"
          href={appUrl}
        >
          {" "}
          Click here to open in Reclaim Wallet
        </a>
      </div>

      <p className="text-center mt-4 mb-4">OR</p>

      <div className="qr-code">
        <QRCodeSVG value={appUrl} className="react-qr border p-1" />
      </div>

      <p className="scan-helper-text text-center font-medium leading-3 mt-4">
        <span className="text-primary">Scan the QR </span> to submit your claim
        on the Reclaim app
      </p>

      <Alert className="mt-8">
        <Loader className="h-4 w-4 loader" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Waiting to be verified. Please don't close this tab
        </AlertDescription>
      </Alert>
    </div>
  );
};
