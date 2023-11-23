// import React, { useState } from "react";
// import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

// const CreatePropertyCount = ({ count, onChange, formik }) => {
//   const handleIncrement = (property) => {
//     const newCount = {
//       ...count,
//       [property]: count[property] + 1,
//     };
//     onChange(newCount);

//     console.log("formik.values before:", formik.values);

//     // Ensure formik.values is initialized
//     formik.setFieldValue(property, newCount[property]);

//     console.log("formik.values after:", formik.values);
//   };

//   const handleDecrement = (property) => {
//     const newCount = {
//       ...count,
//       [property]: Math.max(count[property] - 1, 0),
//     };
//     onChange(newCount);

//     console.log("formik.values before:", formik.values);

//     // Ensure formik.values is initialized
//     formik.setFieldValue(property, newCount[property]);

//     console.log("formik.values after:", formik.values);
//   };

//   return (

//   );
// };

// export default CreatePropertyCount;

import React from "react";

const CreatePropertyCount = () => {
  return <div>CreatePropertyCount</div>;
};

export default CreatePropertyCount;
