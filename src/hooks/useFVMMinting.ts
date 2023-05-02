import { ethers } from 'ethers';
import type { ExternalProvider } from '@ethersproject/providers';
import ABI from '../config/abi.json';
import { MINTINGS } from '../contracts/testMinting';
import { useState } from 'react';

const CONTRACT_ADDRESS = '0xace0f315102f256103E71B12C4e560fA80840615'

export function useFVMMinting() {
  const [isPending, setIsPending] = useState(false);

  const mintNFT = async (ethereumProvider : ExternalProvider) => {
    if (ethereumProvider) {
      setIsPending(true);
      try {
        const web3Provider = new ethers.providers.Web3Provider(
          ethereumProvider
        );
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );

        const tokenURI = MINTINGS[Math.floor(Math.random() * MINTINGS.length)]
        console.log('tokenURI', tokenURI);
        const transaction = await contract.mint(tokenURI);
        setIsPending(false);
        await transaction.wait();
      } catch (error) {
        console.error(error);
        setIsPending(false);
      }
    }
  }

  return { mintNFT, isPending }
}