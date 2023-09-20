"use client";
// LoginForm.js

import { useState } from "react";
// import { loginUser } from "../../api/index";
import Themetoggler from "../../components/themetoggler";
import { useTheme } from "next-themes";
import Link from "next/link";
import ReactLoading from "react-loading";


const LoginForm = () => {

  const loginUser = async (username, password) => {
    const BASE_URL = 'https://ctfapi.onrender.com';
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
    
      if (response.ok) {
        
      }
        return response.json();
      // } else {
      //   throw new Error('Login failed');
      // }
    };

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { theme, setTheme } = useTheme("dark");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
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
      const response = await loginUser(formData.username, formData.password);

      setSuccessMessage(response.message);

      if (response.message) {
        window.location.href = "/dashboard";
        setLoading(false)
        console.log(response);
        sessionStorage.setItem("token", response.token);
        
        sessionStorage.setItem("username", response.user.username);
        sessionStorage.setItem("email", response.user.email);
      }

      if (response) {
        const errormsg = response.error;
        setLoading(false)
        
        if (errormsg.includes("username")) {
          
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("password")) {
          
          setErrors({ ...errors, password: errormsg });
        }
        setLoading(false)
      }
      
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setLoading(false)
    }
    console.log(errors);
  };

  return (
    <div className="flex flex-col">
      

    <div
      className={`sm:flex-row-reverse flex-col flex w-full justify-between ${
        theme === "dark" ? "bg-[#686666]" : "bg-[#fff]"
      }`}
    >
      <div className="sm:w-[50%] w-full p-8 px-16">
        <div className="flex justify-end w-full">
          <Themetoggler />
        </div>
        <p className="font-semibold text-lg mb-8">Login to access the Gallery</p>
        <form
          onSubmit={handleSubmit}
          className={`w-full m-auto border gap-8 rounded-lg shadow-md ${
            theme === "dark" ? "border-darkred" : "border-lightred"
          } px-8 py-6 flex flex-col`}
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
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
            className={`bg-[#7c171f] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-4 ${
              theme === "dark" ? "border-darkred" : "border-lightred"
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

          <div className="flex mt-4 gap-6 font-semibold">
            <p className="mr-2">Don't have an account?</p>
            <Link
              href="/accounts/signup"
              className={`${
                theme === "dark" ? "text-[#553cf7]" : "text-[#110c30]"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div
        className={`img w-full relative h-screen ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <img src="/accountsbg.jpeg" alt="" className="w-full h-full bg-cover" />
        <p className="absolute top-1/2 text-white font-extrabold text-center text-[4em]">
          All Your Memories In One Place !
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
