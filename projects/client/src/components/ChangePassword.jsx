import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api";
import { toast } from "sonner";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Your current password is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password must be at least 8 characters, and include 1 uppercase letter, 1 number, and 1 symbol"
      )
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        "/auth/change-password",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile settings updated!");
        resetForm();
        setIsLoading(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error updating profile settings:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Current Password
        </label>
        <input
          disabled={isLoading}
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <div className="text-sm text-red-600">
            {formik.errors.currentPassword}
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          disabled={isLoading}
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="text-sm text-red-600">
            {formik.errors.newPassword}
          </div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          required
          disabled={isLoading}
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmNewPassword}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
        {formik.touched.confirmNewPassword &&
        formik.errors.confirmNewPassword ? (
          <div className="text-sm text-red-600">
            {formik.errors.confirmNewPassword}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full py-2 text-lg font-medium text-white rounded-md bg-primary hover:bg-primary/70 focus:outline-none focus:ring focus:ring-primary"
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
