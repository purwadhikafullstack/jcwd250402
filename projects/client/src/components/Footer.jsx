import React from "react";

const Footer = () => {
  return (
    <div className="static bottom-0 left-0 right-0 p-3 border ">
      <div className="container flex flex-row items-center justify-between">
        <div className="ml-4 text-sm text-neutral-900">© 2023 Nginapp</div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-sm text-neutral-500">Privacy</div>
          <div className="text-sm text-neutral-500">Terms</div>
          <div className="text-sm text-neutral-500">Sitemap</div>
          <div className="text-sm text-neutral-500">Company Details</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
