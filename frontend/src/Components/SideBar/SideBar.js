import React,{Component} from 'react';

import { Box} from "@chakra-ui/react";
import { AddIcon,EmailIcon,TimeIcon,WarningTwoIcon,UnlockIcon,DragHandleIcon } from '@chakra-ui/icons'
import { ListItem, UnorderedList,Link } from "@chakra-ui/react"
import Nav from './Nav'
import "./../../Assets/Css/Estilo.css"
class SideBar extends Component{   
    render(){ 
        return (
             <React.Fragment>
                 <Box className="navegation" position="absolute">
                    <UnorderedList>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <AddIcon className="fa" aria-hidden="true"></AddIcon>
                                </span>
                                <span className="tittle">Agregar</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <EmailIcon className="fa" aria-hidden="true"></EmailIcon>
                                </span>
                                <span className="tittle">Solicitud</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <TimeIcon className="fa" aria-hidden="true"></TimeIcon>
                                </span>
                                <span className="tittle">Prestamo y Devoluciones</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <WarningTwoIcon className="fa" aria-hidden="true"></WarningTwoIcon>
                                </span>
                                <span className="tittle">Multa</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <UnlockIcon className="fa" aria-hidden="true"></UnlockIcon>
                                </span>
                                <span className="tittle">Bloqueo</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://chakra-ui.com" isExternal   >
                                <span className="icon">
                                    <DragHandleIcon className="fa" aria-hidden="true"></DragHandleIcon>
                                </span>
                                <span className="tittle">Landing Page</span>
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </React.Fragment>
        );
    }
}
export default SideBar;