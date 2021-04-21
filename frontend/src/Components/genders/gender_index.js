import React, { Component } from 'react'
import axios from 'axios'
import './gender.css'
import GenderDrawer from './gender_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
    Text, Button, IconButton, Spacer, Flex, SimpleGrid, Drawer, Box,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react'
import { URL } from '../settings';

const gendersUrl = URL + "gender/"

class GenderPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genders: [],
            langSelected: { id: '', name: '' },
            drawerMode: 'closed',
            popoverOpen: false
        }
    }

    componentDidMount() {
        this.peticionGet()
    }

    peticionGet() {
        axios.get(gendersUrl).then(res => {
            this.setState({ genders: res.data })
        }).catch(error => {
            console.log(error.message)
        })
    }

    peticionDelete = (id) => {
        axios.delete(gendersUrl + id).then(res => {
            this.peticionGet()
        }).catch(error => {
            console.log(error.message)
        })

        this.setState({ popoverOpen: false })
    }

    drawerProps = (type, data) => {
        this.setState({ drawerMode: type, langSelected: data, popoverOpen: false })
        type === 'closed' && this.peticionGet();
    }

    render() {
        return (
            <React.Fragment>
                <Box bg="white" p="15px">
                    <Text className="Title">Configuraciones de Genero</Text>
                </Box>

                <SimpleGrid justifyContent="center" >
                    <Box shadow="md" width="100%" borderWidth="1px" borderRadius="lg" className="mainBox" bg="white">
                        <Button colorScheme="twitter"  position="right" onClick={() => { this.drawerProps('add', null) }}>Agregar Genero</Button>
                        <Table variant="striped" colorScheme="twitter" size="lg" spacing="40px">
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Nombre</Th>
                                    <Th>{"     "}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.genders.map((lang, index) => {
                                    return (
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{lang.name}</Td>
                                            <Td>
                                                <SimpleGrid columns={2} spacing="1">
                                                    <IconButton colorScheme="twitter" className="iconButtonRounded" onClick={() => { this.drawerProps('edit', lang) }} icon={<FaPencilAlt />} />
                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverOpen === lang.id}>
                                                        <PopoverTrigger>
                                                            <IconButton className="iconButtonRounded" onClick={() => { this.setState({ popoverOpen: lang.id }) }} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar el Genero " + lang.name.toLowerCase() + "?"}</PopoverHeader>
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
                                                    </Popover>
                                                </SimpleGrid>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                </SimpleGrid>

                <Drawer isOpen={this.state.drawerMode !== 'closed'}>
                    <GenderDrawer {...this.state} drawerProps={this.drawerProps} gendersUrl={gendersUrl} />
                </Drawer>
            </React.Fragment>
        )
    }
}

export default GenderPage