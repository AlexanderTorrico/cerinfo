import React,{Component} from 'react';
import { HamburgerIcon } from '@chakra-ui/icons'
import "./../../Assets/Css/Estilo.css"

class Toggle extends Component{   
    render(){ 
        return (
             <React.Fragment>   
                     <HamburgerIcon  />  
                         
            </React.Fragment>
        );
    }
}
export default Toggle;