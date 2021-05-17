import React, { Component } from 'react'
import axios from 'axios'
import AreaDrawer from './area_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
    Text, Button, IconButton, Spacer, Flex, SimpleGrid, Drawer, Box,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react'
import SideBar from "../SideBar/SideBar";
import Nav from "../SideBar/Nav";
import { URL } from '../settings';

const areasUrl = URL + "area/"

class AreaPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            areas: [],
            areaSelected: { id: '', name: '', abbreviation: '' },
            drawerMode: 'closed',
            popoverOpen: false
        }
    }

    componentDidMount() {
        this.peticionGet()
    }

    peticionGet() {
        axios.get(areasUrl).then(res => {
            this.setState({ areas: res.data })
        }).catch(error => {
            console.log(error.message)
        })
    }

    peticionDelete = (id) => {
        axios.delete(areasUrl + id).then(res => {
            this.peticionGet()
        }).catch(error => {
            console.log(error.message)
        })

        this.setState({ popoverOpen: false })
    }

    drawerProps = (type, data) => {
        this.setState({ drawerMode: type, areaSelected: data, popoverOpen: false })
        type === 'closed' && this.peticionGet();
    }

    render() {
        return (
            <React.Fragment>
                <Box p="15px">
                    <Text className="Title">Configuraciones de Area</Text>
                </Box>

                <SimpleGrid justifyContent="center" >
                    <Box shadow="md" width="100%" borderWidth="1px" borderRadius="lg" className="mainBox" bg="white">
                        <Button colorScheme="twitter" position="right" onClick={() => { this.drawerProps('add', null) }}>Agregar área</Button>
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
                                {this.state.areas.map((area, index) => {
                                    return (
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{area.name}</Td>
                                            <Td>{area.abbreviation}</Td>
                                            <Td>
                                                <SimpleGrid columns={2} spacing="1">
                                                    <IconButton colorScheme="twitter" className="iconButtonRounded" onClick={() => { this.drawerProps('edit', area) }} icon={<FaPencilAlt />} />
                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverOpen === area.id}>
                                                        <PopoverTrigger>
                                                            <IconButton className="iconButtonRounded" onClick={() => { this.setState({ popoverOpen: area.id }) }} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar el área de " + area.name.toLowerCase() + "?"}</PopoverHeader>
                                                            <PopoverBody>
                                                                <Flex direction="row" >
                                                                    <Spacer />
                                                                    <SimpleGrid columns={2} spacing="25px">
                                                                        <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={() => { this.peticionDelete(area.id) }} />
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
                    <AreaDrawer {...this.state} drawerProps={this.drawerProps} areasUrl={areasUrl} />
                </Drawer>

            </React.Fragment>
        )
    }
}

export default AreaPage