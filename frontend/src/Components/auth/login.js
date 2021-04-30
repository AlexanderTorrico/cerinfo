import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText } from "@chakra-ui/react"

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { iniciarSesion } from "../actions/userActions";
export const Login = (props) => {
    let history = useHistory();
    const access_token = localStorage.getItem("access_token");
    if (access_token !== null) {
        history.push("/categorias");
      }
    const dispatch = useDispatch();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const clickIniciarSesion = () => {
        const datos = {
            email,
            password
        };
        console.log(datos);
        Axios.post("http://localhost:8000/api/login", datos)
            .then(response => {
                if (response.data.res === "success") {
                    localStorage.setItem("access_token", response.data.access_token);
                    dispatch(iniciarSesion());
                    localStorage.setItem("user", response.data.user.id);
                    localStorage.setItem("name", response.data.user.name);
                    console.log(response.data.user.id);
                    history.push('/categorias');
                } else {
                    console.log(response.data);
                    alert(' Hubo un error al registrar persona');
                }
            });

    }
    return (
        <div className="mt-3">
          
                    <FormLabel>Iniciar sesión</FormLabel>
                   
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Form.Control onChange={(e) => { setEmail(e.target.value) }} type="text" value={email} placeholder="Ingrese el email" />
                    </FormControl>
                    <FormControl>
                        <Form.Label>Contraseña</Form.Label>
                        <FormControl onChange={(e) => { setPassword(e.target.value) }} type="password" value={password} placeholder="Ingrese la contraseña" />
                    </FormControl>
                    <Button onClick={() => { clickIniciarSesion() }} variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                    <Link
            className="nav-link text-center all-tittles"
            to="/register"
          >
            Registro
          </Link>
               
       
        </div>
    )
}