"use client";
import React, { useEffect, useState } from "react";
import campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NewRequest = () => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const id = split[2];
  const [request, setRequest] = useState({
    contractAddress: id,
    description: "",
    value: 0,
    recipient: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contractAddress, description, value, recipient } = request;
    const campaingInstance = campaign(contractAddress);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaingInstance.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full p-10 border border-black">
      <Link
        href={split[0] + "/" + split[1] + "/" + split[2] + "/requests"}
        className="underline"
      >
        back
      </Link>
      <h2 className="font-bold text-lg mb-5">Create New Request</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Description Field */}
        <div className="flex items-center space-x-5">
          <label className="text-lg w-1/4">Description:</label>
          <input
            type="text"
            name="description"
            value={request.description}
            className="flex-1 border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Value Field */}
        <div className="flex items-center space-x-5">
          <label className="text-lg w-1/4">Ether:</label>
          <input
            type="number"
            name="value"
            value={request.value}
            className="flex-1 border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Recipient Field */}
        <div className="flex items-center space-x-5">
          <label className="text-lg w-1/4">Recipient:</label>
          <input
            type="text"
            name="recipient"
            value={request.recipient}
            className="flex-1 border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-md font-semibold bg-sky-300 px-5 py-2 rounded-md hover:bg-sky-400"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRequest;
