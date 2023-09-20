import React from 'react';
import ReactLoading from "react-loading";

const CustomLoading = () => {
  return (
    <div className="flex w-ful top-0 left-0 right-0 items-center justify-center">
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
