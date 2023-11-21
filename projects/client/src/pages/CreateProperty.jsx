import React from "react";
import { Formik, Form } from "formik";
import Input from "../components/inputs/Input";
import { BsHouseDoor } from "react-icons/bs";

const CreateProperty = () => {
  const [active, setActive] = React.useState(false);
  const activeHandler = () => {
    setActive(true);
  };
  return (
    <div className="flex flex-col">
      <Formik>
        <Form>
          {/* PROPERTY NAME */}
          <div className="flex flex-col border-b p-9 gap-y-3">
            <label htmlFor="property_name" className="text-lg font-medium">
              What's your property name?
            </label>
            <input
              name="property_name"
              type="text"
              placeholder="eg. Hotel in Shinjuku near station"
              className="w-full p-2 border border-gray-400 rounded-lg outline-none focus:border-primary"
            />
          </div>
          {/* PROPERTY TYPE */}
          <div className="flex flex-col mt-4 border-b p-9 gap-y-3">
            <label htmlFor="property_type" className="text-lg font-medium">
              Which of these categories best describe your property
            </label>
            <div className="flex gap-x-4">
              <div
                onClick={activeHandler}
                className={`items-start p-8 border-2 border-black rounded-lg ${
                  active
                    ? "border-primary bg-primary/20"
                    : "border-black bg-white"
                }`}
              >
                <BsHouseDoor size={30} />
                <span>House</span>
              </div>
              <div
                onClick={activeHandler}
                className={`items-start p-8 border-2 border-black rounded-lg ${
                  active
                    ? "border-primary bg-primary/20"
                    : "border-black bg-white"
                }`}
              >
                <BsHouseDoor size={30} />
                <span>House</span>
              </div>
              <div
                onClick={activeHandler}
                className={`items-start p-8 border-2 border-black rounded-lg ${
                  active
                    ? "border-primary bg-primary/20"
                    : "border-black bg-white"
                }`}
              >
                <BsHouseDoor size={30} />
                <span>House</span>
              </div>
              <div
                onClick={activeHandler}
                className={`items-start p-8 border-2 border-black rounded-lg ${
                  active
                    ? "border-primary bg-primary/20"
                    : "border-black bg-white"
                }`}
              >
                <BsHouseDoor size={30} />
                <span>House</span>
              </div>
            </div>
          </div>
          {/* PROPERTY LOCATION */}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProperty;
