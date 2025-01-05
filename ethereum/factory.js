import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
console.log(web3);
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS // Correct contract address
);
console.log(instance);

export default instance;
