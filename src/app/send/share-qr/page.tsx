"use client";

import { QRCode } from "@/constants/svg";
import { ArrowLeft, Copy, Scan } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

const ShareQr = () => {
  return (
    <section className="home-background flex flex-col p-5 xl:px-[200px] ">
      <div className="flex justify-between">
        <ArrowLeft size={24} color="#ffffff" />
        <h3 className="text-white text-lg">Share QR</h3>
        <span></span>
      </div>
      <div className="flex flex-col items-center mt-10">
        <h5 className="text-xl text-white">scan to Receive</h5>
      </div>
      <div className="flex justify-center">
        <Image src={QRCode} alt="" />
      </div>
      <form className="mt-10">
        <span className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-[#909090] p-1">
            Copy Wallet Address
          </label>
          <span className="border border-[#642CDC] rounded-lg p-4 bg-[#0B0811] text-white text-sm flex justify-between ">
            <button>0xbb0f...17c8</button>
            <Copy size={24} color="#ffffff" />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-[#909090] p-1">
            Copy Phone Address
          </label>
          <span className="border border-[#642CDC] rounded-lg p-4 bg-[#0B0811] text-white text-sm flex justify-between ">
            <button>0xbb0f...17c8</button>
            <Copy size={24} color="#ffffff" />
          </span>
        </span>
        <button className="bg-white font-bold text-lg p-3 rounded-xl w-full mt-5">
          Continue
        </button>
      </form>
    </section>
  );
};

export default ShareQr;
