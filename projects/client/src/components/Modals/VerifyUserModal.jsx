import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useHistory } from "react-router-dom";

function VerifyUserPage() {
  const navigate = useNavigate();
  const { verificationToken } = useParams(); // Get the verification token from the URL params
  const history = useHistory();
  const [verificationStatus, setVerificationStatus] = useState("verifying");

  const handleVerification = async () => {
    try {
      const response = await api.post('/auth/verify-account', { token: verificationToken });

      if (response.status === 200) {
        setVerificationStatus('verified');
        // Optionally, redirect the user to a success page or login page
        // history.push('/login'); // Redirect to login after successful verification
      } else {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      setVerificationStatus('failed');
    }
  };

  useEffect(() => {
    // Automatically verify account on page load (optional)
    handleVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs once

  let message;
  switch (verificationStatus) {
    case "verifying":
      message = "Verifying your account...";
      break;
    case "verified":
      message = "Account verified successfully!";
      break;
    case "failed":
      message =
        "Failed to verify your account. Please try again or contact support.";
      break;
    default:
      message = "verify your account";
  }

  return (
    <div>
      <h2>Account Verification</h2>
      {/* <p>{message}</p> */}
      {verificationStatus !== 'verified' && ( // Display button only if not verified
        <button onClick={handleVerification}>{message}</button>
      )}
    </div>
  );
}

export default VerifyUserPage;
