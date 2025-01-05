"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import campaign from "@/ethereum/campaign";
import { useRouter } from "next/navigation";
import web3 from "@/ethereum/web3";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [approvalCount, setApprovalCount] = useState(0);
  const pathname = usePathname();
  const split = pathname.split("/");
  const id = split[2];
  useEffect(() => {
    const fetchRequest = async () => {
      const campaignInstance = await campaign(id);
      const approvalCountResult = await campaignInstance.methods
        .approversCount()
        .call();
      setApprovalCount(approvalCountResult);
      const requestCount = await campaignInstance.methods
        .getRequestsCount()
        .call();
      const listRequest = await Promise.all(
        Array(Number(BigInt(requestCount)))
          .fill()
          .map((element, index) => {
            return campaignInstance.methods.requests(index).call();
          })
      );
      console.log(listRequest);
      setRequests(listRequest);
    };
    fetchRequest();
  }, []);

  const onApprove = async (param) => {
    const campaignInstance = campaign(id);
    const accounts = await web3.eth.getAccounts();
    const result = await campaignInstance.methods.approveRequest(param).send({
      from: accounts[0],
    });
  };

  const onFinalize = async (param) => {
    const campaignInstance = campaign(id);
    const accounts = await web3.eth.getAccounts();
    const result = await campaignInstance.methods.finalizeRequest(param).send({
      from: accounts[0],
    });
  };

  return (
    <div className="w-full p-10 border border-black">
      <h2 className="font-bold text-2xl">Request List</h2>
      <div className="flex justify-between mb-10">
        <div></div>
        <Link
          href={pathname + "/new"}
          className="text-md font-semibold bg-sky-300 px-3 py-2 rounded-md"
        >
          Create Request
        </Link>
      </div>
      <RequestTable
        data={requests}
        approvalCount={approvalCount}
        onApprove={onApprove}
        onFinalize={onFinalize}
      />
    </div>
  );
};

export default Request;

const RequestTable = ({ data, approvalCount, onApprove, onFinalize }) => {
  return (
    <section className="w-full mb-24 flex justify-start items-center">
      <table className="w-full  border-none text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Recipient</th>
            <th>Approval Count</th>
            <th>Approve</th>
            <th>Finalize</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request, index) => (
            <tr
              className="odd:bg-white even:bg-gray-50  px-3 py-2 "
              key={index}
            >
              <td>{index + 1}</td>
              <td>{request.description}</td>
              <td>
                {web3.utils.fromWei(Number(BigInt(request.value)), "ether")}
              </td>
              <td>{request.recipient}</td>
              <td>
                {Number(BigInt(request.approvalCount)) +
                  "/" +
                  Number(BigInt(approvalCount))}
              </td>
              <td>
                {request.complete ? null : (
                  <button
                    className=" px-2 bg-green-500 py-2 text-white font-semibold m-1"
                    onClick={() => onApprove(index)}
                  >
                    Approve
                  </button>
                )}
              </td>
              <td>
                {request.complete ? null : (
                  <button
                    className=" px-2 bg-red-500 py-2 text-white font-semibold m-1"
                    onClick={() => onFinalize(index)}
                  >
                    Finalize
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
