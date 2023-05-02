import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import type { ExternalProvider } from '@ethersproject/providers';

export function useSuperFluid() {
  const CHAIN_ID = 3141 // hyperspace
  const getConnection = async (ethereumProvider : ExternalProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);

    const sf = await Framework.create({
      chainId: CHAIN_ID, 
      provider
    });
    return sf;
  }

  const createFlow = async (ethereumProvider : ExternalProvider, recipient: string, flowRate: number) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider
    });
  
    const FILContract = await sf.loadSuperToken("tFIL");
    const tFIL = FILContract.address;

    const superSigner = sf.createSigner({ signer });

    console.log(signer);
    console.log(await superSigner.getAddress());

  
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: await superSigner.getAddress(),
        flowRate: flowRate.toString(),
        receiver: recipient,
        superToken: tFIL
      });

      console.log("Creating your stream2...");
  
      const result = await createFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Hyperspace
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  const deleteFlow = async (ethereumProvider : ExternalProvider, sender: string, recipient: string) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider
    });
  
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
  
    try {
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender,
        receiver: recipient,
        superToken: DAIx
      });
  
      console.log("Deleting your stream...");
  
      await deleteFlowOperation.exec(signer);
  
      console.log(
        `Congrats - you've just deleted your money stream!
         Network: Kovan
         Super Token: DAIx
         Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
         Receiver: ${recipient}
      `
      );
    } catch (error) {
      console.error(error);
    }
  }


  return { getConnection, createFlow, deleteFlow }
}