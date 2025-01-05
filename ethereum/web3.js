let web3;

if (typeof window !== "undefined" && window.web3.currentProvider) {
  const { Web3 } = require("web3");
  web3 = new Web3(window.web3.currentProvider);

  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      console.log("Connected account: ", accounts[0]);
    })
    .catch((error) => {
      console.error("User denied account access or error occurred: ", error);
    });
} else {
  console.error(
    "Ethereum provider (window.ethereum) is not available. Please install MetaMask."
  );
}

export default web3;
