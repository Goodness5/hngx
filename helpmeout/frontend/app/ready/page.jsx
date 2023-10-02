"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Copy, ArrowDown2 } from "iconsax-react";

const Ready = () => {
  return (
    <>
      <Navbar />
      <div className=" md:flex px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] min-h-[80dvh] py-10">
        <div className=" w-full md:w-1/2">
          <p className=" font-sora font-bold text-4xl">Your video is ready</p>

          <div className="py-16">
            <p className=" font-medium pb-[12px] text-[#727272]">Name</p>
            <input
              type="text"
              // onChange={handleChange}
              // name="password"
              // value={password}

              className=" w-full outline-none rounded-xl font-sora text-2xl font-semibold"
            />
          </div>

          <div className=" relative w-full">
            <input
              type="email"
              // onChange={handleChange}
              // name="password"
              // value={password}

              placeholder="Enter email of receiver"
              className=" w-full bg-[#B6B3C633] outline-none pl-3 rounded-xl h-[68px] font-workSans font-medium relative"
            />
            <button className=" absolute bg-[#605C84] outline-none text-white px-5 py-3 rounded-lg right-[10px] top-[10px] ">
              Send
            </button>
          </div>

          <div className=" pt-16">
            <p className=" font-semibold pb-[12px] font-sora">Video URL</p>
            <div className=" relative">
              <input
                type="email"
                // onChange={handleChange}
                // name="password"
                // value={password}

                placeholder="Enter your email address"
                className=" w-full border bg-[#FAFAFA] border-[#929292] outline-none pl-3 rounded-xl h-[68px] font-workSans font-medium relative"
              />
              <button className=" absolute outline-none border border-[#120B48] text-[#120B48] px-2 py-3 rounded-lg right-[10px] top-[10px] flex items-center gap-2">
                <Copy size="18" color="#120B48" className=" rotate-90" />
                Copy
              </button>
            </div>
          </div>

          <div className=" pt-10">
            <p className=" font-semibold pb-[12px] font-sora">
              Share your video
            </p>
            <div className=" flex flex-col lg:flex-row gap-3">
              <button className=" flex border border-[#0A0628] outline-none py-2 px-3 rounded-md gap-2">
                <img src="/Facebook.svg" alt="" />
                Facebook
              </button>
              <button className=" flex border border-[#0A0628] outline-none p-2 rounded-md gap-2">
                <img src="/whatsapp.svg" alt="" />
                Whatsapp
              </button>
              <button className=" flex border border-[#0A0628] outline-none p-2 rounded-md gap-2">
                <img src="/telegram.svg" alt="" />
                Telegram
              </button>
            </div>
          </div>
        </div>

        <div className=" hidden md:block h-auto w-[1px] bg-[#BBBBBB] ml-[25px] mr-[25px] lg:ml-[72px] lg:mr-[40px]"></div>

        <div className=" w-full md:w-1/2 mt-8 md:mt-0">
          <div>
            <img src="/video.png" alt="" />
          </div>

          <p className=" font-sora text-2xl font-semibold pt-12 pb-3">
            Transcript
          </p>

          <select className="border border-[#CFCFCF] text-[#CFCFCF] outline-none w-32 px-2 py-1 rounded-sm">
            <option value="english">English</option>
            <option value="yoruba">Yoruba</option>
            <option value="hausa">Hausa</option>
            <option value="igbo">Igbo</option>
          </select>

          <div className=" h-48 overflow-y-scroll mt-8 pr-5">
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
            <div className=" flex gap-5 pb-4">
              <p className=" flex-1">0.01</p>
              <p>
                First step. Open Facebook on your desktop or mobile device and
                locate &quot;Marketplace&quot; in the left-hand menu or at the
                top of the
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ready;
