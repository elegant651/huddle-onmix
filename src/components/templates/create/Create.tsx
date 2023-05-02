import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useNftPort } from 'hooks/useNftPort';
import { useEthereumProvider } from 'hooks/useEthereumProvider';
// import { useTableland, TABLE_NAME } from 'hooks/useTableland';
import { useAccount } from 'wagmi'

const Create = () => {
  const { address, isConnected } = useAccount()
  const { ethereumProvider } = useEthereumProvider();
  // const { createComment, writeQueryOnEvent, readQuery } = useTableland();
  const [formData, setFormData] = useState({
    when: '',
    where: '',
    title: '',
    pic: '',
    message: '',
  })
  const { uploadFileToIPFS, uploadMetadataToIPFS } = useNftPort()

  const [successMsg, setSuccessMsg] = useState('');

  const handleChangeFile = async (e) => {
    const [file] = [...e.target.files]
    const jsonIPFS = await uploadFileToIPFS(file)
    setFormData({
      ...formData,
      pic: jsonIPFS.ipfs_url
    })
  }

  async function writeEvent() {
    if (address && ethereumProvider) {
      // const query = await readQuery(ethereumProvider, TABLE_NAME)
      // console.log('row', query.rows.length)
      // console.log('form', formData)
      // await writeQueryOnEvent(ethereumProvider, TABLE_NAME, {
      //   id: query.rows.length,
      //   pic: formData.pic,
      //   title: formData.title,
      //   info: `${formData.when} / ${formData.where}`,
      //   message: formData.message,
      //   creator: address
      // })
      // await createComment(ethereumProvider)

      setSuccessMsg('successful for Transaction..!')
    }
  }

  const createEventForm = async () => {
    console.log('form', formData)

    // save tableland
    // await writeEvent()

    // set metadata for nft
    // await uploadMetadataToIPFS('HeartRing', formData.title, formData.pic)
  }
  
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Heading as="h3" size="lg" mb="4" fontWeight="bold" textAlign="left">
        Create my event
      </Heading>

      <Box
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        p={8}
        color={useColorModeValue('gray.700', 'whiteAlpha.900')}
        shadow="base">
        <VStack spacing={5}>
          <FormControl
            id="when"
            pr={{ lg: '2' }}
            mb={{ base: '4', lg: '0' }}
          >
            <FormLabel fontSize="0.75rem" fontWeight="bold">
              When
            </FormLabel>
            <Input placeholder="mm/dd/yyyy HH:MM " onChange={(e) => {
              setFormData({
                ...formData,
                when: e.target.value
              })
            }}  />
          </FormControl>
          <FormControl
            id="where"
            pr={{ lg: '2' }}
            mb={{ base: '4', lg: '0' }}
          >
            <FormLabel fontSize="0.75rem" fontWeight="bold">
              Where
            </FormLabel>
            <Input placeholder="Anywhere" onChange={(e) => {
              setFormData({
                ...formData,
                where: e.target.value
              })
            }}/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Title</FormLabel>

            <Textarea
              name="title"
              placeholder="Your Title"
              rows={6}
              resize="none"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Photo Upload</FormLabel>

            <InputGroup>
              <Input type="file" name="photo" accept="image/png, image/jpeg" onChange={handleChangeFile}
 />
            </InputGroup>
            { formData.pic && (
                <h3>{formData.pic}</h3>
              )
            }
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Message</FormLabel>

            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              resize="none"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  message: e.target.value
                })
              }}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={createEventForm}
          >
            Create Event
          </Button>

          {successMsg && 
          <h2>
            {successMsg}
          </h2>
        }
        </VStack>
      </Box>
    </Container>
  );
};

export default Create;
