import React, { Component } from "react";
import { Flex, Center, Spacer, Button, Box } from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import Toggle from "./Toggle";
import { useHistory, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Nav() {
  let history = useHistory();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/login");
    return;
  };

  return (
    <React.Fragment>
      <Flex className="Nav" h="50" w="full" bg="#fff">
        <Spacer />
        <Box
          mt="3"
          mr="5"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {cookies.get("name")}
        </Box>
        <Flex>
          <Center>
            <form onClick={handleSubmit}>
              <Button size="sm" mr="10px" type="submit" colorScheme="red">
                Salir
              </Button>
            </form>
          </Center>
          <Center className="toggle" h="50px" w="50px">
            <Toggle></Toggle>
          </Center>
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
