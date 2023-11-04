import React from "react";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "",
  },
];

const Categories = () => {
  return (
    <div className="container">
      <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
