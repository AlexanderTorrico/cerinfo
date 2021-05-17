import React, { Component } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Flex,
  Input,
  Select,
  Text,
  IconButton,
  Spacer,
  Container,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

class AdminDrawer extends Component {
  constructor(props) {
    super(props);

    this.userType = React.createRef();

    this.state = {
      inputs: { id: "", name: "", email: "", password: "", passwordConfirm: "" }
    };
  }

  componentDidMount() {
    if (this.props.drawerMode === "edit") {
      this.setState({ inputs: this.props.userSelected });
    } else {
      this.setState({ inputs: { id: "", name: "", email: "", password: "", passwordConfirm:"" } });
    }
  }

  InputChanges = (data) => {
    data.persist();
    this.setState({
      inputs: {
        ...this.state.inputs,
        [data.target.name]: data.target.value,
      },
    });
    console.log(this.state.inputs.password+" || "+this.state.inputs.passwordConfirm)
  };

  closeDrawer = () => {
    const openCloseDrawer = this.props.drawerProps;
    openCloseDrawer("closed", { id: "", name: "", email: "", password: "" });
  };

  peticionPost = () => {
    axios
      .post(this.props.URL+this.userType.current.value, this.state.inputs)
      .then((res) => {
        this.closeDrawer();
      })
      .catch((error) => {
        console.log(error.message);
      });
    this.closeDrawer();
  };

  peticionPut = () => {
    axios
      .put(this.props.URL+this.userType.current.value + this.state.inputs.id, this.state.inputs)
      .then((res) => {
        this.closeDrawer();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <React.Fragment>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {this.props.drawerMode === "add" ? (
              <h1>Nuevo usuario</h1>
            ) : (
              <h1>Editar usuario</h1>
            )}
            <Divider />
          </DrawerHeader>

          <DrawerBody>
            <Flex direction="column" alignContent="center">
              <label htmlFor="name">
                <h1>Nombre</h1>
              </label>
              <Input
                size="md"
                id="name"
                name="name"
                value={this.state.inputs.name}
                onChange={this.InputChanges.bind(this)}
              />
              <br />
              <label htmlFor="email">
                <h1>E-mail</h1>
              </label>
              <Input
                size="md"
                id="email"
                name="email"
                value={this.state.inputs.email}
                onChange={this.InputChanges.bind(this)}
              />
              <br />
              <label htmlFor="selectUser">
                <h1>Tipo de usuario</h1>
              </label>
              <Select ref={this.userType} size="md" id="selectUser">
                <option value="registerMaster">Administrador</option>
                <option value="registerAssistant">Beca</option>
              </Select>
              <br />
              <label htmlFor="password">
                <h1>Contraseña</h1>
              </label>
              <Input
                size="md"
                type="password"
                id="password"
                name="password"
                value={this.state.inputs.password}
                onChange={this.InputChanges.bind(this)}
              />
              <br />
              <label htmlFor="passwordConfirm">
                <h1>Confirmar contraseña</h1>
              </label>
              <Input
                isInvalid={this.state.inputs.password!==this.state.inputs.passwordConfirm}
                size="md"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.InputChanges.bind(this)}
              />
              <Text color="red">{this.state.inputs.password!==this.state.inputs.passwordConfirm? "Las contraseñas no coinciden" : ""}</Text>

            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Container>
              <Divider />
              <br />
              <Flex direction="row">
                <IconButton
                  colorScheme="twitter"
                  onClick={
                 //()=>{console.log(this.state.inputs)}
                    this.props.drawerMode === "add"
                      ? () => {
                          this.peticionPost();
                        }
                      : () => {
                          this.peticionPut();
                        }
                  }
                  disabled={
                    this.state.inputs.name === "" ||this.state.inputs.email === ""|| this.state.inputs.password === "" || this.state.inputs.passwordConfirm === "" ||this.state.inputs.password!==this.state.inputs.passwordConfirm
                  }
                  icon={<FaCheck />}
                />
                <Spacer />
                <IconButton
                  colorScheme="twitter"
                  variant="outline"
                  onClick={() => {
                    this.closeDrawer();
                  }}
                  icon={<FaTimes />}
                />
              </Flex>
            </Container>
          </DrawerFooter>
        </DrawerContent>
      </React.Fragment>
    );
  }
}

export default AdminDrawer;
