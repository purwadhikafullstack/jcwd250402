import { useState } from "react";
import api from "../api";
import { toast } from "sonner";
import { Formik, Form, useFormik } from "formik";
import Input from "../components/inputs/Input";
import {
  ImageUploader,
  CreateCategoryAmenities,
  CreatePropertyType,
  PropertyRules,
} from "../components/CreateProperty";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const CreateProperty = () => {
  document.title = "Create New Property";
  const [images] = useState([]);

  const [propertyRules, setPropertyRules] = useState([]);

  const formik = useFormik({
    initialValues: {
      propertyName: "",
      description: "",
      price: 0,
      roomCount: 0,
      bedCount: 0,
      bedroomCount: 0,
      maxGuestCount: 0,
      bathroomCount: 0,
      propertyType: "",
      district: "",
      city: "",
      province: "",
      streetAddress: "",
      postalCode: 0,
      propertyRules: [],
      images: [],
    },
    onSubmit: async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.post("/property/create", formik.values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          toast.success("Property created successfully");
        }
      } catch (error) {
        console.log(error);
        if (error.status === 400) {
          toast.error(error.message);
        } else {
          toast.error(error.message);
        }
      }
    },
  });

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

  console.log(formik.values);
  return (
    <div className="px-2 py-6">
      <div className="flex flex-col bg-white">
        <Formik>
          <Form>
            {/* PROPERTY NAME */}
            <div className="flex flex-col border-b-2 p-9 gap-y-3">
              <label htmlFor="property_name" className="text-xl font-medium">
                What's your property name?
              </label>
              <input
                name="propertyName"
                type="text"
                placeholder="eg. Hotel in Shinjuku near station"
                className="w-full p-4 text-xl border border-gray-400 rounded-lg outline-none focus:border-primary"
                value={formik.values.propertyName}
                onChange={formik.handleChange}
              />
            </div>
            {/* PROPERTY TYPE */}
            <div>
              <CreatePropertyType
                value={formik.values.propertyType}
                setValue={formik.handleChange}
              />
            </div>
            {/* PROPERTY LOCATION */}
            <div className="mb-4 border-b p-9">
              <label
                htmlFor="property_location"
                className="text-lg font-medium"
              >
                Where is your property located?
              </label>
              <div className="flex flex-col w-full p-9 gap-x-3 gap-y-3">
                <div className="flex flex-col md:flex-row gap-x-4 gap-y-3">
                  <Input
                    id="district"
                    name="district"
                    label="District"
                    type="text"
                    onChange={(value) => handleInputChange("district", value)}
                  />
                  <Input
                    id="city"
                    name="city"
                    label="City"
                    type="text"
                    onChange={(value) => handleInputChange("city", value)}
                  />
                  <Input
                    id="province"
                    name="province"
                    label="Province"
                    type="text"
                    onChange={(value) => handleInputChange("province", value)}
                  />
                </div>
                <div className="flex flex-col gap-x-4 w-[100%] gap-y-3 md:flex-row">
                  <Input
                    name="streetAddress"
                    label="Street Address"
                    type="text"
                    className={"md:w-[54.7vw]"}
                    onChange={(value) =>
                      handleInputChange("streetAddress", value)
                    }
                  />
                  <Input
                    name="postalCode"
                    label="Postal Code"
                    className=""
                    type="number"
                    onChange={(value) => handleInputChange("postalCode", value)}
                  />
                </div>
              </div>
            </div>
            {/* PROPERTY IMAGES */}
            <div className="p-9">
              <ImageUploader
                images={images}
                onUpdateFormData={handleImageUpdate}
              />
            </div>
            {/* PROPERTY COUNT */}
            <div className="p-9">
              <h1 className="mb-2 text-lg font-medium">
                How many guests can stay here?
              </h1>
              <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:grid-rows-2">
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span>Guests:</span>
                  <div className="w-7 md:w-96" />
                  <button onClick={() => handleDecrement("maxGuestCount")}>
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.maxGuestCount}</span>
                  <button onClick={() => handleIncrement("maxGuestCount")}>
                    <CiCirclePlus size={25} />
                  </button>
                </div>
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span>Bedrooms:</span>
                  <div className="w-0 md:w-96" />
                  <button onClick={() => handleDecrement("bedroomCount")}>
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.bedroomCount}</span>
                  <button onClick={() => handleIncrement("bedroomCount")}>
                    <CiCirclePlus size={25} />
                  </button>
                </div>
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span className="pr-4">Beds:</span>
                  <div className="w-7 md:w-96" />
                  <button onClick={() => handleDecrement("bedCount")}>
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.bedCount}</span>
                  <button onClick={() => handleIncrement("bedCount")}>
                    <CiCirclePlus size={25} />
                  </button>
                </div>
                <div className="flex flex-row justify-between w-full p-3 border-2 rounded-md">
                  <span>Bathrooms:</span>
                  <div className="w-0 md:w-96" />
                  <button onClick={() => handleDecrement("bathroomCount")}>
                    <CiCircleMinus size={25} />
                  </button>
                  <span className="w-0">{formik.values.bathroomCount}</span>
                  <button onClick={() => handleIncrement("bathroomCount")}>
                    <CiCirclePlus size={25} />
                  </button>
                </div>
              </div>
            </div>
            {/* PROERTY AMENITIES */}
            <div className="flex flex-col border-b-2 p-9">
              <CreateCategoryAmenities />
            </div>
            {/* PROPERTY DESCRIPTION */}
            <div className="flex flex-col border-b-2 p-9">
              <label htmlFor="DESCRIPTION" className="text-lg font-medium">
                Tell us more about your property
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="3"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
            {/* PROPERTY RULES */}
            <div className="flex flex-col border-b-2 p-9">
              <PropertyRules
                propertyRules={propertyRules}
                setPropertyRules={setPropertyRules}
              />
            </div>
            {/* PROPERTY PRICE */}
            <div className="flex flex-col border-b-2 p-9">
              <Input
                className={"appearance-none"}
                id="price"
                name="price"
                label="Price /night (IDR)"
                type="number"
                onChange={(value) => handleInputChange("price", value)}
              />
            </div>
            <button
              className="w-full p-4 text-white rounded-md bg-primary"
              type="submit"
            >
              Create new property
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateProperty;
