import React,{Component} from 'react';
import { Flex,Center,Spacer, AvatarGroup,AiOutlineUser,Avatar} from "@chakra-ui/react";
import "./../../Assets/Css/Estilo.css";
import Toggle from "./Toggle"

class Nav extends Component{   
    handleClick() {
        var navegation = document.querySelector('.navegation') 
        var toggle = document.querySelector('.toggle') 
        navegation.classList.toggle('active')
        toggle.classList.toggle('active')
      }

    render(){
         
        return (
             <React.Fragment>
                 <Flex className="Nav" h="50" w="full"  bg="#EAECEE">
                    <Spacer />
                    <Flex>
                        <Center h="50px"w="50px" >
                            <AvatarGroup spacing="1rem">
                                <Avatar h="40px"w="40px"  bg="teal.500" />
                            </AvatarGroup>
                        </Center >
                        <Center onClick={this.handleClick} className="toggle"  h="50px" w="50px" >
                            <Toggle></Toggle>
                        </Center >
                    </Flex>
                </Flex>
            </React.Fragment>
        );
    }
}
export default Nav;