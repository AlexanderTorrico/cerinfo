import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import {estado} from "../settings"
import "./../../Components/cliente/style.css";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function App() {
  let asr= estado;
  let history = useHistory();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const cookies = new Cookies();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function disableScroll(){  
    window.scrollTo(0, 0);
  }
  
  window.addEventListener('scroll', disableScroll);
  

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = {
      email,
      password,
    };
    axios.post("http://localhost:8000/api/login/", usuario).then(
      (response) => {
        if (response.data.res !== "success") {
          alert("error al enviar datos");
          return;
        }
        /*
        localStorage.setItem("access_token", response.data.access_token);
        dispatch(iniciarSesion());
        localStorage.setItem("user", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);*/
        
        cookies.set("token", response.data.access_token, { path: "/" });
        cookies.set("id", response.data.user.id, { path: "/" });
        cookies.set("name", response.data.user.name, { path: "/" });
        asr = true;
        history.push("/language");
      },
      (error) => {
        if (error.response.status === 401) {
          /*swal(
            "Acceso Incorrecto !",
            "Verifique su usuario o contraseña!",
            "error"
          );*/
          ToastStatusExample();
          history.push("/login");
          return;
        }
        return error;
      }
    );
  };

  function ToastStatusExample() {
    toastIdRef.current = toast({
      title: "Error de session.",
      description: "Su correo electronico o contraseña son incorrectos, intente nuevamente por favor",
      status: "error",
      duration: 5500,
      isClosable: true,
    });
  }

  return (
    <Flex
      className="scrool"
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#6398BC" />
        <Heading color="#6398BC">CERINFO</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="#6398BC"
                color="#fff"
                width="full"
              >
                Ingresar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
