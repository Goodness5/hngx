"use client";
// LoginForm.js

import { useState } from "react";
// import { loginUser } from "../../api/index";
import Themetoggler from "../../components/themetoggler";
import { useTheme } from "next-themes";
import Link from "next/link";
import ReactLoading from "react-loading";
import axios from "axios";


const LoginForm = () => {



  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { theme, setTheme } = useTheme('dark');
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { username: "", password: "" };

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      // Use Axios for making the HTTP request
      const response = await axios.post('https://ctfapi.onrender.com/login', {
        username: formData.username,
        password: formData.password,
      });

      setSuccessMessage(response.data.message);

      if (response.data.message) {
        window.location.href = "/dashboard";
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.user.username);
        sessionStorage.setItem("email", response.data.user.email);
      }

      if (response.data.error) {
        const errormsg = response.data.error;
        if (errormsg.includes("username")) {
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("password")) {
          setErrors({ ...errors, password: errormsg });
        }
      }

    } catch (error) {
      console.error("the error",error);
      // setLoading(false);
      if (error.response.data.error) {
        setLoading(false);
        const errormsg = error.response.data.error;
        console.log('caught...',errormsg)
        if (errormsg.includes("username")) {
          setLoading(false);
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("email")) {
        setLoading(false);
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("password")) {
          setLoading(false);
          setErrors({ ...errors, password: errormsg });
        }
      }
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      

    <div
        className={`flex w-full flex-col sm:flex-row gap-8 justify-between ${
          theme === "dark" ? "bg-[#686666]" : "bg-[#fff]"
        }`}
    >
      <div className="sm:w-[60%] flex flex-col px-8 w-full sm:px-16">
        <div className="flex justify-end w-full px-2">
          <Themetoggler />
        </div>
        <p className="font-semibold px-2 text-lg mb-8">Login to access the Gallery</p>
        <form
          onSubmit={handleSubmit}
          className={`w-full m-auto border gap-8 rounded-lg shadow-md ${
            theme === "dark" ? "" : ""
          } px-8 py-6 flex flex-col`}
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="username"
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="user@example.com OR mentor"
              className={`py-2 px-4 rounded-xl bg-transparent ${
                theme === "dark"
                  ? "text-white border-[#7e7e7e]"
                  : "border-[#0f0f0f] text-black"
              } border focus:outline-none ${
                errors.username && "border-red-500"
              }`}
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
            />
            {errors.username && (
              <div className="text-red-500">{errors.username}</div>
            )}
          </div>
          <div
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } flex flex-col`}
          >
            <label
              htmlFor="password"
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="1Password"
              id="password"
              value={formData.password}
              className={`py-2 px-4 rounded-xl bg-transparent ${
                theme === "dark"
                  ? "text-white border-[#7e7e7e]"
                  : "border-[#0f0f0f] text-black"
              } border focus:outline-none ${
                errors.password && "border-red-500"
              }`}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`bg-[#7c171f] hover:bg-red-700 text-white font-bold border py-2 px-4 rounded-xl mt-4 ${
              theme === "dark" ? "border-[#ff9ca4]" : "border-[#fc3e4e]"
            } border`}
          >
            {loading ?  <ReactLoading
                  type={"spinningBubbles"}
                  color={"#ffffff"}
                  height={40}
                  width={40}
                  className="m-auto flex w-full"
                /> : 'Login'}
          </button>
          {successMessage && (
            <div className="border border-[#06bb2d] w-fit m-auto  p-2 rounded-lg text-[1.2em] text-green-400">{successMessage}</div>
          )}

<div className="flex mt-4 gap-6 font-semibold  w-full">
<p className={`${
                theme === "dark" ? "text-[#ffffff]" : "text-[#000000]"} w-full gap-4 justify-between flex-wrap`}>Don't have an account? <Link href="/accounts/signup" className={`${
                theme === "dark" ? "text-[#c4beee]" : "text-[#1d1553]"} font-bold text-lg flex-wrap`}>SignUp</Link></p>
          </div>
        </form>
      </div>
      <div
  className={`w-full flex items-center overflow-hidden text-center h-screen ${
    theme === "dark" ? "text-white" : "text-black"
  }`}
  style={{
    backgroundImage: `url('/accountsbg.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <p className="m-auto text-white font-extrabold text-center text-[4em]">
    All Your Memories In One Place !
  </p>
</div>

    </div>
    </div>
  );
};

export default LoginForm;
