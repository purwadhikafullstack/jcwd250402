import { useState } from "react";
import Button from "../Button";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useUserRegister from "../hooks/useUserRegister";

function VerifyUserModal(props) {
  // const { open, onClose, onVerify } = props;
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleVerify = () => {
    if (code.length !== 6) {
      setError("Invalid code");
      return;
    }

    onVerify(code);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Verify User"
      actions={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="verify" onClick={handleVerify}>
          Verify
        </Button>,
      ]}>
      <div className="verify-user-modal">
        <p className="verify-user-modal__description">
          Please enter the verification code sent to your email address.
        </p>
        <div className="verify-user-modal__input">
          <Input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={error}
          />
        </div>
      </div>
    </Modal>
  );
}
