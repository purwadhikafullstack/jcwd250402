import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api.js";
import { RiAddFill } from "react-icons/ri";
import { toast } from "sonner";

export default function UploadProfilePicture() {
  const formik = useFormik({
    initialValues: {
      name: "",
      profilePicture: null,
    },
    validationSchema: Yup.object({
      profilePicture: Yup.mixed()
        .test("fileSize", "File is too large", (value) => {
          return value && value.size <= 1024 * 1024;
        })
        .test("fileType", "Invalid file type", (value) => {
          return (
            value &&
            ["image/gif", "image/png", "image/jpeg"].includes(value.type)
          );
        }),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("profilePicture", values.profilePicture);
        const response = await api.patch("/user/update-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          window.location.reload();
          toast.success("Profile picture updated!");
        }
      } catch (error) {
        toast.error("Error updating profile picture:");
      }
    },
  });

  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const preview = URL.createObjectURL(acceptedFiles[0]);
      formik.setFieldValue("profilePicture", acceptedFiles[0]);
      setPreview(preview);
    },
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Add the following useEffect to reset the input value
  useEffect(() => {
    // Reset input value after handling drop event
    formik.setFieldValue("profilePicture", null);
  }, [preview]);

  return (
    <>
      <span className="block text-sm font-medium text-gray-700">
        Profile Picture
      </span>
      <div
        {...getRootProps()}
        className="flex items-center justify-center bg-white"
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-500 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <img
                src={preview}
                alt="Profile picture preview"
                className="object-cover w-full h-40 mb-2 rounded-lg"
              />
            ) : (
              <RiAddFill className="h-[40px] w-[40px] text-white bg-primary" />
            )}
            <p className="mt-5 text-sm text-gray-500 dark-text-gray-400">
              <span className="font-semibold text-primary">Add Image</span>
            </p>
          </div>
          <input
            {...getInputProps()}
            id="dropzone-file"
            type="file"
            name="profilePicture"
            className="hidden"
            accept="image/"
            multiple={false}
          />
        </label>
      </div>

      {formik.errors.profilePicture && formik.touched.profilePicture && (
        <div className="text-red-500">{formik.errors.profilePicture}</div>
      )}
      <div className="flex justify-evenly ">
        <button
          type="button"
          onClick={() => {
            formik.handleSubmit();
          }}
          className=" bg-primary mt-4 mb-11 text-white font-medium text-lg py-2 rounded-md hover:bg-primary/70 focus:outline-none focus:ring focus:ring-[#018947] w-[25%]"
        >
          Upload
        </button>
      </div>
    </>
  );
}
