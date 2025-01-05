# Campaign Factory Web3 Project

## 🚀 Project Overview  
The **Campaign Factory** project is a decentralized application (dApp) designed to allow users to create, manage, and interact with crowdfunding campaigns on the Ethereum blockchain. It utilizes smart contracts to ensure transparency, security, and trust in the fundraising process.  

## 🛠️ Features  
- **Create Campaigns**: Users can create new crowdfunding campaigns with an initial minimum contribution amount. The user are known as manager for that campaign.
- **Contribute to Campaigns**: Other user can contribute funds to a campaign securely.  
- **Request Management**: Campaign managers can create spending requests and submit them for contributor approval.  
- **Approval Mechanism**: Contributors can approve or reject spending requests to ensure the campaign funds are spent as intended.  
- **Finalize**: Sending the balance from that campaign into the recipient address.  

---

## 📂 Project Structure  

### Ethereum  
- **`CampaignFactory.sol`**: A factory contract that creates and tracks individual campaigns.  
- **`Campaign.sol`**: The smart contract for individual campaigns, enabling contributors to donate and manage requests.  

### Frontend  
- Built with **Next.js** to provide a seamless and responsive user interface.  
- Integration with MetaMask for wallet connection.  

### Backend  
- **Web3.js** is used for interaction with the Ethereum blockchain.  
- Deployed on the **Ganache** local blockchain during development.  

---

## 🧩 Prerequisites  
1. Node.js (v14 or later)  
2. Ganache (for local blockchain development)  
3. MetaMask (browser wallet extension)  
4. Solidity Compiler 

---


## 📜 Smart Contract Details  

### CampaignFactory.sol  
- **Purpose**: Creates and manages individual campaigns.  
- **Key Functions**:  
  - `createCampaign(uint minimumContribution)`: Creates a new campaign.  
  - `getDeployedCampaigns()`: Returns all deployed campaign addresses.  

### Campaign.sol  
- **Purpose**: Manages contributions and spending requests for a single campaign.  
- **Key Functions**:  
  - `contribute()`: Allows users to contribute ETH to the campaign.  
  - `createRequest(string description, uint value, address recipient)`: Allows the manager to create a spending request.  
  - `approveRequest(uint index)`: Contributors can approve spending requests.  
  - `finalizeRequest(uint index)`: Finalizes a request after approval.  

---

## ✨ Highlights  
- **Decentralized Fundraising**: Eliminates the need for intermediaries.  
- **Transparency**: All operations are verifiable on-chain.  
- **Community-Controlled Funds**: Contributors have the power to approve or reject spending.  

---


## 📸 Screenshots  
*(Include screenshots of the UI, key workflows, and examples if applicable.)*  

--- 

Feel free to modify this template to match the specifics of your project!
