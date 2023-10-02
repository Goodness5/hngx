import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] py-14 ">
      <div>
        <Image
          className="relative cursor-pointer pb-10"
          src="/logo.svg"
          alt="Help me out logo"
          width={120}
          height={25}
          priority
        />
      </div>

      <div className=" w-full md:w-[475px] mx-auto">
        <h1 className=" font-inter text-center text-3xl font-bold pb-[12px]">
          Log in or Sign up
        </h1>
        <p className="text-center w-[80%] mx-auto font-inter pb-[32px]">
          Join millions of others in sharing successful moves on{" "}
          <span className=" font-workSans">HelpMeOut.</span>
        </p>

        <Button
          variant="outline"
          colorScheme="black"
          className=" border border-[#141414] font-inter font-medium py-2 text-black h-[48px] rounded-xl w-full "
        >
          <img src="/Google.svg" />
          <p className=" pl-3">Continue with Google</p>
        </Button>

        <Button
          variant="outline"
          colorScheme="black"
          className=" border border-[#141414] font-inter font-medium py-2 text-black h-[48px] rounded-xl w-full mt-[24px]"
        >
          <img src="/Facebook.svg" />
          <p className=" pl-3">Continue with Google</p>
        </Button>

        <div className=" flex items-center px-4 py-[32px]">
          <div className=" h-[1px] w-full bg-[#B9C2C8]"></div>
          <p className=" text-[#B9C2C8] mx-2">or</p>
          <div className=" h-[1px] w-full bg-[#B9C2C8]"></div>
        </div>

        <div className="">
          <Text className=" font-medium pb-[12px]">Email</Text>
          <input
            type="email"
            // onChange={handleChange}
            // name="password"
            // value={password}

            placeholder="Enter your email address"
            className=" w-full border border-[#626262] outline-none pl-3 rounded-xl h-[51px] font-workSans font-medium"
          />
        </div>
        <div className="pt-[16px]">
          <Text className=" font-medium pb-[12px]">Password</Text>
          <input
            type="password"
            // onChange={handleChange}
            // name="password"
            // value={password}

            placeholder="Enter your password"
            className=" w-full border border-[#626262] outline-none pl-3 rounded-xl h-[51px] font-workSans font-medium"
          />
        </div>

        <Button
          // isLoading={isLoading}
          // loadingText="Logging in..."
          type="submit"
          className=" bg-[#120B48] text-white rounded-lg w-full py-3 h-[53px] mt-8"
          variant="solid"
          colorScheme="black"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
