import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import yupPassword from "yup-password";
import { toast } from "sonner";

import api from "../../api";
import useTenantRegister from "../hooks/useTenantRegister";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

yupPassword(Yup);

const TenantRegisterModal = () => {
  const tenantRegister = useTenantRegister();
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
      toast.success("Login successful");
      setIsLoading(true);
      api
        .post("/auth/login")
        .then(() => {
          tenantRegister.onClose();
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
      <Heading title="Welcome to nginapp" subtitle="Register as Host" />
      <Input
        id="fullName"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <span className="text-xs text-gray-500">
        make sure it matches to your government-issued ID
      </span>
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
      <Input
        id="password"
        label="Confirm Password"
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
      isOpen={tenantRegister.isOpen}
      onClose={tenantRegister.onClose}
      title="Tenant Registration"
      actionLabel="Continue"
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default TenantRegisterModal;
