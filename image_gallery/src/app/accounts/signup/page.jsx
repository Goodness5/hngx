"use client";
import { useState } from "react";
import { signupUser } from "../../api/index";
import Themetoggler from '../../components/themetoggler'
import { useTheme } from "next-themes";
import Link from "next/link";

const SignupForm = () => {
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
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await signupUser(
        formData.username,
        formData.email,
        formData.password
      );

      setSuccessMessage(response.message);
      console.log(response);
      if (response.error) {
        const errormsg = response.error;
        if (errormsg.includes("Username")) {
          console.log("Username error");
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("Email")) {
          console.log("Email error");
          setErrors({ ...errors, email: "Email is already in use" });
        }
      }
      setSuccessMessage("");
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
    }

    console.log(errors);
  };

  return (
    <div className="flex flex-col relative h-screen">
      <div
        className={`flex w-full justify-between ${
          theme === "dark" ? "bg-[#686666]" : "bg-[#fff]"
        }`}
      >
        <div className="w-[50%] p-8 px-16">
          <div className="flex justify-end w-full">
            <Themetoggler />
          </div>
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
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-4 ${
                theme === "dark" ? "border-darkred" : "border-lightred"
              } border`}
            >
              Sign Up
            </button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
          <div className="flex mt-4 gap-6 font-semibold">
            <p className="">Already have an account?</p> <Link href="/accounts/login" className={`${
                theme === "dark" ? "text-[#553cf7]" : "text-[#110c30]"}`}>Login</Link>
          </div>
          </form>

        </div>
        <div
          className={`img w-full bg-yellow-300 relative min-h-screen ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <img
            src="/accountsbg.jpeg"
            alt=""
            className="w-full h-full bg-cover"
          />
         <p className="absolute top-1/2 text-white text-center font-extrabold text-[4em]">All Your Memories In One Place !</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
