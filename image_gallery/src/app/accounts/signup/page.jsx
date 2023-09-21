"use client";
import { useState } from "react";
// import { signupUser } from "../../api/index";
import Themetoggler from '../../components/themetoggler'
import { useTheme } from "next-themes";
import Link from "next/link";
import ReactLoading from "react-loading";
import axios from "axios";


const SignupForm = () => {

  // const signupUser = async (username, email, password) => {
  //   const BASE_URL = 'http://127.0.0.1:5000';
  
  //   const response = await fetch(`${BASE_URL}/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, email, password }),
  //   });
  
  //   // if (response.ok) {
  //     return response.json();
  //   // } else {
  //   //   throw new Error('Signup failed');
  //   // }
  // };
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { theme, setTheme } = useTheme('dark');
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { username: "", email: "", password: "" };

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "email is required";
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
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log('res::::', response)
      setSuccessMessage(response.data.message);

      if (response.data.message) {
        window.location.href = "/accounts/login";
     
      }

      if (response.data.error) {
        const errormsg = response.data.error;
        if (errormsg.includes("username")) {
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("email")) {
          setErrors({ ...errors, email: errormsg });
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
        if (errormsg.includes("Username")) {
          setLoading(false);
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("Email")) {
        setLoading(false);
          setErrors({ ...errors, email: errormsg });
        }
        if (errormsg.includes("Password")) {
          setLoading(false);
          setErrors({ ...errors, password: errormsg });
        }
      }
    } 
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col relative w-full  h-full">
      <div
        className={`flex w-full h-full flex-col sm:flex-row justify-between ${
          theme === "dark" ? "bg-[#686666]" : "bg-[#fff]"
        }`}
      >
        <div className="sm:w-[60%] w-full p-8 sm:px-16">
          <div className="flex justify-end w-full">
            <Themetoggler />
          </div>
          <p className="font-semibold text-xl mb-8">Sign Up In Less Than a Minute</p>
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
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`py-2 px-4 rounded-xl bg-transparent ${
                  theme === "dark"
                    ? "text-white border-[#7e7e7e]"
                    : "border-[#0f0f0f] text-black"
                } border focus:outline-none ${
                  errors.email && "border-red-500"
                }`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
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
                /> : 'Signup'}
            </button>
            {successMessage && (
              <div className="border border-[#06bb2d] w-fit m-auto  p-2 rounded-lg text-[1.2em] text-green-400">{successMessage}</div>
            )}
          <div className="flex mt-4 gap-6 font-semibold  w-full">
            <p className={`${
                theme === "dark" ? "text-[#ffffff]" : "text-[#000000]"} w-full gap-4 justify-between flex-wrap`}>Already have an account? <Link href="/accounts/login" className={`${
                theme === "dark" ? "text-[#c4beee]" : "text-[#1d1553]"} font-bold text-lg flex-wrap`}>Login</Link></p>
          </div>
          </form>

        </div>
        <div
  className={`w-full flex items-center text-center h-screen ${
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

export default SignupForm;
