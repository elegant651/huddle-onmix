import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useEthereumProvider } from 'hooks/useEthereumProvider';
import { useSuperFluid } from 'hooks/useSuperFluid'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';

// superfluid - payment
const Payment = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount()
  const { ethereumProvider } = useEthereumProvider();
  const { createFlow } = useSuperFluid();

  // for test
  const recipient = '0x4D89C4Bf04425AEEc5e7FE3e9428Aee559dCa9ee'

  const [amount, setAmount] = useState(0);
  const [flowRate, setFlowRate] = useState(0.00001)
  const [msg, setMsg] = useState('')

  const [successMsg, setSuccessMsg] = useState('');

  async function writeComment() {
    if (address && ethereumProvider) {
      // const query = await readQuery(ethereumProvider, TABLE_NAME_COMMENT)
      // console.log('row', query.rows.length)
      // await writeQueryOnComment(ethereumProvider, TABLE_NAME_COMMENT, {
      //   id: query.rows.length,
      //   name: 'Ryan',
      //   address,
      //   amount,
      //   message: msg,
      // })
      // superfluid
      await createFlow(ethereumProvider, recipient, 37160493827)

      setSuccessMsg('successful for Transaction..!')
    }
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      p={8}
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      shadow="base">
      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Amount - (FlowRate: {flowRate} / sec)</FormLabel>

          <InputGroup>
            <Input type="number" name="amount" placeholder="Your Amount" value={amount} onChange={(e) => {setAmount(parseFloat(e.target.value)); setFlowRate(parseFloat(e.target.value)/10000) }} />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Message</FormLabel>

          <Textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            resize="none"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: 'blue.500',
          }}
          onClick={writeComment}
        >
          Pay
        </Button>

        {successMsg && 
          <h2>
            {successMsg}

            <Button
              colorScheme="white"
              bg="white.400"
              color="blue"
              _hover={{
                bg: 'white.500',
              }}
              onClick={() => router.push('/events/liveroom')}
            >
              Join the room
            </Button>            
          </h2>
        }
      </VStack>
    </Box>
  )
}

export default Payment;