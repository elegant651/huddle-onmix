import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Button,
  Progress
} from '@chakra-ui/react';
import { useHuddle01, useEventListener } from '@huddle01/react';
import { useLobby, useAudio, useVideo, useRoom, usePeers } from '@huddle01/react/hooks';
import { Video, Audio } from '@huddle01/react/components'
import { useEthereumProvider } from 'hooks/useEthereumProvider';
import { useAccount } from 'wagmi'
import { useFVMMinting } from 'hooks/useFVMMinting';

const LiveRoom = () => {
  const { ethereumProvider } = useEthereumProvider();

  const roomId = 'jil-pdjm-zpz'
  //huddle
  const videoRef = useRef<HTMLVideoElement>(null);
  const { peers } = usePeers();
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const { fetchAudioStream, stopAudioStream, error: micError, produceAudio, stopProducingAudio, stream: micStream } = useAudio();
  // const { fetchVideoStream, stopVideoStream, error: camError, produceVideo, stopProducingVideo, stream: camStream } = useVideo(); 
  const { joinRoom, leaveRoom } = useRoom();

  const { mintNFT, isPending } = useFVMMinting()
  // Event Listner
  // useEventListener("lobby:cam-on", () => {
  //   if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  // });

  useEffect(() => {
    // its preferable to use env vars to store projectId
    console.log('p', process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID)
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);
  }, []);

  useEventListener("room:joined", () => {
    console.log("room:joined");
  });
  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });
  
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Heading as="h3" size="lg" mb="4" fontWeight="bold" textAlign="left">
        Live Room
      </Heading>

      <Box className='visbox' width={350} bg={useColorModeValue('blue', 'gray.700')}/>

      <Box
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        p={8}
        color={useColorModeValue('gray.700', 'whiteAlpha.900')}
        shadow="base">
        <VStack spacing={5}>
          <div>{isInitialized ? '' : 'Please initialize'}
          
          <Progress size='xs' isIndeterminate />
          <video ref={videoRef} autoPlay muted></video>
          {/* {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <>
                role: {peer.role}
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                  debug
                />
              </>
            ))} */}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}

          <Button
            disabled={isPending}
            onClick={() => mintNFT(ethereumProvider)}>
              MINT Artist Badge
          </Button>

          <Button
            disabled={joinLobby.isCallable} 
            onClick={() => joinLobby(roomId)}>
            Join Lobby
          </Button>

          {/* Mic */} 
          <Button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
            FETCH_AUDIO_STREAM
          </Button>

          {/* Webcam */} 
          {/* <Button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
            FETCH_VIDEO_STREAM
          </Button> */}

          <Button disabled={!joinRoom.isCallable} onClick={joinRoom}>
            JOIN_ROOM 
          </Button>
 
          <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
            LEAVE_ROOM 
          </Button>

          {/* <Button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
            Produce Cam  
          </Button> */}
  
          <Button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
            Produce Mic  
          </Button>
  
          {/* <Button disabled={!stopProducingVideo.isCallable} onClick={stopProducingVideo}>
            Stop Producing Cam  
          </Button> */}
  
          <Button disabled={!stopProducingAudio.isCallable} onClick={stopProducingAudio}>
            Stop Producing Mic  
          </Button>
        </div>
        </VStack>
      </Box>
    </Container>
  );
};

export default LiveRoom;
