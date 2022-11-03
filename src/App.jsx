import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import YouTube from 'react-youtube'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
momentDurationFormatSetup(moment)
import { toMilliseconds } from 'colon-notation'
import { LinkIcon } from '@chakra-ui/icons'

function App() {
  const [url, setUrl] = useState('')

  const [curTime, setCurTime] = useState()
  const [duration, setDuration] = useState()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const getInfo = (e) => {
    setTitle(e.target.playerInfo.videoData.title)
    setAuthor(e.target.playerInfo.videoData.author)
  }

  const getCurrentTime = (e) => {
    setInterval(() => {
      return setCurTime(Math.floor(e.target.playerInfo.currentTime))
    })
  }

  const getDuration = (e) => {
    setDuration(Math.floor(e.target.playerInfo.duration))
  }

  const onEnd = (e) => {
    e.target.playVideo()
  }

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  let videoId
  if (url) {
    videoId = url.split('v=')[1]?.split('&')[0]
  }

  // options for youtube player
  const opts = {
    playerVars: {
      autoplay: 1,
      loop: 1,
      start: toMilliseconds(start) / 1000,
      end: toMilliseconds(end) / 1000,
    },
  }

  return (
    <div className='App'>
      <Center color='teal.50' h='100vh' w='100%' bg='gray.800'>
        <VStack gap='4'>
          <Heading>Loop YouTube</Heading>
          <InputGroup>
            <InputLeftElement children={<LinkIcon />} />
            <Input
              focusBorderColor='pink.400'
              placeholder='Paste YouTube URL here'
              onChange={(e) => setUrl(e.target.value)}
              type='text'
            />
          </InputGroup>

          <Box
            display='flex'
            flexDir='column'
            alignItems='center'
            bg='gray.900'
            p='4'
            borderRadius='lg'
            boxShadow='xl'
            gap='2'
          >
            <Text as='b' fontSize='xl'>
              {title}
            </Text>
            <Text>{author}</Text>
            <Text>
              {videoId ? (
                <>
                  {moment
                    .duration(curTime, 'seconds')
                    .format('mm:ss', { trim: false })}
                  {' / '}
                  {moment
                    .duration(duration, 'seconds')
                    .format('mm:ss', { trim: false })}
                </>
              ) : null}
            </Text>

            <YouTube
              videoId={videoId}
              onEnd={onEnd}
              onPlay={(e) => (getInfo(e), getCurrentTime(e), getDuration(e))}
              opts={opts}
            />
            <Box display='flex' gap='4'>
              <Box>
                <Text>Start</Text>
                <Input
                  placeholder='00:00'
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Box>
              <Box>
                <Text>End</Text>
                <Input
                  placeholder={moment
                    .duration(duration, 'seconds')
                    .format('mm:ss', { trim: false })}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </VStack>
      </Center>
    </div>
  )
}

export default App
