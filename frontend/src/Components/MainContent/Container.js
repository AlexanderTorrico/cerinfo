import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box, Flex } from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import SideBar from '../SideBar/SideBar';
import Nav from '../SideBar/Nav';

import LanguagePage from '../languages/language_index.js'
import AuthorPage from '../Form/Autor_List'
import AreaPage from '../areas/area_index'

//import Modal_Autor from '../Modal/Autor_Modal';

class Container extends Component {
    render() {

        return (
            <React.Fragment>

                <Flex className="este">
                    <Router>
                        <SideBar></SideBar>

                        <Box className="content" display="flex" flexDirection="column" w="full" h="full">
                            <Nav></Nav>
                            <Box className="Main" bg="#E4EFE9" h="full" overflow="auto">
                                <Switch>
                                    <Route path="/agregar">
                                        <h1>Agregar</h1>
                                    </Route>
                                    <Route path="/solicitudes">
                                        <h1>Solicitudes</h1>
                                    </Route>
                                    <Route path="/prestamos_y_devoluciones">
                                        <h1>Prestamos y devoluciones</h1>
                                    </Route>
                                    <Route path="/multas">
                                        <h1>Multas</h1>
                                    </Route>
                                    <Route path="/bloqueos">
                                        <h1>Bloqueos</h1>
                                    </Route>
                                    <Route path="/language">
                                        <LanguagePage />
                                    </Route>
                                    <Route path="/area">
                                        <AreaPage />
                                    </Route>
                                    <Route path="/autor">
                                        <AuthorPage />
                                    </Route>
                                </Switch>
                            </Box>
                        </Box>
                    </Router>
                </Flex>
            </React.Fragment>
        );
    }
}
export default Container;