import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x65B10A8F062D8E529a225e6EdE5737774CB73AA2"
);

export default instance;
