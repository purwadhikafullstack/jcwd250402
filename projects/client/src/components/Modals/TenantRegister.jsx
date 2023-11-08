import { useState } from "react";
import { useFormik, Formik, Form } from "formik";
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
  const tenantRegisterModal = useTenantRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    role: "tenant",
  });

  const loginSchema = Yup.object({
    user_identity: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const registerTenant = async (username, email, fullname, password, role) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        fullname,
        password,
        role: "tenant",
      });

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
      toast.error("Register failed. Please check your credentials.");
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fullname: "",
      password: "",
      role: "tenant",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { username, email, fullname, password, role } = values;
      registerTenant(username, email, fullname, password, role);
    },
  });

  const handleForgotPassword = (email) => {
    toast.success("Reset password link sent.");
    setIsLoading(false);
    tenantRegisterModal.onClose();
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Nginapp"
        subtitle="Ready to host your place?"
      />
      <Formik
        initialValues={formik.initialValues}
        validationSchema={loginSchema}
        onSubmit={formik.handleSubmit}
      >
        {() => (
          <Form>
            <Input
              id="fullname"
              name="fullname"
              label="Full Name"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("fullname", value)}
            />
            <Input
              id="email"
              name="email"
              label="Email"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("email", value)}
            />
            <Input
              id="username"
              name="username"
              label="Username"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("username", value)}
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
          onClick={() => setIsRegistered(true)}
          className="text-xs text-neutral-500 hover:text-black"
        >
          <span>Already a Host? Sign In</span>
        </button>
      </div>
    </div>
  );

  const tenantLoginBodyContent = (
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
      <div>
        <button
          onClick={() => setIsRegistered(false)}
          className="text-xs text-neutral-500 hover:text-black"
        >
          <span>Cancel</span>
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

  const modalBodyContents = isRegistered ? tenantLoginBodyContent : bodyContent;
  const forgotPasswordMenu = isForgotPassword
    ? forgotPasswordBody
    : tenantLoginBodyContent;

  return (
    <Modal
      disabled={isLoading}
      isOpen={tenantRegisterModal.isOpen}
      onClose={tenantRegisterModal.onClose}
      title="Tenant Registration"
      actionLabel="Continue"
      onSubmit={() => {
        registerTenant(formData.user_identity, formData.password);
      }}
      body={modalBodyContents || forgotPasswordMenu}
    />
  );
};

export default TenantRegisterModal;