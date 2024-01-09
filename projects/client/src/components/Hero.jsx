import React from "react";
import bg from "../asset/hero2.jpg";
import Search from "./Navbar/Search";

const Hero = () => {
  return (
    <div
      id="hero_section"
      className="relative flex flex-col items-center justify-center w-full bg-center bg-cover h-[50vh] md:justify-center md:flex md:flex-col md:h-[50vh] md:bg-cover md:bg-center md:bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="z-10 flex flex-col mx-8 text-center text-white md:text-left md:mx-0 md:w-1/2 md:pl-8">
        <h1 className="mb-2 text-4xl font-extrabold md:text-6xl">
          Discover Your Perfect Space
        </h1>
        <p className="hidden mb-8 text-xl leading-relaxed md:block md:text-2xl">
          Find the best place to stay, from the most luxurious to the most
          affordable.
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <Search />
      </div>
    </div>
  );
};

export default Hero;
