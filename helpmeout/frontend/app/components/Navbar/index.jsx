import Image from "next/image";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div className=" flex font-medium justify-between items-center px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] py-7">
      <Image
        className="relative cursor-pointer"
        src="/logo.svg"
        alt="Help me out logo"
        width={120}
        height={25}
        priority
      />

      <div className=" hidden md:flex gap-10 ">
        <p className=" ">Features</p>
        <p>How It Works</p>
      </div>

      <div className=" hidden md:block">
        <Button>
          <Link href="/signup">
            <p className=" py-4 px-10"> Get Started</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
