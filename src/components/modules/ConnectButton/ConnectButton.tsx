import { useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Button, Text, HStack, } from '@chakra-ui/react';
import { useEthereumProvider } from '../../../hooks/useEthereumProvider';
import { injected } from '../../../utils/wallet/connectors';

const ConnectButton = () => {
  const router = useRouter();

  const { activate, setError } = useWeb3React();
  const { isMetaMask } = useEthereumProvider();

  const [isConnecting, setIsConnecting] = useState(false);

  
  async function connectMetaMask() {
    if (isMetaMask) {
      setIsConnecting(true);
      try {
        await activate(injected);
        setIsConnecting(false);
      } catch (error) {
        if (error instanceof Error) setError(error);
        setIsConnecting(false);
      }
    } else {
      window.open(
        `https://metamask.app.link/dapp/${projectConfig.siteDomain}${router.pathname}`,
        '_ blank'
      );
    }
  }

  return (
    <HStack>
      <Button size="sm" onClick={connectMetaMask} colorScheme="blue">
        Connect Wallet
      </Button>
    </HStack>
  );
};

export default ConnectButton;
