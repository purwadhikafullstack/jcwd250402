import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload } from "../components";
import { login, logout, tenantLogin } from "../components/slice/authSlices.js";

import useTenantRegister from "../components/hooks/useTenantRegister.js";
import { Button } from "../components";
import logo from "../asset/Logo-White.svg";
import logo_black from "../asset/Logo-Black.svg";
import api from "../api.js";
import Input from "../components/inputs/Input.jsx";

const TenantLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isTenant = useSelector((state) => state.auth.isTenant);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgradeAccount, setIsUpgradeAccount] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [ktpImg, setKtpImg] = useState(null);

  const formik = useFormik({
    initialValues: {
      user_identity: "",
      password: "",
    },
    validationSchemaa: Yup.object().shape({
      user_identity: Yup.string()
        .required("Username/Email can't be empty")
        .min(6, "Minimum characters is 6"),
      password: Yup.string().required("Password can't be empty"),
    }),

    onSubmit: async () => {
      try {
        const response = await api.post("/auth/login", formik.values);
        if (response.status === 200) {
          const userData = response.data;
          const token = userData.token;
          const role = userData.role;
          navigate("/tenant/dashboard");

          if (role === "user") {
            toast.error("Sorry this page is for tenants only.");
            dispatch(
              login({ token: token, isLoggedIn: true, isTenant: false })
            );
            return;
          } else {
            navigate("/tenant/dashboard");
            dispatch(
              tenantLogin({ token: token, isLoggedIn: true, isTenant: true })
            );
            toast.success("Log in successful! Welcome back!");
          }
        }
      } catch (error) {
        toast.error(error.response.data.message);
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
    onSubmit: async (email) => {
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
    },
  });

  const handleUpgradeAccount = async () => {
    try {
      const response = await api.patch(
        "/auth/upgrade-account",
        {
          ktpImg,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setIsUpgradeAccount(false);
        toast.success("Upgrade account successful! Please login again.", {
          duration: 5000,
        });
        dispatch(logout());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden h-[100vh] w-full bg-no-repeat bg-cover bg-login flex flex-row justify-between z-0">
      <div className="hidden w-full gap-4 mt-[150px] ml-[150px] f md:block">
        <img src={logo} alt="logo" className="" />
        <p className="text-5xl font-semibold text-white">
          Elevate Your Rental Experience
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto md:h-screen lg:py-0 z-100">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-row items-center justify-center">
              <h1 class="text-xl font-light leading-tight tracking-tight text-gray-900 md:text-2xl mr-2">
                Welcome to
              </h1>
              <img src={logo_black} alt="" width={120} height={120} />
              <h1 className="ml-2 text-xl font-light leading-tight tracking-tight text-gray-900 md:text-2xl">
                host
              </h1>
            </div>
            {isForgot ? (
              <Formik onSubmit={formikReset.handleSubmit}>
                <Form>
                  <Input
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    disabled={isLoading}
                    required
                    value={formikReset.values.email}
                    onChange={(value) =>
                      formikReset.setFieldValue("email", value)
                    }
                  />
                  <button
                    onClick={() => setIsForgot(false)}
                    className="text-xs font-light text-neutral-400 hover:underline hover:text-primary/70"
                  >
                    Cancel
                  </button>
                </Form>
              </Formik>
            ) : (
              <section>
                {isLoggedIn && !isTenant ? (
                  isUpgradeAccount ? (
                    <div className="flex flex-col ">
                      <div className="flex flex-col items-center justify-center p-3 gap-y-3">
                        <span className="font-semibold text-md ">
                          Please provide a valid government issued ID
                        </span>
                        <ImageUpload
                          onChange={(file) => {
                            setKtpImg(file);
                          }}
                          onDelete={() => {
                            setKtpImg(null);
                          }}
                          value={ktpImg}
                        />
                        <button
                          className=" text-white bg-primary hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                          onClick={handleUpgradeAccount}
                        >
                          Upgrade
                        </button>
                      </div>
                      <div
                        className="text-sm font-light cursor-pointer text-neutral-400 ml-14"
                        onClick={() => setIsUpgradeAccount(false)}
                      >
                        Cancel
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button
                        label="Become a Host"
                        onClick={() => {
                          setIsUpgradeAccount(true);
                        }}
                      />
                    </>
                  )
                ) : (
                  <>
                    <Formik onSubmit={formik.handleSubmit}>
                      <Form className="space-y-4 md:space-y-4">
                        <Input
                          id="user_identity"
                          name="user_identity"
                          label="Username or Email"
                          type="text"
                          disabled={isLoading}
                          required={true}
                          onChange={(value) =>
                            formik.setFieldValue("user_identity", value)
                          }
                        />
                        <Input
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                          disabled={isLoading}
                          required={true}
                          onChange={(value) =>
                            formik.setFieldValue("password", value)
                          }
                        />
                      </Form>
                    </Formik>
                    <div class="flex items-center justify-between mt-4">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <button
                        className="text-sm font-medium text-primary-600 hover:underline hover:text-primary"
                        onClick={() => {
                          setIsForgot(true);
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </>
                )}
              </section>
            )}
            {isLoggedIn && !isTenant ? null : isForgot ? (
              <button
                onClick={formikReset.handleSubmit}
                className="w-full text-white bg-primary hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Send Reset Password Link
              </button>
            ) : (
              <button
                onClick={formik.handleSubmit}
                className="w-full text-white bg-primary hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
            )}
            <div class="flex items-center justify-center mt-4">
              <span class="w-full border-b  mr-10"></span>
              <span class="text-md text-center text-gray-500">or</span>
              <span class="w-full border-b  ml-10"></span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">Don't have an account?</span>
              <button
                onClick={() => {
                  navigate("/tenant/register");
                }}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;
