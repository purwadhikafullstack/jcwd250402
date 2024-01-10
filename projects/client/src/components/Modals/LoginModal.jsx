import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import yupPassword from "yup-password";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Box } from "@mantine/core";

import api from "../../api";
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { login, tenantLogin } from "../slice/authSlices";

yupPassword(Yup);

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const location = useLocation();
  const { openLoginModal } = location.state || {};
  const [formData, setFormData] = useState({
    user_identity: "",
    password: "",
    email: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (openLoginModal) {
      loginModal.onOpen();
    }
  });

  const loginSchema = Yup.object().shape({
    user_identity: Yup.string()
      .required("Username/Email can't be empty")
      .min(6, "Minimum characters is 6"),
    password: Yup.string().required("Password can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      user_identity: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const response = await api.post("/auth/login", formik.values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.info("Welcome back! Successfully logged in!");
          const userData = response.data;
          const token = userData.token;
          const role = userData.role;

          if (role === "tenant") {
            dispatch(tenantLogin({ token: token, id: userData.id }));
            window.location.reload();
            loginModal.onClose();
          }
          if (role === "user") {
            dispatch(login({ token: token, id: userData.id }));
            window.location.reload();
            loginModal.onClose();
          }
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
        loginModal.onClose();
      }
    },
  });

  const formikReset = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        const response = await api.post(
          "/auth/forgot-password",
          formikReset.values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Reset password link has been sent to your email.");
          setIsForgotPassword(false);
        }
      } catch (error) {
        toast.error("Failed to send reset password link.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const bodyContent = (
    <Box pos={"relative"}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />
        <Formik
          initialValues={{
            user_identity: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={formik.handleSubmit}
        >
          <Form className="space-y-4 md:space-y-2">
            <Input
              id="user_identity"
              name="user_identity"
              label="Username or Email"
              type="text"
              disabled={isLoading}
              required={true}
              value={formik.values.user_identity}
              onChange={(value) => formik.setFieldValue("user_identity", value)}
            />
            {formik.errors.user_identity && formik.touched.user_identity ? (
              <div className="text-xs text-red-500">
                {formik.errors.user_identity}
              </div>
            ) : null}
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              disabled={isLoading}
              required={true}
              value={formik.values.password}
              onChange={(value) => formik.setFieldValue("password", value)}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-xs text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </Form>
        </Formik>

        <div>
          <button
            onClick={() => setIsForgotPassword(true)}
            className="text-xs text-neutral-500 hover:text-black"
          >
            <span>forgot password?</span>
          </button>
        </div>
      </div>
    </Box>
  );

  const forgotPasswordBody = (
    <Box pos={"relative"}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <div className="flex flex-col gap-4">
        <Heading subtitle="Uh-oh it seems you have a problem signing-in" />
        <Formik
          initialValues={formikReset.initialValues}
          validationSchema={formikReset.validationSchema}
          onSubmit={formikReset.handleSubmit}
        >
          <Form>
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              disabled={isLoading}
              required
              value={formikReset.values.email}
              onChange={(value) => formikReset.setFieldValue("email", value)}
            />
            {formikReset.touched.email && formikReset.errors.email ? (
              <div className="text-red-500">{formikReset.errors.email}</div>
            ) : null}
          </Form>
        </Formik>
        <div>
          <button
            onClick={() => setIsForgotPassword(false)}
            className="text-xs text-neutral-500 hover:text-black"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Box>
  );

  const modalBody = isForgotPassword ? forgotPasswordBody : bodyContent;
  // const submitAction = isForgotPassword
  //   ? () => formikReset.handleSubmit
  //   : () => formik.handleSubmit;

  console.log(formikReset.values);
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={() => {
          loginModal.onClose();
          setIsForgotPassword(false);
        }}
        title={isForgotPassword ? "Forgot Password" : "Login"}
        actionLabel={isForgotPassword ? "Send Reset Password Link" : "Sign In"}
        body={modalBody}
        onSubmit={
          isForgotPassword ? formikReset.handleSubmit : formik.handleSubmit
        }
      />
    </>
  );
};

export default LoginModal;
