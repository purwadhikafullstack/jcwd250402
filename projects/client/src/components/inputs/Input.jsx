import React from "react";
import { BiDollar } from "react-icons/bi";
import { useFormik } from "formik";

const Input = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  errors,
  register,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute text-neutral-700 top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        register={useFormik}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-primary" : "border-neutral-300"}
        ${errors[id] ? "focus:border-primary" : "focus:border-black"}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        }
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-red-500" : "text-zinc-400"}'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
