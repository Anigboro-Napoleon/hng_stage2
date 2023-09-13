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
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
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
  }, [getMovieDetails, onOpen]);

  return (
    <>
      <Flex justify={"center"} pos={"relative"}>
        <Box>
          <DrawerComp isOpen={isOpen} btnRef={btnRef} />
        </Box>
        <Box
          pos={["absolute", null]}
          left={{ base: 0, lg: "350px" }}
          mt={{ base: "10px", lg: "30px" }}
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
