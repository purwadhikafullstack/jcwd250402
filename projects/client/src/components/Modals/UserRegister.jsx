import { useState } from "react";
import * as Yup from "yup";
import yupPassword from "yup-password";
import { toast } from "sonner";
import { Form, Formik, useFormik, Field } from "formik";

import useUserRegister from "../hooks/useUserRegister"; // Register Slice
import useLoginModal from "../hooks/useLoginModal"; // Login Slice
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import api from "../../api";
import DatePicker from "react-datepicker";
import { Box, LoadingOverlay } from "@mantine/core";
import moment from "moment";
import { useNavigate } from "react-router-dom";
yupPassword(Yup);

const UseRegisterModal = () => {
  const navigate = useNavigate();
  const UseRegisterModal = useUserRegister();
  const UseLoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);

  const registerSchema = Yup.object({
    fullname: Yup.string()
      .min(6, "Minimum characters is 6")
      .required("Fullname is required"),
    username: Yup.string()
      .min(3, "username need at least 6 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("phoneNumber is required"),
    dateofbirth: Yup.date()
      .required("Date of birth is required")
      .test("is-adult", "You must be at least 18 years old", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      }),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      gender: "",
      phoneNumber: "",
      role: "user",
      dateofbirth: "",
    },
    validationSchema: registerSchema,
    onSubmit: async () => {
      setIsLoading(true);
      try {
        const response = await api.post("auth/register", formik.values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success(
            "Registration successful. Please check your email to verify your account"
          );
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        UseRegisterModal.onClose();
      }
    },
  });

  const loginButton = () => {
    setIsRegistering(false);
    UseRegisterModal.onClose();
    UseLoginModal.onOpen();
  };

  const bodyContent = (
    <Box className="flex flex-col gap-4">
      <LoadingOverlay visible={isLoading} zIndex={100000000000000000} />
      <Heading title="Welcome to Nginapp" subtitle="Lets create your account" />
      <Formik
        initialValues={formik.initialValues}
        validationSchema={registerSchema}
        onSubmit={formik.handleSubmit}
      >
        {() => (
          <Form className="gap-x-2">
            <div className="flex flex-col gap-y-2">
              <Input
                id="fullname"
                name="fullname"
                label="Full Name"
                type="text"
                disabled={isLoading}
                required
                onChange={(value) => formik.setFieldValue("fullname", value)}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="text-red-500">{formik.errors.fullname}</div>
              ) : null}
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                disabled={isLoading}
                required
                onChange={(value) => formik.setFieldValue("email", value)}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
              <Input
                id="username"
                name="username"
                label="Username"
                type="username"
                disabled={isLoading}
                required
                onChange={(value) => formik.setFieldValue("username", value)}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500">{formik.errors.username}</div>
              ) : null}
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                disabled={isLoading}
                required
                onChange={(value) => formik.setFieldValue("password", value)}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
              <Input
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                type="text"
                disabled={isLoading}
                required
                onChange={(value) => formik.setFieldValue("phoneNumber", value)}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              ) : null}
              <div className="flex flex-row w-[100%] gap-x-2">
                <div className="flex flex-col w-full">
                  <DatePicker
                    selected={formik.values.dateofbirth}
                    onChange={(date) =>
                      formik.setFieldValue("dateofbirth", date)
                    }
                    disabled={isLoading}
                    width="200px"
                    placeholderText="Date of Birth"
                    className="w-full p-2 border-2 border-gray-400 rounded-md "
                  />
                  {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                    <div className="text-red-500">
                      {formik.errors.dateofbirth}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col w-full">
                  <Field
                    className="w-full p-3 border-2 rounded-md"
                    as="select"
                    onChange={(e) =>
                      formik.setFieldValue("gender", e.target.value)
                    }
                    value={formik.values.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Rather Not Say</option>
                  </Field>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-500">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col items-start">
        <button
          onClick={loginButton}
          className="text-xs text-neutral-500 hover:text-black"
        >
          <span>Have an account? Sign In</span>
        </button>
        <button
          onClick={() => {
            navigate("/tenant/register");
            UseRegisterModal.onClose();
          }}
          className="text-xs text-neutral-500 hover:text-black"
        >
          <span>Become a Host? Sign Up here</span>
        </button>
      </div>
    </Box>
  );

  console.log(formik.values.gender);
  return (
    <Modal
      disabled={isLoading}
      isOpen={UseRegisterModal.isOpen}
      onOpen={UseRegisterModal.onOpen}
      onClose={() => {
        setIsRegistering(true);
        UseLoginModal.onClose();
        UseRegisterModal.onClose();
      }}
      title="User Registration"
      actionLabel={isRegistering ? "Sign Up" : "Sign In"}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
    />
  );
};

export default UseRegisterModal;
