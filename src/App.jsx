import { Header } from "./components/header";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { cores } from "./styles/cores";
import { Apresentacao } from "./components/Apresentacao";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false
  },
  styles: {
    global: {
      body: {
        bg: cores.background,
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Apresentacao />
    </ChakraProvider>
  );
}

export default App;
