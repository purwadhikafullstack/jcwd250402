import { useState } from "react";
import { useFormik, Formik, Form, ErrorMessage } from "formik";
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
    email: "",
  });

  const loginSchema = Yup.object().shape({
    user_identity: Yup.string()
      .required("Username/Email can't be empty")
      .min(6, "Minimum characters is 6"),
    password: Yup.string().required("Password can't be empty"),
    email: Yup.string().email("Please enter a valid email address"),
  });

  const loginUser = async (user_identity, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        user_identity,
        password,
      });
      if (response.status === 200) {
        const userData = response.data;
        const token = userData.token;
        const role = userData.role;

        localStorage.setItem("token", token);
        if (role === "tenant") {
          toast.success("Logged In as Tenant");
          loginModal.onClose();
          setIsLoading(false);
        } else if (role === "user") {
          toast.success("Logged In as User");
          loginModal.onClose();
          setIsLoading(false);
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Internal Server Error. Please Try Again Later");
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    onSubmit: (values) => {
      const { user_identity, password } = values;
      loginUser(user_identity, password);
    },
  });

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    try {
      const response = await api.post("/user/forgot-password", {
        email,
      });
      if (response.status === 200) {
        toast.success("Reset password link has been sent to your email.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to send reset password link.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formikReset = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { email } = values;
      loginUser(email);
    },
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const bodyContent = (
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
        {({ errors, touched }) => (
          <Form>
            <Input
              id="user_identity"
              name="user_identity"
              label="Username or Email"
              type="text"
              disabled={isLoading}
              required={true}
              onChange={(value) => handleInputChange("user_identity", value)}
            />
            {/* {errors.user_identity ? (
              <div className="text-red-500">{errors.user_identity}</div>
            ) : null} */}
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              disabled={isLoading}
              required={true}
              onChange={(value) => handleInputChange("password", value)}
            />
            {/* {errors.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : null} */}
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
        initialValues={formikReset.initialValues}
        validationSchema={loginSchema}
        onSubmit={formikReset.handleSubmit}
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
  const submitAction = isForgotPassword
    ? () => handleForgotPassword(formData.email)
    : () => loginUser(formData.user_identity, formData.password);

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
        onSubmit={submitAction}
      />
    </>
  );
};

export default LoginModal;
