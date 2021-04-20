import React, { Component } from 'react';
import axios from 'axios'
import { FaCheck, FaTimes } from "react-icons/fa";
import {
    Flex, Input, IconButton, Spacer, Container, Divider,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent
} from "@chakra-ui/react"


class Autor_Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                id: '',
                name: '',
                country: '',
                city: '',
                date_birth: ''
            }
        }
    }

    componentDidMount() {
        if (this.props.drawerMode==='edit') {
            this.setState({inputs: this.props.langSelected})
        } else {
            this.setState({ inputs:{name: '', country: '',city: '',date_birth: ''} })
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
        openCloseDrawer('closed', {id: '', name: '', country: '',city: '',date_birth: ''})
    }

    peticionPost = () => {
        axios.post(this.props.authorUrl, this.state.inputs).then(res=>{
            console.log()
            this.closeDrawer()
        }).catch(error=>{
            console.log(this.state.inputs)
            console.log(error.message)
        })
        this.closeDrawer()
    }

    peticionPut = () => {
        axios.put(this.props.authorUrl+this.state.inputs.id, this.state.inputs).then(res=>{
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
                            {this.props.drawerMode==='add'? <h1>Añadir Autor</h1> : <h1>Editar Autor</h1> }
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
                                <label htmlFor="country"><h1>Pais</h1></label>
                                <Input
                                size="md" id="country" name="country"
                                value={this.state.inputs.country}
                                onChange={this.InputChanges.bind(this)}
                                />
                                <br />
                                <label htmlFor="city"><h1>Ciudad</h1></label>
                                <Input
                                size="md" id="city" name="city"
                                value={this.state.inputs.city}
                                onChange={this.InputChanges.bind(this)}
                                />
                                <br />
                                <label htmlFor="date"><h1>Fecha de Nacimiento</h1></label>
                                <Input type='date'
                                size="md" id="date_birth" name="date_birth"
                                value={this.state.inputs.date_birth}
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
export default Autor_Form;