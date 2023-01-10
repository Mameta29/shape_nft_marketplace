import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import { MarketAddress, MarketAddressABI } from './constants';

export const NFTContext = React.createContext();

// create contract data
const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

/**
 * NFTProvider component
 * @param {*} param0 children component
 * @returns
 */
export const NFTProvider = ({ children }) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  /**
   * fetchNFTs function
   * @returns
   */
  const fetchNFTs = async () => {
    setIsLoadingNFT(false);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/PPq6amF0yaNOJF3LlBoggF5UIzDSgnEe');

    // get contract object
    const contract = fetchContract(provider);
    // get MarketItems
    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        // get tokenURI
        const tokenURI = await contract.tokenURI(tokenId);
        // get token metadata
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        // get NFT price
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          'ether',
        );

        return {
          price,
          tokenId: tokenId.toNumber(),
          id: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      }),
    );

    return items;
  };

  /**
   * fetchMyNFTsOrCreatedNFTs function
   */
  const fetchMyNFTsOrCreatedNFTs = async (type) => {
    setIsLoadingNFT(false);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // get contract object
    const contract = fetchContract(signer);
    // get data
    const data = type === 'fetchItemsListed' ? await contract.fetchItemsListed() : await contract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          'ether',
        );

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      }),
    );

    return items;
  };

  /**
   * createSale fucntion
   * @param {*} url tokenURI url
   * @param {*} formInputPrice NFT price
   */
  const createSale = async (url, formInputPrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // get price
    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    // get contract object
    const contract = fetchContract(signer);
    // get listing price
    const listingPrice = await contract.getListingPrice();

    // call createToken function
    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  /**
   * buyNft function
   * @param {*} nft NFT data
   */
  const buyNft = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // get signer data
    const signer = provider.getSigner();
    // create contract data
    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      signer,
    );
    // get price
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
      gasLimit: 3000000,
    });

    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  /**
   * connectWallet function
   * @returns
   */
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');
    // get account data
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  /**
   * checkIfWalletIsConnect function
   * @returns
   */
  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        buyNft,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrCreatedNFTs,
        connectWallet,
        currentAccount,
        isLoadingNFT,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
