import React, { Component } from 'react';
import "./../../Assets/Css/Estilo.css";
import axios from 'axios'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
    Text, Button, IconButton, Spacer, Flex, SimpleGrid, Drawer, Box,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react'
import CategoriaForm from '../Form/Categoria_Form'
const categoriaUrl = "http://127.0.0.1:8000/api/categoria/"

class Categoria_List extends Component {
    constructor(props) {
        super(props);

        this.searchInput = React.createRef()

        this.state = {
            categoria: [],
            langSelected: {
                id: '',
                name: '',
                abbreviation: ''
            },
            search: "",
            drawerMode: 'closed',
            popoverSeeker: false,
            popoverList: false
        }
    }

    componentDidMount() {
        this.peticionGet()
    }

    peticionGet() {
        axios.get(categoriaUrl).then(res => {
            this.setState({ categoria: res.data })
        }).catch(error => {
            console.log(error.message)
        })
    }

    peticionDelete = (id) => {
        axios.delete(categoriaUrl + id).then(res => {
            this.peticionGet()
        }).catch(error => {
            console.log(error.message)
        })

        this.setState({ popoverSeeker: false, popoverList: false })
    }


    drawerProps = (type, data) => {
        this.setState({ drawerMode: type, langSelected: data, popoverSeeker: false, popoverList: false })
        type === 'closed' && this.peticionGet();
    }

    render() {
        return (
            <React.Fragment>
                <Box bg="white" p="15px">
                    <Text className="Title">Configuraciones de Categoria</Text>
                </Box>

                <SimpleGrid justifyContent="center" >
                    <Box shadow="md" width="100%" borderWidth="1px" borderRadius="lg" className="mainBox" bg="white">
                        <Button colorScheme="twitter"  position="right" onClick={() => { this.drawerProps('add', null) }}>Agregar Categoria</Button>
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
                                {this.state.categoria.map((lang, index) => {
                                    return (
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{lang.name}</Td>
                                            <Td>{lang.abbreviation}</Td>
                                            <Td>
                                                <SimpleGrid columns={2} spacing="1">
                                                    <IconButton colorScheme="twitter" className="iconButtonRounded" onClick={() => { this.drawerProps('edit', lang) }} icon={<FaPencilAlt />} />
                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverList === lang.id}>
                                                        <PopoverTrigger>
                                                            <IconButton className="iconButtonRounded" onClick={() => { this.setState({ popoverList: lang.id }) }} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar el Autor " + lang.name.toLowerCase() + "?"}</PopoverHeader>
                                                            <PopoverBody>
                                                                <Flex direction="row" >
                                                                    <Spacer />
                                                                    <SimpleGrid columns={2} spacing="25px">
                                                                        <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={() => { this.peticionDelete(lang.id) }} />
                                                                        <IconButton colorScheme="twitter" variant="outline" onClick={() => { this.setState({ popoverList: false }) }} icon={<FaTimes />} />
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
                    <CategoriaForm {...this.state} drawerProps={this.drawerProps} categoriaUrl={categoriaUrl} />
                </Drawer>
            </React.Fragment>
        )
    }
}
export default Categoria_List;