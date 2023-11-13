import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const tenantRegisterModal = useTenantRegister();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        fullname,
        password,
        role: "tenant",
      });

      if (response.status === 200) {
        setIsLoading(false);
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
      setIsLoading(false);
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
          <Form className="space-y-1">
            <Input
              id="fullname"
              name="fullname"
              label="Full Name"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("fullname", value)}
            />
            <span className="text-xs text-neutral-400">
              Make sure it matches to your government-issued ID{" "}
            </span>
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
          onClick={() => {
            navigate("/tenant");
            tenantRegisterModal.onClose();
          }}
          className="text-xs text-neutral-500 hover:text-black"
        >
          <span>Already a Host? Sign In</span>
        </button>
      </div>
    </div>
  );

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
      body={bodyContent}
    />
  );
};

export default TenantRegisterModal;
