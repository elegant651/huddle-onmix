import { useRouter } from 'next/router';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const Events = () => {
  const router = useRouter();

  const events = [
    {
      pic: 'https://ipfs.io/ipfs/bafkreifl3m3wgbf2epwlmggngtcnkvk5b74nigv5vdux4w74z44sca27sq',
      title: 'Coming to the trance party tonight - feat.Armin',
      info: '2023.04.25',
      message: 'lets fun tonight',
      creator: '0x345b5232166aDf89C57033Ce21c81F19e4717467'
    },
    {
      pic: 'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      title: 'Ballad Concert',
      info: '2023.04.20',
      message: "We'd appreciate it if you could join us in a meaningful time.",
      creator: "0x345b5232166aDf89C57033Ce21c81F19e4717467"
    }
  ]

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Events
      </Heading>
        <Box>
          {events.map((event, key) => (
            <Center style={{ cursor: 'pointer' }} py={6} onClick={() => router.push('/events/view')}>
              <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                  h={'210px'}
                  bg={'gray.100'}
                  mt={-6}
                  mx={-6}
                  mb={6}
                  pos={'relative'}>
                  <Image
                    src={
                      event.pic
                    }
                    objectFit="cover"
                    boxSize="100%"
                  />
                </Box>
                <Stack>
                  <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    {event.info}
                  </Text>
                  <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {event.title}
                  </Heading>
                  <Text color={'gray.500'}>
                    {event.message.slice(0, 200)}
                  </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                  <Jazzicon
                    diameter={32}
                    seed={jsNumberForAddress(event.creator.toLowerCase())}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{event.creator.slice(0, 10)}...</Text>
                  </Stack>
                </Stack>
              </Box>
            </Center>
          ))} 
        </Box>
    </>
  );
};

export default Events;
