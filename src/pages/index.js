import Head from "next/head";
import HomePage from "./home";

const Home = () => {
  return (
    <>
      <Head>
        <title>HNG TASK 2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
