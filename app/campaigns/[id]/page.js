"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
const Campaign = () => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const id = split[2];
  const [campaign, setCampaign] = useState({
    address: id,
    manager: id,
    minContribute: 0,
    requestCount: 100,
    approversCount: 2,
    balance: 100,
  });
  return (
    <div className="w-full p-10 border border-black">
      <h2 className="font-bold text-2xl">Campaigns {id}</h2>
      <div className="flex justify-between">
        <div className="w-2/3 my-10 grid grid-cols-2 gap-5">
          {Object.entries(campaign).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </div>
        <div className="w-1/3 my-10 px-5">
          <h2 className="text-lg font-semibold text-sky-500 mb-2">
            Amount to contribute
          </h2>
          <div className="flex border  border-b-gray-200 justify-between rounded-md">
            <input className="w-full rounded-md" />
            <label className="text-lg px-3 bg-gray-200">Ether</label>
          </div>
        </div>
      </div>
      <button className="bg-sky-300 text-lg font-semibold px-3 py-2 rounded-md">
        View Request
      </button>
    </div>
  );
};

export default Campaign;
