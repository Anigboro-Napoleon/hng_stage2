import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Img,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiMiniBars2 } from "react-icons/hi2";
import { toast } from "react-toastify";
import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";

const HomePage = () => {
  const [movieData, setMovieData] = useState([]);
  const [findMovie, setFindMovie] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [input, setInput] = useState("");
  const { FetchTopMovies, SearchMovie } = useApi();
  const date = new Date().getFullYear();

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const changeFavoriteIcon = () => {
    setFavorite((show) => !show);
  };

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await Promise.resolve(FetchTopMovies());
        setMovieData(data.results);
      } catch (err) {
        err?.response?.data?.status_message
          ? showToast(err?.response?.data?.status_message)
          : showToast(err?.message);
      }
    };
    getData();
  }, [FetchTopMovies, showToast]);

  const handleSearchChange = async (e) => {
    const newSearchTerm = e.target.value;
    setInput(newSearchTerm);
    if (newSearchTerm.trim() !== "") {
      try {
        setLoading(false);
        const { data } = await SearchMovie(newSearchTerm);
        setFindMovie(data.results);
        setLoading(true);
      } catch (err) {
        err?.response?.data?.status_message
          ? showToast(err?.response?.data?.status_message)
          : showToast(err?.message);
      } finally {
        setLoading(false);
      }
    } else {
      setFindMovie([]);
    }
  };

  return (
    <>
      <Box
        w="100%"
        h="500px"
        // display={"flex"}
        bgImage={"url('/images/john-wick-poster.jpg')"}
        bgSize={"cover"}
        bgPos={"top"}
        bgRepeat={"no-repeat"}
        bgColor={"#000000a7"}
        bgBlendMode={"multiply"}
        pt="20px"
        px={"80px"}
      >
        <HStack
          justify={"space-between"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <Img src="/images/logo.png" />
          <Box pos={"relative"}>
            <Input
              type="text"
              placeholder="What do you want to watch?"
              border={"1px solid #fff"}
              borderRadius={"4px"}
              w={"400px"}
              _placeholder={{ color: "#fff" }}
              value={input}
              onChange={handleSearchChange}
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
          <Flex gap={"20px"}>
            <Text>Sign in</Text>
            <Circle bg={"#B91C1C"} borderRadius={"50px"} p="5px">
              <HiMiniBars2 />
            </Circle>
          </Flex>
        </HStack>
        <Flex flexDir={"column"} mt="40px">
          <Box fontSize={"2.5rem"} fontWeight={600} lineHeight={"45px"}>
            <Text>John Wick 3:</Text>
            <Text>Parabellum</Text>
          </Box>
          <HStack gap="40px" mt="20px">
            <Flex>
              <Img src="/images/imdb.png" w={"50px"} />
              <Text>86.0/100</Text>
            </Flex>
            <Flex gap="8px">
              <Img src="/images/rottom.png" w={"20px"} />
              <Text>97%</Text>
            </Flex>
          </HStack>
          <Text maxW={"300px"} fontSize={"0.9rem"} my="20px">
            John Wick is on the run after killing a member of the international
            assassins&#39; guild and with a $14 million price tag on his head,
            he is a target of hit men and women everywhere...
          </Text>
        </Flex>
        <Flex justify={{ base: "center", lg: "start" }}>
          <Button
            bg="#B91C1C"
            color={"#fff"}
            borderRadius={"5px"}
            display={"flex"}
            _hover={{ bg: "#B91C1C" }}
          >
            WATCH TRAILER
          </Button>
        </Flex>
      </Box>
      {findMovie.length === 0 ? (
        <Box my={"40px"} px={"80px"}>
          <HStack
            align={"start"}
            justify={"space-between"}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Text color={"#000"} fontSize={"1.4rem"} fontWeight={600}>
              Featured Movie
            </Text>
            <Text as={"button"} color="#B91C1C">
              See more {">"}
            </Text>
          </HStack>
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 5, lg: 20 }}
            mt={"30px"}
          >
            {movieData
              .slice((0, 10))
              .map(({ title, poster_path, release_date, id }) => (
                <>
                  <Box
                    data-testid="movie-card"
                    key={id}
                    cursor={"pointer"}
                    onClick={() => push(`/details?id=${id}`)}
                  >
                    <Box pos={"relative"}>
                      <Img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt="top-movie-poster"
                        data-testid="movie-poster"
                      />
                      <Button
                        bg={"none"}
                        w="40px"
                        h="40px"
                        borderRadius={0}
                        p="5px"
                        pos="absolute"
                        _hover={{ bg: "none" }}
                        top={0}
                        right={2}
                        onClick={changeFavoriteIcon}
                        zIndex={99}
                      >
                        {favorite ? (
                          <AiOutlineHeart color="#d71818" size={"20px"} />
                        ) : (
                          <AiFillHeart color="#d71818" size={"20px"} />
                        )}
                      </Button>
                    </Box>
                    <Text
                      as="span"
                      color="#a8a7a7"
                      fontSize={"0.8rem"}
                      data-testid="movie-release-date"
                    >
                      <Text as="span" color="#232323">
                        Release Date:{" "}
                      </Text>
                      {release_date}
                    </Text>
                    <Text
                      color={"#000"}
                      fontWeight={600}
                      data-testid="movie-title"
                    >
                      {title}
                    </Text>
                  </Box>
                </>
              ))}
          </SimpleGrid>
        </Box>
      ) : (
        <>
          {loading && <Text color="#000">Loading...</Text>}
          <Box my={"40px"} px={"80px"}>
            <HStack
              align={"start"}
              justify={"space-between"}
              flexDir={{ base: "column", lg: "row" }}
            >
              <Text color={"#000"} fontSize={"1.4rem"} fontWeight={600}>
                Search Results
              </Text>
              <Text as={"button"} color="#B91C1C">
                See more {">"}
              </Text>
            </HStack>
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={{ base: 5, lg: 20 }}
              mt={"30px"}
            >
              {findMovie
                .slice(0, 10)
                .filter(({ poster_path }) => poster_path !== null)
                .map(({ title, poster_path, release_date, id }) => (
                  <>
                    <Box
                      data-testid="movie-card"
                      key={id}
                      cursor={"pointer"}
                      onClick={() => push(`/details?id=${id}`)}
                    >
                      <Box pos={"relative"}>
                        <Img
                          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                          alt="top-movie-poster"
                          data-testid="movie-poster"
                        />
                        <Button
                          bg={"none"}
                          borderRadius={0}
                          p="5px"
                          pos="absolute"
                          _hover={{ bg: "none" }}
                          top={0}
                          right={2}
                          onClick={changeFavoriteIcon}
                        >
                          {favorite ? (
                            <AiOutlineHeart color="#d71818" size={"20px"} />
                          ) : (
                            <AiFillHeart color="#d71818" size={"20px"} />
                          )}
                        </Button>
                      </Box>
                      <Text
                        as="span"
                        color="#a8a7a7"
                        fontSize={"0.8rem"}
                        data-testid="movie-release-date"
                      >
                        <Text as="span" color="#232323">
                          Release Date:{" "}
                        </Text>
                        {release_date}
                      </Text>
                      <Text
                        color={"#000"}
                        fontWeight={600}
                        data-testid="movie-title"
                      >
                        {title}
                      </Text>
                    </Box>
                  </>
                ))}
            </SimpleGrid>
          </Box>
        </>
      )}
      <Box my="30px">
        <HStack justify={"center"} gap="30px">
          <BiLogoFacebookSquare color={"#000"} size="25px" />
          <BiLogoInstagram color={"#000"} size="25px" />
          <BiLogoTwitter color={"#000"} size="25px" />
          <FaYoutube color={"#000"} size="25px" />
        </HStack>
        <HStack justify={"center"} mt="15px" gap="15px">
          <Text color={"#000"} fontSize={".85rem"} fontWeight={600}>
            Conditions of Use
          </Text>
          <Text color={"#000"} fontSize={".85rem"} fontWeight={600}>
            Privacy & Policy
          </Text>
          <Text color={"#000"} fontSize={".85rem"} fontWeight={600}>
            Press Room
          </Text>
        </HStack>
        <HStack justify={"center"}>
          <Text
            color={"#5a5a5a"}
          >{`&copy; ${date} Moviebox by napoloenddev`}</Text>
        </HStack>
      </Box>
    </>
  );
};

export default HomePage;
