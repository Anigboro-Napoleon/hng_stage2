import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  const theme = extendTheme({
    components: {},
    styles: {
      global: {
        body: {
          bg: "#fff",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
