import React, { Component } from 'react'
import axios from 'axios'
import './language.css'
import LanguageDrawer from './language_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt, FaSistrix } from "react-icons/fa";
import {
    Text, Button, IconButton, Spacer, Flex, Input, InputRightElement, Container, SimpleGrid, Drawer, Divider, Box,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react'

const languagesUrl = "http://127.0.0.1:8000/api/language/"

//const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

class LanguagePage extends Component {
    constructor(props) {
        super(props);

        this.searchInput = React.createRef()

        this.state = {
            languages: [],
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

        this.setState({ popoverSeeker: false, popoverList: false })
    }


    drawerProps = (type, data) => {
        this.setState({ drawerMode: type, langSelected: data, popoverSeeker: false, popoverList: false })
        type === 'closed' && this.peticionGet();
    }

    /*openCloseDrawer = (data, obj) => {
        this.setState({ drawerMode: data, popoverSeeker: false, popoverList: false })

        switch (data) {
            case 'closed':
                this.peticionGet()
                break;
            case 'edit':
                this.setState({
                    langSelected: {
                        id: obj.id, name: obj.name, abbreviation: obj.abbreviation
                    }
                })
                break;
            default:
                break;
        }
    } */

    render() {
        return (
            <React.Fragment>
                <Box bg="white" p="15px">
                    <Text className="Title">Configuraciones de lenguaje</Text>
                </Box>

                <SimpleGrid justifyContent="center" >
                    <Box shadow="md" width="100%" borderWidth="1px" borderRadius="lg" className="mainBox" bg="white">
                        <Button colorScheme="twitter" isRound={true} position="right" onClick={() => { this.drawerProps('add', null) }}>Agregar lenguaje</Button>
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
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{lang.name}</Td>
                                            <Td>{lang.abbreviation}</Td>
                                            <Td>
                                                <SimpleGrid columns={2} spacing="10">
                                                    <IconButton colorScheme="twitter" onClick={() => { this.drawerProps('edit', lang) }} isRound={true} icon={<FaPencilAlt />} />
                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverList === lang.id}>
                                                        <PopoverTrigger>
                                                            <IconButton onClick={() => { this.setState({ popoverList: lang.id }) }} isRound={true} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar el idioma " + lang.name + "?"}</PopoverHeader>
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
                    <LanguageDrawer {...this.state} drawerProps={this.drawerProps} languagesUrl={languagesUrl} />
                </Drawer>
            </React.Fragment>
        )
    }
}

export default LanguagePage