
import './App.css';
import Container from './Components/MainContent/Container';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
        <Container/>
    </ChakraProvider>
  );
}

export default App;
