import React from "react";

const MenuItem = (props) => {
  return (
    <div
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
};

export default MenuItem;
