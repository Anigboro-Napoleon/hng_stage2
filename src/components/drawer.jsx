import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const DrawerComp = ({ isOpen, btnRef }) => {
  const leftNav = [
    {
      id: 1,
      title: "Home",
      img: "/images/home.png",
      link: '/'
    },
    {
      id: 2,
      title: "Movies",
      img: "/images/movies.png",
    },
    {
      id: 3,
      title: "TV Series",
      img: "/images/tv.png",
    },
    {
      id: 4,
      title: "Upcoming",
      img: "/images/calendar.png",
    },
  ];

  const {push} = useRouter()

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" finalFocusRef={btnRef}>
        <DrawerContent
          bg={"#fff"}
          color={"#000"}
          borderRadius={"0 50px 50px 0"}
          border={"1px solid #d2d2d2"}
          boxShadow={"none"}
          display={{ base: 'none', lg: 'block' }}
        >
          <DrawerHeader>
            <Img src="/images/detailslogo.png" w="150px" />
          </DrawerHeader>

          <DrawerBody mt="10px">
            <VStack align={"start"} gap={"20px"}>
              {leftNav.map(({ title, img, id, link }) => (
                <Flex key={id} gap="10px" cursor={"pointer"} onClick={() => push(link)}>
                  <Img src={img} />
                  <Text>{title}</Text>
                </Flex>
              ))}
            </VStack>
            <Box
              border={"1px solid rgba(190, 18, 60, 0.7)"}
              borderRadius={"10px"}
              w="170px"
              h="200px"
              p="15px"
              mt="20px"
              bg="rgba(235, 196, 206, 0.256)"
            >
              <Text fontSize={"1rem"} lineHeight={"20px"} fontWeight={500}>
                Play movie quizzes and earn free tickets
              </Text>
              <Text
                fontSize={"0.9rem"}
                fontWeight={300}
                lineHeight={"20px"}
                pt="10px"
              >
                50k people are playing now
              </Text>
              <Button
                w="112px"
                bg="rgba(190, 18, 60, 0.2)"
                py="8px"
                fontSize={".8rem"}
                borderRadius={"30px"}
                color={'rgba(190, 18, 61, 0.737)'}
                mt='15px'
              >
                Start playing
              </Button>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Flex as='button' align='center'>
              <Img src="/images/logout.png" w='30px' />
              <Text>Log out</Text>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComp;
