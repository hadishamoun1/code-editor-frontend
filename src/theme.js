import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      100: '#f7c6c7',
      900: '#1a365d',
    },
  },
  fonts: {
    heading: 'Arial',
    body: 'Arial',
  },
});

export default theme;
