import React, { Component } from "react";
import {
  Flex,
  Center,
  Spacer,
  Button,
} from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import Toggle from "./Toggle";
import { useHistory, Redirect } from "react-router-dom";

export default function Nav() {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("aaaaaaaaa");
    history.push("/login");
    return;
  };

  return (
    <React.Fragment>
      <Flex className="Nav" h="50" w="full" bg="#B0C6D6">
        <Spacer />
        <Flex>
          <Center>
            <form onClick={handleSubmit}>
              <Button size="sm" mr="10px" type="submit">
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
