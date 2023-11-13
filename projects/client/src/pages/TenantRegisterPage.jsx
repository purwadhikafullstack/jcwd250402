import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Dropzone } from "../components";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { Formik, Form } from "formik";
import logo from "../asset/Logo-Black.svg";

// not yet functional
const TenantRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // Add any validation logic if needed
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleSubmit = () => {
    // Add submit logic here
    console.log("Form submitted:", formData);
  };

  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <div>
      <div className="flex p-0 mt-7 mx-14">
        <img src={logo} alt="logo" width={220} height={220} />
      </div>
      <div className="flex flex-col items-center justify-center h-max">
        <Formik>
          <Form className="flex flex-col h-[40vh] w-[40vw] md:mt-[120px] p-12 ">
            {step === 1 && (
              <>
                <h1 className="mb-4 text-2xl">
                  Let's start with something easy
                </h1>
                {/* <label htmlFor="name" className="mb-2">
              Name
            </label> */}
                <Input
                  label={"Tell us your name"}
                  id="name"
                  type="text"
                  placeholder="Tell us your name"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                  required={true}
                />
                {/* <Dropzone label={"What you look like"} /> */}
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="mb-4 text-2xl">
                  Something you'll need to log in
                </h1>
                <Input
                  label={"Pick a username"}
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                  required={true}
                />
                <Input
                  label={"What's your email?"}
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                  required={true}
                />
                <Input
                  label={"Pick your secret key"}
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                  required={true}
                />
                <Input
                  label={"Confirm your secret key"}
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className="w-full px-3 py-2 mb-4 border-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                  required={true}
                />
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <h1 className="mb-4 text-2xl">About You</h1>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <DatePicker
                      id="dob"
                      name="dateofbirth"
                      onChange={() => {}}
                      onBlur={() => {}}
                      selected={new Date()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                      disabled={false} // Pass a boolean value
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                      disabled={false}
                      required
                      onChange={() => {}}
                      onBlur={() => {}}
                      value={() => {}}
                      name="gender"
                    >
                      <option value="" disabled selected>
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Rather not say</option>
                    </select>
                  </div>
                  <Dropzone label={"Profile Picture"} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h1 className="mb-4 text-2xl">Proof of Identification </h1>
                <Dropzone />
              </>
            )}
          </Form>
        </Formik>

        <div className="absolute bottom-0 left-0 w-full mb-4">
          <div className="h-2 mb-4 bg-gray-200 rounded">
            <div
              className="w-full h-full bg-black"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div>
            {step === 1 ? (
              <button
                className="px-6 py-2 mr-2 border-2 rounded-lg cursor-not-allowed text-neutral-500"
                disabled
                onClick={handlePrev}
              >
                Back
              </button>
            ) : (
              <button
                className="px-6 py-2 mr-2 border-2 rounded-lg text-neutral-500"
                onClick={handlePrev}
              >
                Back
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 mb-4 mr-4">
          <div>
            {step !== 4 ? (
              <button
                className="px-6 py-2 text-white rounded-lg bg-primary hover:bg-primary/70 "
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="px-6 py-2 text-white rounded-lg bg-primary hover:bg-primary/70 "
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRegisterPage;
