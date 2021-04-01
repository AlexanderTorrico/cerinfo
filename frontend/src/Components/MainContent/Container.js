import React, { Component } from 'react';
import { Box, Flex, Center } from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import SideBar from '../SideBar/SideBar';
import Nav from '../SideBar/Nav';

import LanguagePage from '../languages/language_index.js'

import Modal_Autor from '../Modal/Autor_Modal';

class Container extends Component {
    render() {

        return (
            <React.Fragment>

                    <Flex className="este">
                            <SideBar></SideBar>
                        <Box className="content" w="full" h="full">
                            <Nav></Nav>
                            <Box className="Main" bg="#E4EFE9" h="full">
                                <LanguagePage />
                            </Box>
                        </Box>
                    </Flex>
            </React.Fragment>
        );
    }
}
export default Container;