import React, { useState } from 'react';
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Comments from './Comments'
import Payment from './Payment';

const View = () => {
  const [showPayment, setShowPayment] = useState(false)

  const event = {
    pic: 'https://ipfs.io/ipfs/bafkreifl3m3wgbf2epwlmggngtcnkvk5b74nigv5vdux4w74z44sca27sq',
    title: 'Coming to the trance party tonight - feat.Armin',
    info: '2023.04.25',
    message: 'lets fun tonight',
    creator: '0x345b5232166aDf89C57033Ce21c81F19e4717467'
  }

  return (
    <div>
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}>
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={
                event.pic
              }
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {event.title}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              {event.info}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              {event.message}
            </Text>

            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={() => setShowPayment(!showPayment)}
                >
                Celebrate
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>

      { showPayment &&
        <Payment />
      }

      <Comments />
    </div>
  );
}

export default View;