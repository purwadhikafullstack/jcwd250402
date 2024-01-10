import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { Input, Navbar, ImageUpload, Button } from "../components/";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Select, LoadingOverlay, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function TenantRegister() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      username: "",
      gender: "",
      password: "",
      confirmPassword: "",
      dateofbirth: "",
      phoneNumber: "",
      ktpImg: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, "Name must be at least 5 characters")
        .required("Name is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      ktpImg: Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size must be 1MB or less", (value) => {
          if (value && value.length) {
            return value[0].size <= 1000000; // 1MB in bytes
          }
          return true;
        })
        .test(
          "fileType",
          "Only JPG, JPEG, GIF, and PNG are allowed",
          (value) => {
            if (value && value.length) {
              return [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
              ].includes(value[0].type);
            }
            return true;
          }
        ),
      dateofbirth: Yup.string().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
    }),

    onSubmit: async () => {
      setIsSubmitting(true);
      try {
        const response = await api.post(
          "auth//tenant-register",
          formik.values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setIsSubmitting(false);
          navigate("/");
          toast.success(
            "Registration successful. Please check your email to verify your account"
          );
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box className="flex flex-col w-[100vw] h-screen ">
      <LoadingOverlay visible={isSubmitting} zIndex={1000} />
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-auto mt-28">
        <Formik
          initialValues={formik.values}
          onSubmit={formik.handleSubmit}
          validationSchema={formik.validationSchema}
        >
          <Form className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <Input
                value={formik.values.fullname}
                onChange={(values) => formik.setFieldValue("fullname", values)}
                label={"Name"}
                disabled={isSubmitting}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="text-red-500">{formik.errors.fullname}</div>
              ) : null}
              <Input
                value={formik.values.email}
                onChange={(values) => formik.setFieldValue("email", values)}
                label={"Email"}
                disabled={isSubmitting}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
              <Input
                value={formik.values.username}
                onChange={(values) => formik.setFieldValue("username", values)}
                label={"Username"}
                disabled={isSubmitting}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500">{formik.errors.username}</div>
              ) : null}
              <Input
                value={formik.values.password}
                onChange={(values) => formik.setFieldValue("password", values)}
                type={"password"}
                label={"Password"}
                disabled={isSubmitting}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
              <Input
                value={formik.values.confirmPassword}
                onChange={(values) =>
                  formik.setFieldValue("confirmPassword", values)
                }
                label={"Confirm Password"}
                type={"password"}
                disabled={isSubmitting}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <Input
                value={formik.values.phoneNumber}
                onChange={(values) =>
                  formik.setFieldValue("phoneNumber", values)
                }
                label={"Phone No"}
                disabled={isSubmitting}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="flex flex-row p-2 gap-x-2">
              <div className="flex flex-col">
                <DatePicker
                  selected={formik.values.dateofbirth}
                  onChange={(date) => formik.setFieldValue("dateofbirth", date)}
                  disabled={isSubmitting}
                  placeholderText="Date of Birth"
                  className="w-full p-2 border-2 border-gray-400 rounded-md"
                />
                {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                  <div className="text-red-500">
                    {formik.errors.dateofbirth}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <Select
                  value={formik.values.gender}
                  onChange={(values) => formik.setFieldValue("gender", values)}
                  disabled={isSubmitting}
                  data={["Male", "Female", "Rather not say"]}
                  className="w-full p-2 rounded-md"
                  placeholder="Gender"
                  style={{ padding: "0.5rem" }}
                />
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-red-500">{formik.errors.gender}</div>
                ) : null}
              </div>
            </div>
            <label htmlFor="">Government-issued ID</label>
            <div>
              <ImageUpload
                onChange={(values) => formik.setFieldValue("ktpImg", values)}
                value={formik.values.ktpImg}
                disabled={isSubmitting}
              />
            </div>
            {formik.touched.ktpImg && formik.errors.ktpImg ? (
              <div className="text-red-500">{formik.errors.ktpImg}</div>
            ) : null}

            <Button
              type="submit"
              onClick={formik.handleSubmit}
              label={"Register"}
            />
          </Form>
        </Formik>
      </div>
    </Box>
  );
}
