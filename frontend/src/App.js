import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import SideBar from "./Components/SideBar/SideBar";
import Nav from "./Components/SideBar/Nav";

import LanguagePage from "./Components/languages/language_index.js";
import AuthorPage from "./Components/Form/Autor_List";
import CategoriaPage from "./Components/Form/Categoria_List";
import AreaPage from "./Components/areas/area_index";
import GenderPage from "./Components/genders/gender_index";
import MaterialPage from "./Components/materials/material_index";
import Login from "./Components/cliente/login_estudent";
import {estado} from "./Components/settings"
import AdminPage from "./Components/users/admin_index.js"


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        
        {estado && (
          <React.Fragment>
            <Flex className="este">
              <SideBar></SideBar>

              <Box
                className="content"
                display="flex"
                flexDirection="column"
                w="full"
                h="full"
              >
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
                    <Route path="/categoria">
                      <CategoriaPage />
                    </Route>
                    <Route path="/gender">
                      <GenderPage />
                    </Route>
                    <Route path="/material">
                      <MaterialPage />
                    </Route>

                    <Route path="/usuarios">
                      <AdminPage />
                    </Route>

                  </Switch>
                </Box>
              </Box>
            </Flex>
          </React.Fragment>
        )}
      </Router> 
    </ChakraProvider>
  );
}

export default App;
