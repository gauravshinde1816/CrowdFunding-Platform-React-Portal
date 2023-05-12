import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();
const SpendingRequestContext = createContext();


export const SpendingRequestContextProvider = ({ children }) => {
  const { contract } = useContract('0x5D1f10694E5d81d46325C3227fCf71925d97EdA7');
  const { mutateAsync: createSpendingRequest } = useContractWrite(contract, 'createSpendingRequest');

  const address = useAddress();
  const connect = useMetamask();



  const publishSpendingRequest = async (form) => {
    console.log("Publish ", form)
    try {
      const data = await createSpendingRequest([
        form.address, // owner
        form.title, // title
        form.description, // description
        form.target,
        form.minCount,
        form.database_id
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }


  const GetDBID = async (id) => {
    console.log("Hello SP By ID", id)

    const spendingRequests = await contract.call('getSP');

    // console.log(spendingRequests)

    const parsedSpendingRequests = spendingRequests.map((SP, i) => ({
      recipient: SP.recipient,
      title: SP.title,
      description: SP.description,
      target: ethers.utils.formatEther(SP.target.toString()),
      minCount: SP.minCount,
      approvals: SP.voters.length,
      database_id: SP.database_id,
      amountCollected: ethers.utils.formatEther(SP.amountCollected.toString()),
      pId: i
    }));

    const SP = parsedSpendingRequests.find((ele) => ele.database_id === id)
    return SP;
  }



  const GetSpendingRequests = async () => {

    console.log("Hello SP")
    const spendingRequests = await contract.call('getSP');

    // console.log(spendingRequests)

    const parsedSpendingRequests = spendingRequests.map((SP, i) => ({
      recipient: SP.recipient,
      title: SP.title,
      description: SP.description,
      target: ethers.utils.formatEther(SP.target.toString()),
      minCount: SP.minCount,
      approvals: SP.voters.length,
      database_id: SP.database_id,
      amountCollected: ethers.utils.formatEther(SP.amountCollected.toString()),
      pId: i
    }));


    console.log(parsedSpendingRequests)
    return parsedSpendingRequests;
  }


  const getAmountCollected = async (id) => {
    console.log("Hello Amount")
    const spendingRequests = await contract.call('getAmountCollected', id);
    console.log(spendingRequests)
  }

  const GetSpendingRequestByID = async (id) => {

    console.log("Hello SP By ID", id)
    const spendingRequests = await contract.call('getSP');

    const parsedSpendingRequests = spendingRequests.map((SP, i) => {
      if (i === id) {
        return ({
          recipient: SP.recipient,
          title: SP.title,
          description: SP.description,
          target: ethers.utils.formatEther(SP.target.toString()),
          minCount: SP.minCount,
          database_id: SP.database_id,
          amountCollected: ethers.utils.formatEther(SP.amountCollected.toString()),
          pId: i
        })
      }
    });

    return parsedSpendingRequests[id]
  }


  const donate = async (pId, amount) => {
    const data = await contract.call('donateToSpendingRequest', pId, { value: ethers.utils.parseEther(amount) });
    return data;
  }


  const voteSP = async (pId, voterAddress)=>{
    const data = await contract.call('vote', pId, voterAddress);
    return data
  }

  return (<SpendingRequestContext.Provider value={{
    address,
    contract,
    connect,
    publishSpendingRequest,
    GetSpendingRequests,
    getAmountCollected,
    GetSpendingRequestByID,
    donate,
    GetDBID,
    voteSP
  }}>
    {children}
  </SpendingRequestContext.Provider>)
}

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xF3577EBcCd833977AdB088DCdE3407dd8f0FF5D5');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount) });

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
export const useSpendingRequestContext = () => useContext(SpendingRequestContext)