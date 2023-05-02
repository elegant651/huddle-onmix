import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ColorModeButton, NavBar } from 'components/elements';
import { useWeb3React } from '@web3-react/core';
import { ConnectButton } from '../ConnectButton';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { injected } from '../../../utils/wallet/connectors';
import { useEffect } from 'react';

const Header = () => {
  const { activate, setError, account, active } = useWeb3React();

  useEffect(() => {
    async function loadInjectedWallet() {
      const isAuthorized = await injected.isAuthorized();
      if (isAuthorized) {
        await activate(injected);
      }
    }
    try {
      loadInjectedWallet();
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  }, [activate, setError]);

  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <Box style={{ fontSize: 22, fontWeight: 600, color: 'rgb(214 186 186)'}}>HuddleOffmix</Box>
          <NavBar />
          <HStack gap={'10px'}>
              {active && account ? (
                <span className="flex items-center space-x-2 p-2 bg-gray-700 rounded-full">
                  <Jazzicon
                    diameter={32}
                    seed={jsNumberForAddress(account.toLowerCase())}
                  />
                  <span>
                    {`${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`}
                  </span>
                </span>
              ) : (
                <ConnectButton />
              )}
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
