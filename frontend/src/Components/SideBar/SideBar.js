import React,{Component} from 'react';

import { Box,Accordion,AccordionItem,AccordionButton,AccordionIcon,AccordionPanel} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import { AddIcon,EmailIcon,TimeIcon,WarningTwoIcon,UnlockIcon,DragHandleIcon,AttachmentIcon } from '@chakra-ui/icons'
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
                        <Accordion  allowToggle >
                            <AccordionItem border="0">
                                <h2>
                                <AccordionButton height="60px" color="white" className="btnAcordeon">
                                    <Box flex="1" textColor="white" textAlign="left">
                                        
                                        <span className="tittle">Informacion de libros</span>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel padding="0">
                                    <UnorderedList>
                                        <ListItem>
                                            <Link to="/language" >
                                                <span className="icon">
                                                    <DragHandleIcon className="fa" aria-hidden="true"></DragHandleIcon>
                                                </span>
                                                <span className="tittle">Lenguajes</span>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/area"  >
                                                <span className="icon">
                                                    <DragHandleIcon className="fa" aria-hidden="true"></DragHandleIcon>
                                                </span>
                                                <span className="tittle">Areas</span>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/autor"  >
                                                <span className="icon">
                                                    <AttachmentIcon className="fa" aria-hidden="true"></AttachmentIcon>
                                                </span>
                                                <span className="tittle">Autor</span>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/categoria"  >
                                                <span className="icon">
                                                    <AttachmentIcon className="fa" aria-hidden="true"></AttachmentIcon>
                                                </span>
                                                <span className="tittle">Categoria</span>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/genero"  >
                                                <span className="icon">
                                                    <AttachmentIcon className="fa" aria-hidden="true"></AttachmentIcon>
                                                </span>
                                                <span className="tittle">Genero</span>
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link to="/material"  >
                                                <span className="icon">
                                                    <AttachmentIcon className="fa" aria-hidden="true"></AttachmentIcon>
                                                </span>
                                                <span className="tittle">Material</span>
                                            </Link>
                                        </ListItem>
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        </ListItem>
                        
                    </UnorderedList>
                </Box>
            </React.Fragment>
        );
    }
}
export default SideBar;