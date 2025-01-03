import factory from "@/ethereum/factory";

const CampaignIndex = async () => {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }
  const campaign = await factory.methods.getDeployedCampaigns().call();
  console.log(campaign);

  return <div>CampaignIndex</div>;
};

export default CampaignIndex;
