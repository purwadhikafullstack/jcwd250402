import React, { useState, useEffect } from "react";
import api from "../api.js";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ChangePassword from "../components/ChangePassword.jsx";
import { UploadPhoto } from "../components/";

export default function UpdateProfile() {
  document.title = "Update Profile";
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
    dateofbirth: Yup.date()
      .required("Date of birth is required")
      .test("is-adult", "You must be at least 18 years old", (value) => {
        return (
          moment().diff(moment(value), "years") >= 18 ||
          toast.error("You must be at least 18 years old")
        );
      }),
    gender: Yup.string().oneOf(
      ["male", "female", "other"],
      "Invalid gender selection"
    ),
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formattedDateOfBirth = moment(values.dateofbirth).format(
        "YYYY-MM-DD"
      );

      const response = await api.patch(
        "/user/update-profile",
        {
          username: values.username,
          email: values.email,
          fullname: values.fullname,
          password: values.newPassword,
          gender: values.gender,
          profilePicture: values.profilePicture,
          dateofbirth: formattedDateOfBirth,
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
      setIsLoading(false);
      toast.error("Oops Something Went Wrong, Try Again Later");
    }
  };

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
    username: decodedToken.username,
    email: decodedToken.email,
    fullname: decodedToken.fullname,
    dateofbirth: decodedToken.dateofbirth,
    gender: "",
    profilePicture: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/user/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { username, email, fullname, dateofbirth, gender } =
            response.data.userInfo;

          // Set the fetched values to formik
          formik.setValues({
            ...formik.values,
            username,
            email,
            fullname,
            dateofbirth: dateofbirth ? moment(dateofbirth).toDate() : null,
            gender,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [userId, formik.setValues, token]);

  console.log(formik.values.profilePicture);

  return (
    <section className="flex flex-col items-center justify-center w-[70%] min-h-screen bg-white rounded-md">
      <div className="w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Profile Settings</h2>
        <Formik
          onSubmit={formik.handleSubmit}
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={isLoading}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-red-600">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={isLoading}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-sm text-red-600">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={isLoading}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-sm text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <DatePicker
                id="dob"
                name="dateofbirth"
                onChange={(date) => formik.setFieldValue("dateofbirth", date)}
                onBlur={formik.handleBlur}
                selected={formik.values.dateofbirth}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={isLoading}
              />

              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="error">{formik.errors.birthDate}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                disabled={isLoading}
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                name="gender"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Rather not say</option>
              </select>

              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="error">{formik.errors.birthDate}</div>
              ) : null}
            </div>

            <UploadPhoto
              label={"Profile Picture"}
              formik={formik}
              field="profilePicture"
            />

            <button
              type="submit"
              className="w-full py-2 my-4 text-lg font-medium text-white rounded-md bg-primary hover:bg-primary/70 focus:outline-none focus:ring focus:ring-primary"
            >
              Save
            </button>
          </Form>
        </Formik>
        <ChangePassword />
      </div>
    </section>
  );
}
