import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import { cerrarSesion as logout, iniciarSesion } from "./actions/userActions";


export const Header = (props) => {
  let history = useHistory();

  const sesionIniciada = useSelector(
    (state) => state.user.datosSesion.sesionIniciada
  );
  const dispatch = useDispatch();

  const access_token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  if (access_token && !sesionIniciada) {
    dispatch(iniciarSesion());
  }

  const cerrarSesion = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("access_token");
    history.push("/login");
  };

  return (
    <>
      <script></script>
      <Navbar bg="dark" variant="dark">
        <Link className="navbar-brand" to="/">
          Biblioteca Virtual
      </Link>

        <NavDropdown title="Prestamos" id="material-dropdown">
          <Link to="/prestamos" className="dropdown-item">
            Prestamos
            </Link>
        </NavDropdown>

        <NavDropdown title="Material" id="material-dropdown">
          <Link to="/materiales" className="dropdown-item">
            Lista de Material
            </Link>
          <Link to="/materiales/create" className="dropdown-item">
            Crear Material
            </Link>
        </NavDropdown>

        <NavDropdown title="Genero" id="genero-dropdown">
          <Link to="/generos" className="dropdown-item">
            Lista de Genero
            </Link>
          <Link to="/generos/create" className="dropdown-item">
            Crear Genero
            </Link>
        </NavDropdown>


        <NavDropdown title="Lenguaje" id="lenguaje-dropdown">
          <Link to="/lenguajes" className="dropdown-item">
            Lista de Lenguaje
            </Link>
          <Link to="/lenguajes/create" className="dropdown-item">
            Crear Lenguaje
            </Link>
        </NavDropdown>



        <NavDropdown title="Area" id="area-dropdown">
          <Link to="/areas" className="dropdown-item">
            Lista de Area
            </Link>
          <Link to="/areas/create" className="dropdown-item">
            Crear Area
            </Link>
        </NavDropdown>



        <NavDropdown title="Categoria" id="categoria-dropdown">
          <Link to="/categorias" className="dropdown-item">
            Lista de Categoria
            </Link>
          <Link to="/categorias/create" className="dropdown-item">
            Crear Categoria
            </Link>
        </NavDropdown>



        <NavDropdown title="Autor" id="autor-dropdown">
          <Link to="/autores" className="dropdown-item">
            Lista de Autor
            </Link>
          <Link to="/autores/create" className="dropdown-item">
            Crear Autor
            </Link>
        </NavDropdown>



        <NavDropdown title="Usuario" id="autor-dropdown">
          <Link to="/usuarios" className="dropdown-item">
            Lista de Usuario
            </Link>
          <Link to="/usuarios/createAdministrador" className="dropdown-item">
            Crear Usuario Administrador
            </Link>
          <Link to="/usuarios/createMaster" className="dropdown-item">
            Crear Usuario Master
            </Link>
          <Link to="/usuarios/createAsistente" className="dropdown-item">
            Crear Usuario Asistente
            </Link>
          <Link to="/usuarios/createEstudiante" className="dropdown-item">
            Crear Usuario Estudiante
            </Link>
        </NavDropdown>


        <NavDropdown title="Lbro" id="libro-dropdown">
          <Link to="/libros" className="dropdown-item">
            Lista de Libros
            </Link>
          <Link to="/libros/create" className="dropdown-item">
            Crear Libro
            </Link>
        </NavDropdown>




        <Nav.Item className="ml-auto">
          {sesionIniciada && (
            <a
              onClick={cerrarSesion}
              className="nav-link btn btn-default"
              style={{ cursor: "pointer" }}
            >
              Cerrar sesión
            </a>
          )}
        </Nav.Item>

      </Navbar>
    </>
  );
};