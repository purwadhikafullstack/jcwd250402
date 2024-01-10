import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import logo from "../asset/Logo-Black.svg";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Box } from "@mantine/core";

function VerifyUserPage() {
  // const { token } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleVerification = async () => {
    const token = searchParams.get("token");
    try {
      setIsLoading(true);
      const response = await api.post(`/auth/verify-account/${token}`);
      if (response.status === 200) {
        toast.success("Successfully verified account");
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to resend verification email
  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/resend-verify-account", {
        email: userEmail,
      });

      if (response.status === 200) {
        toast.info("Verification email sent");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-1/2 bg-white border-2 rounded-lg shadow-xl p-14 ">
        <Box pos={"relative"}>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <div className="">
            <img
              src={logo}
              alt="logo"
              className="cursor-pointer h-[70px] w-[160px]"
            />
          </div>
          <form className="space-y-4 md:space-y-6">
            <div className="w-full">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block max-w-full p-2.5"
                placeholder="Enter your email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleVerification}
              className="w-full text-[#FAFAFA] bg-primary hover:bg-primary/70 hover-bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
            >
              Verify Account
            </button>
          </form>
          <div className="flex flex-col items-center justify-center mt-4 gap-y-2">
            Didn't Receive Email?
            <button
              onClick={handleResendVerification}
              className="w-full text-[#FAFAFA] bg-primary hover:bg-primary/70 hover-bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
              type="button"
              aria-label="Resend Verification Email"
              title="Resend Verification Email"
            >
              Resend Confirmation Email
            </button>
          </div>
        </Box>
      </div>
    </section>
  );
}

export default VerifyUserPage;
