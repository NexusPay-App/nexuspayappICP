"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const router = useRouter();

  const handleNavigate = () => {
    event?.preventDefault();
    router.replace("/login");
  };

  return (
    <section className="app-background">
      <article className="">
        <h2 className="text-4xl text-white font-bold">Sign Up to NexusPay</h2>
        <h4 className="text-white my-5">
          Enter your Details to SignUp to NexusPay
        </h4>
        <form onSubmit={() => handleNavigate()}>
          <span className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-[#909090] p-1 text-sm mt-4"
            >
              First Name
            </label>
            <input
              type="number"
              placeholder="Enter your First Name"
              className="p-3 rounded-full text-sm"
            />
          </span>
          <span className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-[#909090] p-1 text-sm mt-4"
            >
              Last Name
            </label>
            <input
              type="number"
              placeholder="Enter your Last Name"
              className="p-3 rounded-full text-sm"
            />
          </span>
          <span className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-[#909090] p-1 text-sm mt-4"
            >
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              className="p-3 rounded-full text-sm"
            />
          </span>
          <span className="flex flex-col mt-5">
            <label
              htmlFor="password"
              className="text-[#909090] p-1 text-sm mt-4"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="p-3 rounded-full text-sm"
            />
          </span>
          <span className="flex justify-end mb-5">
            <h5 className="text-[#909090] p-1 text-sm mt-4 font-semibold">
              Forgot Password?
            </h5>
          </span>
          <input
            type="submit"
            value="Connect"
            className="bg-white p-3 rounded-full font-bold w-full cursor-pointer"
          />
        </form>
      </article>
    </section>
  );
};

export default Signup;
