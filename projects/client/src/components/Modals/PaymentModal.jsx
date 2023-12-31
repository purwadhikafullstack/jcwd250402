import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import api from "../../api";
import { ImageUpload } from "../";

import usePaymentModal from "../hooks/usePaymentModal";
import { PaymentAccordion } from "../";
import Modal from "./Modal";
import Heading from "../Heading";
import { useSelector } from "react-redux";

const steps = {
  paymentInfo: 0,
  paymentProof: 1,
};

const PaymentModal = () => {
  const navigate = useNavigate();
  const paymentModal = usePaymentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentImage, setPaymentImage] = useState(null);
  const [step, setStep] = useState(steps.paymentInfo);
  const token = useSelector((state) => state.auth.token);
  const bookingId = useSelector((state) => state.paymentModal.bookingId);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === steps.paymentProof) {
      return "Upload Payment Proof";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === steps.paymentInfo) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const handlePayment = async () => {
    if (step !== steps.paymentProof) {
      return onNext();
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("paymentProof", paymentImage);

    try {
      const handlePayment = await api.post(
        `/booking/pay/${bookingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (handlePayment.status === 201) {
        toast.success("Payment Successfully Uploaded");
        navigate(0);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  let bodyContent = (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {/* <Heading
            title="Payment"
            subtitle="Please upload your payment receipt"
          /> */}
        </div>
        <PaymentAccordion />
      </div>
    </div>
  );

  if (step === steps.paymentProof) {
    bodyContent = (
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Heading
              title="Payment"
              subtitle="Please upload your payment receipt"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <ImageUpload
              onChange={(file) => {
                setPaymentImage(file);
              }}
              onDelete={() => {
                setPaymentImage(null);
              }}
              value={paymentImage}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={paymentModal.isOpen}
        onClose={() => {
          paymentModal.onClose();
        }}
        title={"Upload Proof of Payment"}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === steps.paymentInfo ? undefined : onBack}
        body={bodyContent}
        onSubmit={handlePayment}
      />
    </>
  );
};

export default PaymentModal;
