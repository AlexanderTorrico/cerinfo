import React, { Component } from 'react'
import axios from 'axios'
import './language.css'
import LanguageDrawer from './language_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt, FaSistrix } from "react-icons/fa";
import {
    Center, Button, IconButton, Spacer, Flex, Input, InputRightElement, InputGroup, SimpleGrid, Drawer, Divider, Box,
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
        type==='closed'&& this.peticionGet();
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
                <h1>Lenguajes</h1>
                <Center>
                <SimpleGrid columns={2} spacingX="30px" >
                    <Box shadow="md" width="600px" borderWidth="1px">
                        <InputGroup>
                            <Input
                            ref={this.searchInput}
                            id="search" name="search"
                            />
                            <InputRightElement>
                                <IconButton
                                    colorScheme="twitter"
                                    icon={<FaSistrix />}
                                    onClick={() => { this.setState({ search: this.searchInput.current.value }) }}
                                />
                            </InputRightElement>
                        </InputGroup>

                        {
                            this.state.search === "" ? <React.Fragment><br/><h1>Buscar lenguaje</h1></React.Fragment> :
                                <Table variant="striped" colorScheme="twitter" size="lg">
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Nombre</Th>
                                            <Th>Sigla</Th>
                                            <Th>{"     "}</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            this.state.languages.map((lang, index) => {
                                                if (lang.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) || lang.abbreviation.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
                                                    return (
                                                        <Tr key={index+1}>
                                                            <Td className="tede">{index+1}</Td>
                                                            <Td className="tede">{lang.name}</Td>
                                                            <Td className="tede">{lang.abbreviation}</Td>
                                                            <Td className="tede">
                                                                <SimpleGrid columns={2} spacing="10">
                                                                    <IconButton colorScheme="twitter" onClick={() => { this.drawerProps('edit', lang) }} isRound={true} icon={<FaPencilAlt />} />
                                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverSeeker === lang.id}>
                                                                            <PopoverTrigger>
                                                                                <IconButton onClick={() => { this.setState({ popoverSeeker: lang.id }) }} isRound={true} icon={<FaTrashAlt />} />
                                                                            </PopoverTrigger>
                                                                            <PopoverContent>
                                                                                <PopoverArrow />
                                                                                <PopoverHeader>{"¿Esta seguro de eliminar el idioma " + lang.name + "?"}</PopoverHeader>
                                                                                <PopoverBody>
                                                                                    <Flex direction="row" >
                                                                                        <Spacer />
                                                                                        <SimpleGrid columns={2} spacing="25px">
                                                                                            <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={() => { this.peticionDelete(lang.id) }} />
                                                                                            <IconButton colorScheme="twitter" variant="outline" onClick={() => { this.setState({ popoverSeeker: false }) }} icon={<FaTimes />} />
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
                                            })
                                        }
                                    </Tbody>
                                </Table>
                        }
                    </Box>

                    <Box shadow="md" width="600px" borderWidth="1px">
                        <Button colorScheme="twitter" isRound={true} onClick={() => { this.drawerProps('add', null) }}>Agregar lenguaje</Button>
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
                </Center>

                <Drawer isOpen={this.state.drawerMode !== 'closed'}>
                    <LanguageDrawer {...this.state} openCloseDrawer={this.drawerProps} languagesUrl={languagesUrl} />
                </Drawer>
            </React.Fragment>
        )
    }
}

export default LanguagePage