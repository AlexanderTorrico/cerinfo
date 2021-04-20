import React, { Component } from 'react';
import axios from 'axios'
import { FaCheck, FaTimes } from "react-icons/fa";
import {
    Flex, Input, IconButton, Spacer, Container, Divider,
    DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent
} from "@chakra-ui/react"

class AreaDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: { id: '', name: '', abbreviation: '' }
        }
    }

    componentDidMount() {
        if (this.props.drawerMode==='edit') {
            this.setState({inputs: this.props.areaSelected})
        } else {
            this.setState({ inputs:{name: '', abbreviation: ''} })
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
        openCloseDrawer('closed', {id: '', name: '', abbreviation: ''})
    }

    peticionPost = () => {
        axios.post(this.props.areasUrl, this.state.inputs).then(res=>{
            this.closeDrawer()
        }).catch(error=>{
            console.log(error.message)
        })
        this.closeDrawer()
    }

    peticionPut = () => {
        axios.put(this.props.areasUrl+this.state.inputs.id, this.state.inputs).then(res=>{
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
                            {this.props.drawerMode==='add'? <h1>Añadir área</h1> : <h1>Editar área</h1> }
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
                                <label htmlFor="abbreviation"><h1>Sigla</h1></label>
                                <Input
                                size="md" id="abbreviation" name="abbreviation"
                                value={this.state.inputs.abbreviation}
                                onChange={this.InputChanges.bind(this)}
                                />
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
                                    disabled={this.state.inputs.name===''||this.state.inputs.abbreviation===''}
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

export default AreaDrawer