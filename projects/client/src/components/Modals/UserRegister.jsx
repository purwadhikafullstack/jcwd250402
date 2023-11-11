import { useState } from "react";
import * as Yup from "yup";
import yupPassword from "yup-password";
import { toast } from "sonner";
import { Form, Formik, useFormik } from "formik";

import useUserRegister from "../hooks/useUserRegister";
import useLoginModal from "../hooks/useLoginModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import api from "../../api";
import LoginModal from "./LoginModal";
yupPassword(Yup);

const UserRegisterModal = () => {
  const UserRegisterModal = useUserRegister();
  const UseLoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });

  const registerSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string().optional(),
  });

  const registerUser = async (fullname, email, password, phoneNumber, role) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", {
        fullname,
        email,
        password,
        phoneNumber,
        role: "user",
      });

      if (response.status === 200) {
        setIsLoading(false);
        const userData = response.data;
        const token = userData.data.token;

        localStorage.setItem("token", token);

        if (userData.data.role === "user") {
          window.success("Logged In as User");
        } else if (userData.data.role === "tenant") {
          window.success("Logged In as Tenant");
        }
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Register failed. Please check your credentials.");
      console.error("Error:", err);
    }
  };
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "user",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { fullname, email, password, phoneNumber, role } = values;
      registerUser(fullname, email, password, phoneNumber, role);
    },
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // const cancelLogin = () => {
  //   LoginModal.onClose();
  //   window.location.reload();
  // };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Nginapp" subtitle="Lets create your account" />
      <Formik
        initialValues={formik.initialValues}
        validationSchema={registerSchema}
        onSubmit={formik.handleSubmit}>
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
              type="email"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("email", value)}
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
            <Input
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="text"
              disabled={isLoading}
              required
              onChange={(value) => handleInputChange("phoneNumber", value)}
            />
          </Form>
        )}
      </Formik>

      <div>
        <button
          onClick={() => {
            setIsRegistered(false);
            UserRegisterModal.onClose();
            UseLoginModal.onOpen();
          }}
          className="text-xs text-neutral-500 hover:text-black">
          <span>Have an account? Sign In</span>
        </button>
      </div>
    </div>
  );

  const modalBodyContent = isRegistered ? bodyContent : <LoginModal />;

  return (
    <Modal
      disabled={isLoading}
      isOpen={UserRegisterModal.isOpen}
      onOpen={UserRegisterModal.onOpen}
      onClose={() => {
        UseLoginModal.onClose();
        setIsRegistered(true);
        UserRegisterModal.onOpen();
        console.log(alert("You have successfully registered!"));
      }}
      title="User Registration"
      actionLabel={isRegistered ? "Sign Up" : "Log In"}
      onSubmit={() => {
        if (isRegistered) {
          UserRegisterModal.onClose();
          UseLoginModal.onOpen();
        } else {
          registerUser(
            formData.fullname,
            formData.email,
            formData.password,
            formData.phoneNumber,
            formData.role
          );
        }
      }}
      body={modalBodyContent}
    />
  );
};

export default UserRegisterModal;
