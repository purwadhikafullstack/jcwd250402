import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import yupPassword from "yup-password";

import api from "../../api";
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

yupPassword(Yup);

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, errors, onSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .password({
          min: 8,
          mixLowerAndNumbers: true,
          mixLowerAndSpecial: true,
          mixLowerAndUpper: true,
          mixNumberAndSpecial: true,
        })
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      api
        .post("/auth/login")
        .then(() => {
          loginModal.onClose();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default LoginModal;
