import React,{Component} from 'react';

import { Box} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import { AddIcon,EmailIcon,TimeIcon,WarningTwoIcon,UnlockIcon,DragHandleIcon } from '@chakra-ui/icons'
import { ListItem, UnorderedList} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import "./../../Assets/Css/Estilo.css"
import Logo_Nur from "./../../Assets/Img/LOGO NUR BLANCO.png"
class SideBar extends Component{   
    render(){ 
        return (
             <React.Fragment>
                 <Box className="navegation" >
                    <UnorderedList>
                        <ListItem>
                            <Image src={Logo_Nur} alt="Logo" />
                        </ListItem>
                        <ListItem>
                            <Link to="/agregar"  >
                                <span className="icon">
                                    <AddIcon className="fa" aria-hidden="true"></AddIcon>
                                </span>
                                <span className="tittle">Agregar</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/solicitudes"   >
                                <span className="icon">
                                    <EmailIcon className="fa" aria-hidden="true"></EmailIcon>
                                </span>
                                <span className="tittle">Solicitud</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/prestamos_y_devoluciones"  >
                                <span className="icon">
                                    <TimeIcon className="fa" aria-hidden="true"></TimeIcon>
                                </span>
                                <span className="tittle">Prestamo y Devoluciones</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/multas"  >
                                <span className="icon">
                                    <WarningTwoIcon className="fa" aria-hidden="true"></WarningTwoIcon>
                                </span>
                                <span className="tittle">Multa</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/bloqueos"  >
                                <span className="icon">
                                    <UnlockIcon className="fa" aria-hidden="true"></UnlockIcon>
                                </span>
                                <span className="tittle">Bloqueo</span>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/language"  >
                                <span className="icon">
                                    <DragHandleIcon className="fa" aria-hidden="true"></DragHandleIcon>
                                </span>
                                <span className="tittle">Lenguaje</span>
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </React.Fragment>
        );
    }
}
export default SideBar;