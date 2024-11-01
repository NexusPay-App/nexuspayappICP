"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowsDownUp,
  ArrowsLeftRight,
  Scan,
} from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBalance } from "@/context/BalanceContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieSuccess from "../../../public/json/success.json";

const Send = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [conversionRate, setConversionRate] = useState(1); // Default to 1 for direct 1-to-1 conversion if not fetched
  const [currency, setCurrency] = useState("usdc");
  const [equivalentAmount, setEquivalentAmount] = useState("");
  const [wallet, setWallet] = useState();
  const { balance, loading } = useBalance(); // Use the useBalance hook to get balance and loading state
  const [openSuccess, setOpenSuccess] = useState(false); // Opens the Success Dialog

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/usdc/conversionrate"
        );
        const data = await response.json();
        setConversionRate(data.rate);
      } catch (error) {
        console.error("Failed to fetch conversion rate:", error);
      }
    };

    const user = localStorage.getItem("user"); // Retrieves a string
    const userObject = JSON.parse(user ?? ""); // Parses the string back into an object
    console.log(userObject.walletAddress); // Now you can safely access phoneNumber
    setWallet(userObject.walletAddress);

    fetchConversionRate();
  }, []);

  // Watch for changes in the amount input to dynamically display the converted amount
  const amount = watch("amount");

  // useEffect(() => {
  //   if (!amount) setEquivalentAmount('');
  //   else {
  //     const convertedAmount = currency === 'usdc' ? amount / conversionRate : amount * conversionRate;
  //     setEquivalentAmount(`${convertedAmount.toFixed(2)} ${currency === 'usdc' ? 'KSH' : 'USDC'}`);
  //   }
  // }, [amount, currency, conversionRate]);

  useEffect(() => {
    if (!amount) setEquivalentAmount("");
    else {
      // If the user is inputting KSH, convert to USDC by dividing by the rate
      // If the user is inputting USDC, convert to KSH by multiplying by the rate
      const convertedAmount =
        currency === "ksh"
          ? parseFloat(amount) / conversionRate
          : parseFloat(amount) * conversionRate;
      setEquivalentAmount(
        `${convertedAmount.toFixed(2)} ${currency === "usdc" ? "KSH" : "USDC"}`
      );
    }
  }, [amount, currency, conversionRate]);

  const finalAmount =
    currency === "ksh"
      ? parseFloat(amount) / conversionRate
      : parseFloat(amount);

  const onSubmit = async (data: any) => {
    // Use the converted amount if the selected currency is KSH
    // const finalAmount = currency === 'ksh' ? parseFloat(amount) * conversionRate : parseFloat(amount);

    const apiUrl = "http://localhost:8000/api/token/sendToken";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenAddress: "0xEE49EA567f79e280E4F1602eb8e6479d1Fb9c8C8",
          recipientIdentifier: data.phoneNumber,
          amount: finalAmount,
          senderAddress: wallet, // Assuming you have a way to input or fetch the wallet address
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      console.log("Success:", result);
      // Additional success handling
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      // Error handling
    }
  };

  return (
    <section className="home-background h-screen flex flex-col p-5 xl:px-[200px]">
      {/* UI elements remain unchanged */}
      <div className="flex justify-between">
        <span className="flex flex-col items-center w-full">
          <span className="flex items-center justify-between w-full mb-3">
            <Link href="/home">
              <ArrowLeft size={24} color="#ffffff" />
            </Link>
            <h3 className="text-[#A4A4A4] text-lg ">Send Crypto</h3>
            <Scan size={24} color="#ffffff" />
          </span>
          <span className="flex items-center justify-between w-full text-white ">
            <h1 className="text-lg font-bold text-center">
              {equivalentAmount && (
                <p>
                  {amount} {currency === "usdc" ? "USDC" : "KSH"}
                </p>
              )}
            </h1>
            <ArrowsLeftRight
              size={24}
              weight="bold"
              className="text-white mx-1"
            />
            <h1 className="text-lg font-bold text-center">
              {equivalentAmount && <p>{equivalentAmount}</p>}
            </h1>
          </span>
        </span>
      </div>
      {/* <div className="flex flex-col items-center mt-10">
        <h3 className="text-4xl text-white font-bold">ksh 500</h3>
        <h5 className="text-xl text-white">3.12 USDC</h5>
     </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        {/* Currency Selection */}
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="border border-[#0795B0] rounded-lg px-4 py-6 bg-transparent text-white text-sm outline-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border border-[#0795B0] rounded-lg bg-black text-white text-sm outline-none">
            <SelectItem value="usdc">USDC</SelectItem>
            <SelectItem value="ksh">KSH</SelectItem>
          </SelectContent>
        </Select>
        {/* Amount Input */}
        <input
          {...register("amount", { required: true, min: 0.01 })}
          type="number"
          step="0.01"
          placeholder="Enter Amount"
          className="border border-[#0795B0] w-full rounded-lg px-4 py-6 bg-transparent text-white text-sm outline-none mt-5"
        />
        {errors.amount && (
          <p className="text-red-500">
            Amount is required and must be greater than 0.
          </p>
        )}

        {/* Recipient's Phone Number Input */}
        <input
          {...register("phoneNumber", { required: true })}
          type="tel"
          placeholder="Recipient's Phone Number"
          className="border border-[#0795B0] w-full rounded-lg px-2 py-6 bg-transparent text-white text-sm outline-none mt-5"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">Phone number is required.</p>
        )}

        {/* Send Button */}
        <button className="bg-white font-bold text-lg p-3 rounded-xl w-full mt-5">
          Send
        </button>
      </form>
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              {finalAmount}
              {currency === "usdc" ? " USDC" : " KSH"} Transferred Succesfully
            </DialogTitle>
            <Player
              keepLastFrame
              autoplay
              src={lottieSuccess}
              style={{ height: "300px", width: "300px" }}
            ></Player>
            <button
              className="bg-white font-bold text-lg p-3 rounded-xl w-full mt-5 text-black"
              onClick={() => setOpenSuccess(false)}
            >
              Done
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Send;
