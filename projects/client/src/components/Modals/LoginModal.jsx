import { useState } from "react";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import yupPassword from "yup-password";
import { toast } from "sonner";

import api from "../../api";
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

yupPassword(Yup);

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_identity: "",
    password: "",
  });

  const loginSchema = Yup.object({
    user_identity: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginUser = async (user_identity, password) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/auth/login",
        {
          user_identity,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        const token = userData.data.token;

        localStorage.setItem("token", token);

        if (userData.data.role === "tenant") {
          window.success("Logged In as Tenant");
        } else if (userData.data.role === "user") {
          window.success("Logged In as User");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      user_identity: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { user_identity, password } = values;
      loginUser(user_identity, password);
    },
  });

  const handleForgotPassword = (email) => {
    toast.success("Reset password link sent.");
    setIsLoading(false);
    loginModal.onClose();
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Formik
        initialValues={formik.initialValues}
        validationSchema={loginSchema}
        onSubmit={formik.handleSubmit}
      >
        {() => (
          <Form>
            <Input
              id="user_identity"
              name="user_identity"
              label="Username or Email"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("user_identity", value)}
            />
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("password", value)}
            />
          </Form>
        )}
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
  );

  const forgotPasswordBody = (
    <div className="flex flex-col gap-4">
      <Heading subtitle="Uh-oh it seems you have a problem signing-in" />
      <Formik
        initialValues={formik.initialValues}
        validationSchema={loginSchema}
        onSubmit={formik.handleSubmit && console.log(formik.values)}
      >
        {() => (
          <Form>
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("email", value)}
            />
          </Form>
        )}
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
  );

  const modalBody = isForgotPassword ? forgotPasswordBody : bodyContent;

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
        onSubmit={() => {
          loginUser(formData.user_identity, formData.password);
        }}
      />
    </>
  );
};

export default LoginModal;
