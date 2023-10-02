import React from "react";

const Footer = () => {
  return (
    <div className=" bg-[#120B48] text-white ">
      <div className=" flex flex-col md:flex-row gap-8 justify-between px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] py-24">
        <div>
          <img className=" " src="/logo-white.svg" />
        </div>

        <div className=" flex flex-col gap-4 font-sora">
          <p className=" font-semibold">Menu</p>
          <p>Home</p>
          <p>Converter</p>
          <p>How it Works</p>
        </div>

        <div className=" flex flex-col gap-4 font-sora">
          <p className=" font-semibold">About us</p>
          <p>About</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
        </div>

        <div className=" flex flex-col gap-4 font-sora">
          <p className=" font-semibold">Screen Record</p>
          <p>Browser Window</p>
          <p>Desktop</p>
          <p>Application</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
