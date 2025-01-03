"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// import Test from "./test";
export default function Home() {
  const [campaigns, setCampaigns] = useState([
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
    "0x86549D33dd220670eB1999e901774D7187c202a3",
  ]);
  return (
    <div className="">
      <div className="w-full p-10 border border-black">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-2xl">Open Campaigns</h2>
          <button className="text-xl font-bold bg-sky-300 px-3 py-2 rounded-md">
            Create Campaign
          </button>
        </div>
        <div className="my-10 grid grid-cols-2 gap-5">
          {campaigns.map((campaign, index) => (
            <div className="bg-gray-100 py-2 px-3 mb-5 rounded-lg" key={index}>
              <h3 className="font-semibold text-xl my-2">{campaign}</h3>
              <Link
                href={"/campaigns/" + campaign}
                className="text-sky-600 underline"
              >
                View Campaign
              </Link>
            </div>
          ))}
        </div>
      </div>
      <footer className="py-5">
        <h1 className="text-center font-semibold">
          Developed by @adrianuscharlie
        </h1>
      </footer>
    </div>
  );
}
