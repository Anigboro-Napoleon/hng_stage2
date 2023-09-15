import DrawerComp from "@/components/drawer";
import { GetQueryParams } from "@/components/getQuery";
import useApi from "@/hooks/useApi";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  HStack,
  Img,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Details = () => {
  const { MovieDetails } = useApi();
  const { isOpen, onOpen } = useDisclosure();
  const btnRef = React.useRef();

  const [getDetails, setGetDetails] = useState({});
  const [releaseDate, setReleaseDate] = useState("");

  const toast = useToast();
  const showToast = (error) => {
    toast({
      title: "Error retrieving data.",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  let id = GetQueryParams("/details")?.id;

  const getMovieDetails = async () => {
    try {
      const req = await MovieDetails(id);
      console.log("request from details page", req.data);
      setGetDetails(req.data);
    } catch (err) {
      err?.response?.data?.status_message
        ? showToast(err?.response?.data?.status_message)
        : showToast(err?.message);
    }
  };

  const { backdrop_path, title, release_date, runtime, overview } = getDetails;

  useEffect(() => {
    const date = new Date(release_date);
    const utcDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const formattedUtcDate = utcDate.toUTCString();
    setReleaseDate(formattedUtcDate);
  }, [release_date]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getMovieDetails();
    onOpen();
  }, []);

  const leftNav = [
    {
      id: 1,
      title: "",
      img: "/images/detailslogo.png",
      link: "/",
    },
    {
      id: 2,
      title: "Home",
      img: "/images/home.png",
      link: "/",
    },
    {
      id: 3,
      title: "Movies",
      img: "/images/movies.png",
    },
    {
      id: 4,
      title: "TV Series",
      img: "/images/tv.png",
    },
    {
      id: 5,
      title: "Upcoming",
      img: "/images/calendar.png",
    },
  ];

  const { push } = useRouter();

  return (
    <>
      <Flex pos={"relative"} gap='40px' flexDir={{ base: 'column', lg: 'row' }}>
        <Tabs
          orientation={{ base: 'horizontal', lg: "vertical" }}
          size="lg"
          variant="enclosed-colored"
          mt="20px"
          defaultIndex={2}
        >
          <TabList
            display="flex"
            flexDir={{ base: "row", lg: "column" }}
            alignItems="start"
            pos="relative"
            top="60px"
            gap={{ base: "8px", lg: "10px" }}
          >
            {leftNav.map(({title, img, id, link}) => (
              <Tab
                key={id}
                display={'flex'}
                fontSize={{ base: "11px", lg: "15px" }}
                justifyContent="flex-start"
                flexDir={{ base: "column", lg: "row" }}
                _selected={{
                  justifyContent: "flex-start",
                  bg: "rgba(190, 18, 60, 0.7)",
                }}
                minW={{ lg: "180px" }}
                onClick={() => push(link)}
                bg={'none'}
                border={'none'}
              >
                <Img src={img} />
                <Text
                  ml={{ base: "0", lg: "7px" }}
                  fontSize="16px"
                  color="#000"
                >
                  {title}
                </Text>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <p>one!</p> */}
            </TabPanel>
            <TabPanel>
              {/* <Text color='#000'>two</Text> */}
            </TabPanel>
            <TabPanel>
              {/* <p>three!</p> */}
            </TabPanel>
            <TabPanel>
              {/* <p>three!</p> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <DrawerComp isOpen={isOpen} btnRef={btnRef} /> */}
        <Box
                  // pos={["absolute", null]}
                  // left={{ base: 0, lg: "350px" }}
                  mt={{ base: "10px", lg: "30px" }}
                  flex={2}
                >
                  <Img
                    src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                    w={{ base: "full", lg: "600px" }}
                    borderRadius={"30px"}
                    px={{ base: "15px", lg: 0 }}
                  />
                  <Box mt="15px" pl="20px">
                    <HStack
                      align={{ base: "start", lg: "center" }}
                      flexDir={{ base: "column", lg: "row" }}
                    >
                      <Text data-testid="movie-title" color="#000" fontWeight={600}>
                        {title}
                      </Text>
                      <Text
                        fontWeight={700}
                        color="#000"
                        display={{ base: "none", lg: "block" }}
                      >
                        .
                      </Text>
                      <Text
                        data-testid="movie-release-date"
                        color="#000"
                        fontWeight={600}
                      >
                        {releaseDate}
                      </Text>
                      <Text
                        fontWeight={700}
                        color="#000"
                        display={{ base: "none", lg: "block" }}
                      >
                        .
                      </Text>
                      <Text
                        data-testid="movie-runtime"
                        color="#000"
                        fontWeight={600}
                      >{`${runtime} mins`}</Text>
                    </HStack>
                    <Text
                      data-testid="movie-overview"
                      color="#000"
                      fontSize={"1rem"}
                      maxW={"600px"}
                    >
                      {overview}
                    </Text>
                  </Box>
                </Box>
        
      </Flex>
    </>
  );
};

export default Details;
