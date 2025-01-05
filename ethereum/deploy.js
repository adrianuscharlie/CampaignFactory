const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.WALLET_DEPLOYER,
  process.env.RPC_URL
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account ", accounts[0]);
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log("Account balance:", web3.utils.fromWei(balance, "ether"), "ETH");
  const gasEstimate = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .estimateGas();

  console.log("Estimated Gas:", gasEstimate);

  try {
    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: compiledFactory.bytecode })
      .send({ gas: "3000000", from: accounts[0] });
    // Adjust gas if needed

    console.log("Contract deployed to ", result.options.address);
  } catch (err) {
    console.log(err);
  }
};

deploy();
