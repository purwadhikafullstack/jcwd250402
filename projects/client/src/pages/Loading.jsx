import React from "react";
import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div>
        Loading...
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
