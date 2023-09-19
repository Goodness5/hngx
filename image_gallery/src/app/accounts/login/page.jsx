"use client";
// LoginForm.js

import { useState } from "react";
import { loginUser } from "../../api/index";
import Themetoggler from "../../components/themetoggler";
import { useTheme } from "next-themes";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { theme, setTheme } = useTheme("dark");
  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await loginUser(formData.username, formData.password);

      setSuccessMessage(response.message);

      if (response.message) {
        window.location.href = "/dashboard";
        console.log(response);
        sessionStorage.setItem("token", response.token);
        console.log("res:::::", response);
        sessionStorage.setItem("username", response.user.username);
        sessionStorage.setItem("email", response.user.email);
      }

      if (response) {
        const errormsg = response.error;
        console.log(errormsg, "eroooooorrr");
        if (errormsg.includes("username")) {
          console.log("setting errror...");
          setErrors({ ...errors, username: errormsg });
        }
        if (errormsg.includes("password")) {
          console.log("setting errror...");
          setErrors({ ...errors, password: errormsg });
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
    <div
      className={`flex-row-reverse flex w-full justify-between ${
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
            Login
          </button>
          {successMessage && (
            <div style={{ color: "green" }}>{successMessage}</div>
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
        className={`img w-full relative min-h-screen ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <img src="/accountsbg.jpeg" alt="" className="w-full h-full bg-cover" />
        <p className="absolute top-1/2 text-white font-extrabold text-center text-[4em]">
          All Your Memories In One Place !
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
