import React, { Component } from 'react'
import axios from 'axios'
//import './admin.css'
import AdminDrawer from './admin_drawer.js'
import { FaCheck, FaTimes, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
    Text, Button, IconButton, Spacer, Flex, SimpleGrid, Drawer, Box,
    Table, Thead, Tbody, Th, Tr, Td,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react'
import { URL } from '../settings';
import Cookies from "universal-cookie";

//const usersURL = URL + "users/"
let cookies = new Cookies();
class adminPage extends Component {
    
    constructor(props) {
        super(props);

        

        this.state = {
            users: [],
            userSelected: { id: '', name: '', email: '' },
            drawerMode: 'closed',
            popoverOpen: false
        }

        console.log(cookies.get("token"));
    }


    //const [listaUsuarios, setListaUsuarios] = useState([]);

    traerUsuarios = () => {
        let headers = {
            Authorization: "Bearer " + cookies.get("token")
        };
        axios.get("http://localhost:8000/api/usuario", {headers})
            .then((response) => {
                console.log(response.data);
                this.setState({ users: response.data.data })
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log(error)
                    //history.push("/login");
                }
            });
    };
    componentDidMount() {
        this.traerUsuarios()
    }

    peticionDelete = (id) => {
        axios.delete(URL + id).then(res => {
            this.peticionGet()
        }).catch(error => {
            console.log(error.message)
        })

        this.setState({ popoverOpen: false })
    }

    drawerProps = (type, data) => {
        console.log(data)
        this.setState({ drawerMode: type, userSelected: data, popoverOpen: false })
        type === 'closed' && this.traerUsuarios();
    }

    render() {
        return (
            <React.Fragment>
                <Box p="15px">
                    <Text className="Title">Usuarios</Text>
                </Box>

                <SimpleGrid justifyContent="center" >
                    <Box shadow="md" width="100%" borderWidth="1px" borderRadius="lg" className="mainBox" bg="white">
                        <Button colorScheme="twitter" position="right" onClick={() => { this.drawerProps('add', null) }}>Añadir nuevo usuario</Button>
                        <Table variant="striped" colorScheme="twitter" size="lg" spacing="40px">
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Nombre</Th>
                                    <Th>E-mail</Th>
                                    <Th>{"     "}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.users.map((user, index) => {
                                    return (
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td> 
                                            <Td>
                                                <SimpleGrid columns={2} spacing="1">
                                                    <IconButton colorScheme="twitter" className="iconButtonRounded" onClick={() => { this.drawerProps('edit', user) }} icon={<FaPencilAlt />} />
                                                    <Popover placement="right-end" autoFocus={true} isOpen={this.state.popoverOpen === user.id}>
                                                        <PopoverTrigger>
                                                            <IconButton className="iconButtonRounded" onClick={() => { this.setState({ popoverOpen: user.id }) }} icon={<FaTrashAlt />} />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>{"¿Esta seguro de eliminar al usuario " + user.name + "?"}</PopoverHeader>
                                                            <PopoverBody>
                                                                <Flex direction="row" >
                                                                    <Spacer />
                                                                    <SimpleGrid columns={2} spacing="25px">
                                                                        <IconButton colorScheme="twitter" icon={<FaCheck />} onClick={() => { this.peticionDelete(user.id) }} />
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
                    <AdminDrawer {...this.state} drawerProps={this.drawerProps} URL={URL} />
                </Drawer>
            </React.Fragment>
        )
    }
}

export default adminPage