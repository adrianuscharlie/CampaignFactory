"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
const Campaign = () => {
  const [campaignState, setCampaignState] = useState({});
  const [contribute, setContribute] = useState(0);
  const pathname = usePathname();
  const split = pathname.split("/");
  const id = split[2];

  useEffect(() => {
    const fetchCampaign = async (address) => {
      const result = await campaign(address);
      const summary = await result.methods.getSummary().call();
      setCampaignState({
        contactAddress: id,
        minimumContribution: Number(BigInt(summary[0])),
        balance: Number(BigInt(summary[1])),
        requestCount: Number(BigInt(summary[2])),
        approversCount: Number(BigInt(summary[3])),
        manager: summary[4],
      });
    };
    fetchCampaign(id);
  }, []);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const campaignInstance = campaign(campaignState.contactAddress);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignInstance.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribute, "ether"),
      });
      console.log(pathname);
      router.push(pathname);
    } catch (err) {}
  };

  return (
    <div className="w-full p-10 border border-black">
      <h2 className="font-bold text-2xl">Campaigns {id}</h2>
      <div className="flex justify-between">
        <div className="w-2/3 my-10 grid grid-cols-2 gap-5">
          <Card
            header={campaignState.manager}
            sub={"Address of Manager"}
            desc={
              "The manager create this Campaign and can create request to withdraw money"
            }
          />
          <Card
            header={campaignState.minimumContribution}
            sub={"Minimum contribution (wei)"}
            desc={
              "You must contribute at least this much wei to become an approver"
            }
          />
          <Card
            header={campaignState.requestCount}
            sub={"Number of request"}
            desc={
              "A request tries to withdraw money from the contract. Requests must be approved by approvers"
            }
          />
          <Card
            header={campaignState.approversCount}
            sub={"Number of approvers"}
            desc={"Number of people who already donated to this campaign"}
          />
          <Card
            header={web3.utils.fromWei(Number(campaignState.balance), "ether")}
            sub={"Campaign balance (ether)"}
            desc={
              "The balance is how much money this campaign had left to spend"
            }
          />
        </div>

        <form className="w-1/3 my-10 px-5" onSubmit={onSubmit}>
          <h2 className="text-lg font-semibold text-sky-500 mb-2">
            Amount to contribute
          </h2>
          <div className="flex border  border-b-gray-200 justify-between rounded-md mb-5">
            <input
              type="number"
              value={contribute}
              className="w-full rounded-md py-2 px-3"
              onChange={(e) => {
                e.preventDefault();
                setContribute(e.target.value);
              }}
            />
            <label className="text-lg px-3 bg-gray-200">Ether</label>
          </div>
          <button className="text-md font-semibold bg-sky-300 px-3 py-2 rounded-md">
            Contribute!
          </button>
        </form>
      </div>
      <Link
        href={pathname + "/requests"}
        className="bg-sky-300 text-lg font-semibold px-3 py-2 rounded-md"
      >
        View Request
      </Link>
    </div>
  );
};

export default Campaign;

const Card = ({ header, sub, desc }) => {
  return (
    <div className="px-3 py-2 border border-black rounded-lg shadow-md">
      <h1 className="text-lg font-bold" style={{ overflowWrap: "break-word" }}>
        {header}
      </h1>
      <h3 className="text-gray-500">{sub}</h3>
      <h2>{desc}</h2>
    </div>
  );
};
