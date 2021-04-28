import React, { Component } from 'react';
import axios from 'axios'
import { FaCheck, FaTimes } from "react-icons/fa";
import {
    Flex, Input, IconButton, Spacer, Container, Divider,
    DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent
} from "@chakra-ui/react"

class MaterialDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: { id: '', name: ''}
        }
    }

    componentDidMount() {
        if (this.props.drawerMode==='edit') {
            this.setState({inputs: this.props.langSelected})
        } else {
            this.setState({ inputs:{name: ''} })
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
        openCloseDrawer('closed', {id: '', name: ''})
    }

    peticionPost = () => {
        axios.post(this.props.materialUrl, this.state.inputs).then(res=>{
            this.closeDrawer()
        }).catch(error=>{
            console.log(error.message)
        })
        this.closeDrawer()
    }

    peticionPut = () => {
        axios.put(this.props.materialUrl+this.state.inputs.id, this.state.inputs).then(res=>{
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
                            {this.props.drawerMode==='add'? <h1>Añadir Material</h1> : <h1>Editar Material</h1> }
                            <br />
                            <Divider />
                        </DrawerHeader>

                        <DrawerBody>
                            <Flex direction="column" alignContent="center">
                                <label htmlFor="name" ><h1>Nombre</h1></label>
                                <Input
                                size="md" id="name" name="name"
                                value={this.state.inputs.name}
                                onChange={this.InputChanges.bind(this)}
                                />
                                <br />
                            </Flex>
                        </DrawerBody>

                        <DrawerFooter>
                            <Container>
                                <Divider />
                                <br />
                                <Flex direction="row">
                                    <IconButton
                                    colorScheme="twitter"
                                    onClick={this.props.drawerMode==='add'? ()=>{this.peticionPost()} : ()=>{this.peticionPut()}}
                                    disabled={this.state.inputs.name===''}
                                    icon={<FaCheck />}
                                    />
                                    <Spacer />
                                    <IconButton
                                    colorScheme="twitter" variant="outline"
                                    onClick={()=>{this.closeDrawer()}}
                                    icon={<FaTimes />}
                                />
                                </Flex>
                            </Container>
                        </DrawerFooter>
                    </DrawerContent>
            </React.Fragment>
        )
    }
}

export default MaterialDrawer