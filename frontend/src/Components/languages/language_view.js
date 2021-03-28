import React, { Component } from 'react';
import {
    Flex, Input, Center, Button, Spacer, Container,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"

class LanguageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <Button colorScheme="blue" onClick={() => { this.setState({ modalOpen: !this.state.modalOpen }) }}>Drawer</Button>

                <Drawer isOpen={this.state.modalOpen} closeOnOverlayClick={()=>{ this.setState({ modalOpen: !this.state.modalOpen }) }}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <h1>Agregar Lenguaje</h1>
                        </DrawerHeader>
                        <DrawerBody>
                            <Flex direction="column" alignContent="center">
                                <Input placeholder="Nombre" w="300px" />
                                <Input placeholder="Sigla" w="300px" />
                            </Flex>
                        </DrawerBody>
                        <DrawerFooter>
                            <Container>
                                <Flex direction="row">
                                    <Button colorScheme="twitter">Si</Button>
                                    <Spacer />
                                    <Button  onClick={() => { this.setState({ modalOpen: !this.state.modalOpen }) }}>No</Button>
                                </Flex>
                            </Container>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default LanguageView