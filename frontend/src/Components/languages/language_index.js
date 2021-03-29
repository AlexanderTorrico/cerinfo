import React, { Component } from 'react'
import axios from 'axios'
import LanguageDrawer from './language_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
    Container, Button, IconButton, Spacer, Flex, Center, SimpleGrid,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react'

const languagesUrl = "http://127.0.0.1:8000/api/language/"

class LanguagePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            languages: [],
            langSelected: [],
            drawerMode: 'closed',
            popoverOpen: false
        }
    }

    componentDidMount() {
        this.peticionGet()
    }

    peticionGet() {
        axios.get(languagesUrl).then(res => {
            this.setState({ languages: res.data })
        }).catch(error => {
            console.log(error.message)
        })
    }

    peticionDelete = (id) => {
        axios.delete(languagesUrl + id).then(res => {
            this.peticionGet()
        }).catch(error => {
            console.log(error.message)
        })

        this.setState({ popoverOpen: false })
    }

    openCloseDrawer = (data) => {
        this.setState({ drawerMode: data, popoverOpen: false })

        if (data == 'closed') {
            this.peticionGet()
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Lenguajes</h1>
                <Container>
                    <Button colorScheme="twitter" isRound={true} onClick={() => { this.openCloseDrawer('add') }}>Agregar lenguaje</Button>
                    <Table variant="striped" colorScheme="twitter" size="lg" spacing="40px">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Nombre</Th>
                                <Th>Sigla</Th>
                                <Th>{"     "}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.state.languages.map((lang, index) => {
                                return (
                                    <Tr key={index+1}>
                                            <Td>{index+1}</Td>
                                            <Td>{lang.name}</Td>
                                            <Td>{lang.abbreviation}</Td>
                                            <Td>
                                                <SimpleGrid columns={2} spacing="30">
                                                <IconButton colorScheme="twitter" onClick={() => { this.openCloseDrawer('edit') }} isRound={true} icon={<FaPencilAlt />} />
                                                <Popover placement="right-end" isOpen={this.state.popoverOpen === lang.id}>
                                                    {({ isOpen, onClose }) => (<>
                                                        <PopoverTrigger>
                                                            <IconButton onClick={() => { this.setState({ popoverOpen: lang.id }) }} isRound={true} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar el idioma " + lang.name + "?"}</PopoverHeader>
                                                            <PopoverBody>
                                                                <Flex direction="row" >
                                                                    <Spacer />
                                                                    <SimpleGrid columns={2} spacing="25px">
                                                                        <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={() => { this.peticionDelete(lang.id) }} />
                                                                        <IconButton colorScheme="twitter" variant="outline" onClick={() => { this.setState({ popoverOpen: false }) }} icon={<FaTimes />} />
                                                                    </SimpleGrid>
                                                                    <Spacer />
                                                                </Flex>
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </>)}
                                                </Popover>
                                                </SimpleGrid>
                                            </Td>
                                        
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </Container>

                <LanguageDrawer {...this.state} openCloseDrawer={this.openCloseDrawer} languagesUrl={languagesUrl} />
            </React.Fragment>
        )
    }
}

export default LanguagePage