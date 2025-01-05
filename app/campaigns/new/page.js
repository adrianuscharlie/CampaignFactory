"use client";
import React from "react";
import { useState } from "react";
import factory from "@/ethereum/factory";
import web3 from "@/ethereum/web3";
const NewCampaign = () => {
  const [campaign, setCampaign] = useState({
    minimumContribution: 0,
    errorMessage: "",
    loading: false,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prevItems) => {
      return {
        ...prevItems,
        [name]: value,
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setCampaign((prevItems) => {
      return {
        ...prevItems,
        ["loading"]: true,
      };
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(campaign.minimumContribution).send({
        from: accounts[0],
      });
      setCampaign((prevItems) => {
        return {
          ...prevItems,
          ["loading"]: false,
          ["errorMessage"]: "Success creating new Campaign!",
        };
      });
    } catch (err) {
      setCampaign((prevItems) => {
        return {
          ...prevItems,
          ["errorMessage"]: err.message,
        };
      });
    }
  };

  return (
    <form className="w-full p-10 border border-black" onSubmit={onSubmit}>
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-2xl">Create a new Campaign</h2>
      </div>
      <div className="w-1/3 py-5">
        <h2 className="text-lg font-semibold text-sky-500 mb-2">
          Minimum to contribution
        </h2>
        <div className="flex border  border-b-gray-200 justify-between rounded-md">
          <input
            value={campaign.minimumContribution}
            type="number"
            name="minimumContribution"
            onChange={handleOnChange}
            className="w-full rounded-md py-2 px-3"
          />
          <label className="text-lg px-3 py-2 bg-gray-200">wei</label>
        </div>
      </div>
      <button
        className={`bg-sky-300 text-lg font-semibold px-3 py-2 rounded-md ${
          campaign.loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={campaign.loading}
      >
        {campaign.loading ? "Loading..." : "Contribute"}
      </button>

      {campaign.errorMessage ?? (
        <p className="py-10 mb-5">{campaign.errorMessage}</p>
      )}
    </form>
  );
};

export default NewCampaign;
