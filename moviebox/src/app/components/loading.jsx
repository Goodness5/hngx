import React from 'react';
import { TailSpin } from 'react-loading';
import ReactLoading from "react-loading";

const CustomLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ReactLoading
                  type={"spinningBubbles"}
                  color={"#BE123C"}
                  height={100}
                  width={100}
                  className="m-auto flex w-full"
                />
    </div>
  );
};

export default CustomLoading;
