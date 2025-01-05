"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center mb-10 p-5 border border-black rounded-md">
      <Link href={"/"} className="text-xl font-bold">
        CrowdFunding
      </Link>
      <WalletConnector />
    </nav>
  );
};

export default Navbar;

const WalletConnector = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } else {
          console.error(
            "Ethereum provider (window.ethereum) is not available. Please install MetaMask."
          );
        }
      } catch (error) {
        setErrorMessage("Failed to initialize wallet.");
      }
    };

    initializeWeb3();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage("MetaMask is not installed.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      console.log("Connected account: ", accounts[0]);
    } catch (error) {
      setErrorMessage("User denied account access or an error occurred.");
      console.error("Error: ", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setErrorMessage("");
    console.log("Wallet disconnected.");
  };

  return (
    <div className="p-6  rounded-md">
      {walletAddress ? (
        <div className="flex justify-between gap-3">
          <p
            style={{ overflowWrap: "break-word" }}
            className="hover:cursor-pointer"
            onClick={async () => {
              await navigator.clipboard.writeText(walletAddress);
              alert("Address copied!");
            }}
          >
            <strong>Connected Wallet:</strong> {walletAddress}
          </p>
          <button
            onClick={disconnectWallet}
            className=" text-red-500 font-semibold rounded-md"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="text-sky-500 font-semibold rounded-md"
        >
          Connect Wallet
        </button>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </p>
      )}
    </div>
  );
};
