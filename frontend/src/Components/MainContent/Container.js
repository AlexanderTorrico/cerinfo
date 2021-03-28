import React,{Component} from 'react';
import { Box} from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import SideBar from '../SideBar/SideBar';
import Nav from '../SideBar/Nav';
import LanguageView from '../languages/language_view.js'

class Container extends Component{   
    render(){ 

        return (
             <React.Fragment>
                 <Box className="este" h="inherit">
                        <Box>
                            <SideBar></SideBar>
                        </Box>
                        <Box h="full">
                            <Nav></Nav>
                            <Box className="Main" bg="lightblue">
                                <LanguageView />
                            </Box>
                        </Box>   
                 </Box>
            </React.Fragment>
        );
    }
}
export default Container;