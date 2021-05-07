import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch,Redirect,useHistory,Link, } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './auth/Login';
import {ListMaterial} from './materiales/ListMaterial';
import { FormMaterial } from './materiales/FormMaterial';
import {ListGenero} from './generos/ListGenero';
import { FormGenero } from './generos/FormGenero';
import {ListLenguaje} from './lenguajes/ListLenguaje';
import { FormLenguaje } from './lenguajes/FormLenguaje';
import { ListCategoria } from './categorias/ListCategoria';
import { FormCategoria } from './categorias/FormCategoria';
import { ListArea } from './areas/ListArea';
import { FormArea } from './areas/FormArea';
import { ListAutor } from './autores/ListAutor';
import { FormAutor } from './autores/FormAutor';
import { ListUsuario } from './usuarios/ListUsuario';
import { FormUsuarioAdministrador } from './usuarios/FormUsuarioAdministrador';
import { FormUsuarioMaster } from './usuarios/FormUsuarioMaster';
import { FormUsuarioAsistente } from './usuarios/FormUsuarioAsistente';
import { FormUsuarioEstudiante } from './usuarios/FormUsuarioEstudiante';
import { ListLibro } from "./libros/ListLibro";
import { FormLibro } from "./libros/FormLibro";
import {Header} from './Header';
import { cerrarSesion as logout, iniciarSesion } from "./actions/userActions";






function App() {
  let history = useHistory();

  const sesionIniciada = useSelector(
    (state) => state.user.datosSesion.sesionIniciada
  );
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  if (access_token && !sesionIniciada) {
    dispatch(iniciarSesion());
  }

  return (
    <BrowserRouter>
      {redirect && <Redirect to="/login" />}
      {/* Login */}

      <Route path="/login">
        <Login></Login>
      </Route>
      {sesionIniciada && (
        <>
          <Header></Header>

          <Route path="/materiales/edit/:id" component={FormMaterial}></Route>
          <Route path="/materiales/create">
            <FormMaterial />
          </Route>
          <Route exact path="/materiales">
            <ListMaterial />
          </Route>

          <Route path="/generos/edit/:id" component={FormGenero}></Route>
          <Route path="/generos/create">
            <FormGenero />
          </Route>
          <Route exact path="/generos">
            <ListGenero />
          </Route>

          <Route path="/lenguajes/edit/:id" component={FormLenguaje}></Route>
          <Route path="/lenguajes/create">
            <FormLenguaje />
          </Route>
          <Route exact path="/lenguajes">
            <ListLenguaje />
          </Route>

          <Route path="/areas/edit/:id" component={FormArea}></Route>
          <Route path="/areas/create">
            <FormArea />
          </Route>
          <Route exact path="/areas">
            <ListArea />
          </Route>

          <Route path="/categorias/edit/:id" component={FormCategoria}></Route>
          <Route path="/categorias/create">
            <FormCategoria />
          </Route>
          <Route exact path="/categorias">
            <ListCategoria />
          </Route>

          <Route path="/autores/edit/:id" component={FormAutor}></Route>
          <Route path="/autores/create">
            <FormAutor />
          </Route>
          <Route exact path="/autores">
            <ListAutor />
          </Route>

          <Route
            path="/usuarios/edit/:id"
            component={FormUsuarioAdministrador}
          ></Route>
          <Route path="/usuarios/createAdministrador">
            <FormUsuarioAdministrador />
          </Route>
          <Route path="/usuarios/createMaster">
            <FormUsuarioMaster />
          </Route>
          <Route path="/usuarios/createAsistente">
            <FormUsuarioAsistente />
          </Route>
          <Route path="/usuarios/createEstudiante">
            <FormUsuarioEstudiante />
          </Route>
          <Route exact path="/usuarios">
            <ListUsuario />
          </Route>


          <Route path="/libros/edit/:id" component={FormLibro}></Route>
          <Route path="/libros/create">
            <FormLibro />
          </Route>
          <Route exact path="/libros">
            <ListLibro />
          </Route>





        </>
      )}
    </BrowserRouter>
  );
}

export default App;
