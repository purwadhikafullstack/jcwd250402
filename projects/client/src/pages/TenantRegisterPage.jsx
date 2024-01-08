import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ImageUpload } from "../components";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../components/inputs/Input";
import { toast } from "sonner";
import { Formik, Form, useFormik } from "formik";
import logo from "../asset/Logo-Black.svg";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const steps = {
  tenantName: 0,
  loginInfo: 1,
  tenantDetail: 2,
  governmentId: 3,
};

const TenantRegisterPage = () => {
  document.title = "Tenant Register - Nginapp";
  const [step, setStep] = useState(steps.tenantName);
  const [formErrors, setFormErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const validationSchemas = {
    [steps.tenantName]: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      // Add any other fields and validations for this step
    }),
    [steps.loginInfo]: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      // Add any other fields and validations for this step
    }),
    [steps.tenantDetail]: Yup.object({
      dateofbirth: Yup.date()
        .required("Date of birth is required")
        .test("is-adult", "You must be at least 18 years old", (value) => {
          return moment().diff(moment(value), "years") >= 18;
        }),
      gender: Yup.string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Invalid gender selection"),
      profilePicture: Yup.mixed()
        .required("Profile Picture is required")
        .test("fileSize", "File is too large", (value) => {
          return !value || (value && value.size <= 1024 * 1024);
        })
        .test("fileType", "Invalid file type", (value) => {
          return (
            !value ||
            (value &&
              ["image/gif", "image/png", "image/jpeg"].includes(value.type))
          );
        }),
      // Add any other fields and validations for this step
    }),
    [steps.governmentId]: Yup.object({
      ktpImg: Yup.mixed().required("Government ID image is required"),
      // Add any other fields and validations for this step
    }),
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateofbirth: "",
      profilePicture: "",
      ktpImg: "",
    },
  });

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const isFirstStepValid = () => {
    if (formik.values.fullname) {
      return true;
    }
  };

  const isSecondStepValid = () => {
    if (
      formik.values.username &&
      formik.values.email &&
      formik.values.password &&
      formik.values.confirmPassword
    ) {
      return true;
    }
  };

  const isThirdStepValid = () => {
    if (
      formik.values.dateofbirth &&
      formik.values.gender &&
      formik.values.profilePicture
    ) {
      return true;
    }
  };

  const isFourthStepValid = () => {
    if (formik.values.ktpImg) {
      return true;
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await validationSchemas[step].validate(values);
      if (step !== steps.governmentId) {
        nextStep();
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }

    setSubmitting(false);
  };

  const progressPercentage = (step / 3) * 100;

  let bodyContent = (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={validationSchemas[step]}
      onSubmit={nextStep}
    >
      {({ errors, touched }) => (
        <Form>
          <h1 className="mb-4 text-2xl">Let's start with something easy</h1>

          <Input
            label={"Tell us your name"}
            id="name"
            type="text"
            placeholder="Tell us your name"
            value={formik.values.fullname}
            onChange={(value) => {
              formik.setFieldValue("fullname", value);
            }}
            className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required={true}
          />
          {touched.fullname && errors.fullname && (
            <div className="text-sm text-red-500">{formik.errors.fullname}</div>
          )}
        </Form>
      )}
    </Formik>
  );

  if (step === steps.loginInfo) {
    bodyContent = (
      <Formik
        initialValues={formik.initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={onSubmit}
      >
        <Form>
          <h1 className="mb-4 text-2xl">Something you'll need to log in</h1>
          <Input
            label={"Pick a username"}
            id="username"
            type="text"
            value={formik.values.username}
            onChange={(value) => formik.setFieldValue("username", value)}
            className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required={true}
          />
          <Input
            label={"What's your email?"}
            id="email"
            type="text"
            value={formik.values.email}
            onChange={(value) => formik.setFieldValue("email", value)}
            className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required={true}
          />
          <Input
            label={"Pick your secret key"}
            id="password"
            type="password"
            value={formik.values.password}
            onChange={(value) => formik.setFieldValue("password", value)}
            className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required={true}
          />
          <Input
            label={"Confirm your secret key"}
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={(value) => formik.setFieldValue("confirmPassword", value)}
            className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required={true}
          />
        </Form>
      </Formik>
    );
  }

  if (step === steps.tenantDetail) {
    bodyContent = (
      <Formik
        initialValues={formik.initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="space-y-4 ">
            <div className="flex flex-col">
              <h1 className="mb-4 text-2xl">About You</h1>
              <label htmlFor="dateofbirth">Date of Birth</label>
              <DatePicker
                id="dob"
                name="dateofbirth"
                onChange={(value) => formik.setFieldValue("dateofbirth", value)}
                selected={new Date()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={false}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={false}
                required
                onChange={(value) => {
                  formik.setFieldValue("gender", value);
                }}
                value={formik.values.gender}
                name="gender"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Rather not to say</option>
              </select>
            </div>
            <ImageUpload
              id="profilePicture"
              name="profilePicture"
              label="Profile Picture"
              field="profilePicture"
              value={formik.values.profilePicture}
              onChange={(value) => {
                formik.setFieldValue("profilePicture", value);
              }}
            />
          </div>
        </Form>
      </Formik>
    );
  }

  if (step === steps.governmentId) {
    bodyContent = (
      <Formik
        initialValues={formik.initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <h1 className="mb-4 text-2xl">Proof of Identification </h1>
            <ImageUpload />
          </Form>
        )}
      </Formik>
    );
  }

  // REACT RENDER HERE // REACT RENDER HERE  // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE   // REACT RENDER HERE
  return (
    <div className="flex flex-col h-screen">
      <div id="logo" className="flex flex-col pt-8 pl-10 space-x-0.5">
        <img
          src={logo}
          alt="logo"
          width={120}
          height={120}
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%", transition: { duration: 0.1 } }}
            exit={{ opacity: 0, x: "100%" }}
          >
            {bodyContent}
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-full transition-all bg-black"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex flex-row justify-between w-full mt-0">
          <div className="p-3">
            <button
              type="button"
              className={`px-6 py-2 mr-2 border-2 rounded-lg ${
                step === steps.tenantName
                  ? "cursor-not-allowed text-neutral-500"
                  : "cursor-pointer text-black bg-white-500"
              }`}
              disabled={step === steps.tenantName || isDisabled}
              onClick={prevStep}
            >
              Back
            </button>
          </div>

          <div className="p-3">
            {step !== steps.governmentId ? (
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-lg bg-primary hover:bg-primary/70 disabled:bg-primary/60"
                onClick={nextStep}
                disabled={
                  step === steps.tenantName
                    ? !isFirstStepValid()
                    : step === steps.loginInfo
                    ? !isSecondStepValid()
                    : steps === steps.tenantDetail
                    ? !isThirdStepValid()
                    : true
                }
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-lg bg-primary hover:bg-primary/70 "
                onClick={onSubmit}
                disabled={
                  steps === steps.governmentId ? !isFourthStepValid() : true
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRegisterPage;
