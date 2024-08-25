import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { cores } from "./styles/cores";
import Home from "./pages/Home";
import { SnackbarProvider } from "notistack";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
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
      <SnackbarProvider maxSnack={3}>
        <Home />
      </SnackbarProvider>
    </ChakraProvider>
  );
}

export default App;
