import React, { Component } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import SideBar from '../SideBar/SideBar';
import Nav from '../SideBar/Nav';

import LanguagePage from '../languages/language_index.js'

import Modal_Autor from '../Modal/Autor_Modal';

class Container extends Component {
    render() {

        return (
            <React.Fragment>
                <Box className="este" h="inherit">
                    <Box>
                        <SideBar></SideBar>
                    </Box>
                    <Box h="full">
                        <Nav></Nav>
                        <Box className="Main">
                            <LanguagePage />
                        </Box>
                    </Box>
                </Box>
                <Flex className="este">
                    <SideBar />
                    <Box className="content" w="full" h="full">
                        <Nav />
                        <Box className="Main" bg="lightblue">

                        </Box>
                    </Box>
                </Flex>
            </React.Fragment>
        );
    }
}
export default Container;