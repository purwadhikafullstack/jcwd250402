import React from "react";

const CategoryBox = ({ icon: Icon, label, selected }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 transition border-b-2 cursor-pointer hover:text-neutral-800
      ${selected ? "border-b-neutral=800" : "border-b-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
