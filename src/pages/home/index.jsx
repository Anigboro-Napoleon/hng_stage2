import useAuth from "@/hooks/useAuth";
import { Box, Button, Circle, Flex, HStack, Img, Input, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import {HiMiniBars2} from 'react-icons/hi2'

const HomePage = () => {
  const {FetchTopProducts} = useAuth()

  const homeProducts = async() => {
    try {
      const req = FetchTopProducts()
      console.log('show product request', req)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    homeProducts()
  }, [])
  
  return (
    <>
      <Box
        w="100%"
        h="500px"
        // display={"flex"}
        bgImage={"url('/images/john-wick-poster.jpg')"}
        bgPos={"cover"}
        bgRepeat={"no-repeat"}
        bgColor={"#000000a7"}
        bgBlendMode={"multiply"}
        pt='20px'
        px={"80px"}
      >
        <HStack justify={'space-between'}>
          <Img src="/images/logo.png" />
          <Box pos={"relative"}>
            <Input
              type="text"
              placeholder="What do you want to watch?"
              border={"1px solid #fff"}
              borderRadius={"4px"}
              w={'400px'}
            />
            <Button
              bg={"none"}
              borderRadius={0}
              _hover={{ bg: "none" }}
              pos={"absolute"}
              top={0}
              right={0}
            >
              <CiSearch color="#fff" />
            </Button>
          </Box>
          <Flex gap={'20px'}>
            <Text>Sign in</Text>
            <Circle bg={'#B91C1C'} borderRadius={'50px'} p='5px'>
              <HiMiniBars2 />
            </Circle>
          </Flex>
        </HStack>
        <Flex flexDir={"column"} mt='40px'>
          <Box fontSize={"2.5rem"} fontWeight={500} lineHeight={'45px'}>
            <Text>John Wick 3:</Text>
            <Text>Parabellum</Text>
          </Box>
        </Flex>
      </Box>

      <Box my={'40px'} px={'80px'}>
        <HStack align={'start'} justify={'space-between'}>
          <Text color={'#000'} fontSize={'1.4rem'} fontWeight={500}>Featured Movie</Text>
          <Text as={'button'} color='#B91C1C'>See more {'>'}</Text>
        </HStack>
        <SimpleGrid columns={3} spacing={20}>

        </SimpleGrid>
      </Box>
    </>
  );
};

export default HomePage;
