import React, { Component } from 'react';
import axios from 'axios'
import { FaCheck, FaTimes } from "react-icons/fa";
import {
    Flex, Input, Center, IconButton, Button, Spacer, Container, Stack, Divider, Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,s
} from "@chakra-ui/react"

class LanguageDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                id: '',
                name: '',
                abbreviation: ''
            }
        }
    }

    componentDidMount() {
        if (this.props.drawerMode=='edit') {
            this.setState({inputs: this.props.langSelected})
        }
    }

    InputChanges = (data) => {
        data.persist();
        this.setState({
            inputs: {
            ...this.state.inputs,
            [data.target.name]: data.target.value
            }
        })
    }

    closeDrawer = () => {
        const openCloseDrawer = this.props.drawerProps

        this.setState({
            inputs: {
                name: '',
                abbreviation: ''
            }
        })
        
        openCloseDrawer('closed', {id: '', name: '', abbreviation: ''})
    }

    peticionPost = () => {
        axios.post(this.props.languagesUrl, this.state.inputs).then(res=>{
            this.closeDrawer()
        }).catch(error=>{
            console.log(error.message)
        })
        this.closeDrawer()
    }

    peticionPut = () => {
        axios.put(this.props.languagesUrl+this.state.inputs.id, this.state.inputs).then(res=>{
            this.closeDrawer()
        }).catch(error=>{
            console.log(error.message)
        })
    }

    render() {
        return (
            <React.Fragment>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            {this.props.drawerMode==='add'? <h1>Añadir lenguaje</h1> : <h1>Editar lenguaje</h1> }
                            <br />
                            <Divider />
                        </DrawerHeader>

                        <DrawerBody>
                            <Flex direction="column" alignContent="center">
                                <label htmlFor="name" ><h1>Nombre</h1></label>
                                <Input
                                size="md"
                                id="name"
                                name="name"
                                value={this.state.inputs.name}
                                onChange={this.InputChanges.bind(this)}
                                />
                                <br />
                                <Input
                                size="md"
                                id="abbreviation"
                                name="abbreviation"
                                value={this.state.inputs.abbreviation}
                                onChange={this.InputChanges.bind(this)}
                                />
                                <label htmlFor="abbreviation"><h1>Sigla</h1></label>
                            </Flex>
                        </DrawerBody>

                        <DrawerFooter>
                            <Container>
                                <Divider />
                                <br />
                                <Flex direction="row">
                                    <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={this.props.drawerMode==='add'? ()=>{this.peticionPost()} : ()=>{this.peticionPut()} }/>
                                    <Spacer />
                                    <IconButton colorScheme="twitter" variant="outline" onClick={()=>{this.closeDrawer()}} icon={<FaTimes />} />
                                </Flex>
                            </Container>
                        </DrawerFooter>
                    </DrawerContent>
            </React.Fragment>
        )
    }
}


export default LanguageDrawer