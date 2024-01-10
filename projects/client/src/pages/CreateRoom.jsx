import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "sonner";
import { Formik, Form, useFormik } from "formik";
import Input from "../components/inputs/Input";
import { ImageUploader } from "../components/CreateProperty";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

const CreateRoom = () => {
  document.title = "Create New Property";
  const navigate = useNavigate();
  const [images] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { propertyId } = useParams();

  const validationSchema = yup.object({
    roomName: yup.string().required("Property name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    bedCount: yup.number().required("Bed count is required"),
    maxGuestCount: yup.number().required("Max guest count is required"),
    bathroomCount: yup.number().required("Bathroom count is required"),
    images: yup.array().required("Images are required"),
  });

  const formik = useFormik({
    initialValues: {
      roomName: "",
      description: "",
      price: 0,
      bedCount: 0,
      maxGuestCount: 0,
      bathroomCount: 0,
      images: [[]],
    },
    validationSchema: validationSchema,

    onSubmit: async () => {
      const token = localStorage.getItem("token");
      const isTenant = localStorage.getItem("isTenant");
      if (isTenant === "false" || isTenant === "null") {
        toast.error("Only tenants can create properties!");
        return;
      }
      const formData = new FormData();
      formData.append("roomName", formik.values.roomName);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("bedCount", formik.values.bedCount);
      formData.append("maxGuestCount", formik.values.maxGuestCount);
      formData.append("bathroomCount", formik.values.bathroomCount);
      formik.values.images.forEach((image) => {
        formData.append(`images`, image);
      });
      console.log(formData.images);
      try {
        const response = await api.post(
          `/property/${propertyId}/room/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSubmitting(true);
        if (response.status === 201) {
          setIsSubmitting(false);
          toast.success("Rooms created successfully");
          navigate("/tenant/dashboard");
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={50} />
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    if (field === "images") {
      formik.setFieldValue((prevData) => ({
        ...prevData,
        images: value,
      }));
    } else {
      formik.setFieldValue(field, value);
    }
  };

  const handleImageUpdate = (updatedImages) => {
    formik.setFieldValue("images", updatedImages);
  };

  const handleIncrement = (property) => {
    formik.setFieldValue(property, formik.values[property] + 1);
  };

  const handleDecrement = (property) => {
    formik.setFieldValue(property, Math.max(formik.values[property] - 1, 0));
  };

  return (
    <div className="px-2 py-6">
      <div className="flex flex-col bg-white">
        <Formik
          initialValues={formik.initialValues}
          onSubmit={formik.handleSubmit}
        >
          <Form>
            {/* PROPERTY NAME */}
            <div className="flex flex-col border-b-2 p-9 gap-y-3">
              <label htmlFor="property_name" className="text-xl font-medium">
                What's the name of the room?
              </label>
              <input
                name="roomName"
                type="text"
                placeholder="Room A, Room B, etc..."
                className={`w-full p-4 text-xl border border-gray-400 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary
                ${isSubmitting ? "bg-gray-200" : "bg-white"}}`}
                value={formik.values.roomName}
                onChange={formik.handleChange}
                disabled={isSubmitting}
              />
              {formik.touched.roomName && formik.errors.roomName ? (
                <div className="text-sm text-red-600">
                  {formik.errors.roomName}
                </div>
              ) : null}
            </div>
            {/* PROPERTY IMAGES */}
            <div className="p-9">
              <ImageUploader
                images={images}
                disabled={isSubmitting}
                onUpdateFormData={handleImageUpdate}
              />
              {formik.touched.images && formik.errors.images ? (
                <div className="text-sm text-red-600">
                  {formik.errors.images}
                </div>
              ) : null}
            </div>
            {/* PROPERTY COUNT */}
            <div className="p-9">
              <h1 className="mb-2 text-lg font-medium">
                How many guests can stay in the room?
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span>Guests:</span>
                  <div className="" />
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => {
                      handleDecrement("maxGuestCount");
                    }}
                  >
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.maxGuestCount}</span>
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => handleIncrement("maxGuestCount")}
                  >
                    <CiCirclePlus size={25} />
                  </button>
                </div>
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span className="pr-4">Beds:</span>
                  <div className="" />
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => handleDecrement("bedCount")}
                  >
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.bedCount}</span>
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => handleIncrement("bedCount")}
                  >
                    <CiCirclePlus size={25} />
                  </button>
                </div>
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span>Bathrooms:</span>
                  <div className="" />
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => handleDecrement("bathroomCount")}
                  >
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.bathroomCount}</span>
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => handleIncrement("bathroomCount")}
                  >
                    <CiCirclePlus size={25} />
                  </button>
                </div>
              </div>
            </div>
            {/* PROPERTY DESCRIPTION */}
            <div className="flex flex-col border-b-2 p-9">
              <label htmlFor="DESCRIPTION" className="text-lg font-medium">
                Tell us more about the room
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="3"
                disabled={isSubmitting}
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full p-4 text-xl border border-gray-400 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-sm text-red-600">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            {/* PROPERTY PRICE */}
            <div className="flex flex-col border-b-2 p-9">
              <Input
                disabled={isSubmitting}
                className={"appearance-none"}
                id="price"
                name="price"
                label="Price /night (IDR)"
                type="number"
                onChange={(value) => handleInputChange("price", value)}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-sm text-red-600">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>
            <button
              className={`w-full p-4 text-white rounded-md bg-primary ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }}`}
              type="submit"
            >
              Create new room
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateRoom;
