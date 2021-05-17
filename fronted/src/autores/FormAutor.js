import React, { useState, useEffect } from "react";
import axios from "axios";
import "../estilos/css/material-design-iconic-font.min.css";
import "../estilos/css/normalize.css";
import "../estilos/css/bootstrap.min.css";
import "../estilos/css/jquery.mCustomScrollbar.css";
import "../estilos/css/estilo.css";
import "../estilos/css/timeline.css";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
    MiInput,
    MiBoton,
    MiGroup,
    MiColumnaSelect,
    MibarHigh,
  } from "../Component";

export const FormAutor= (props) => {

  let history = useHistory();
  const access_token = localStorage.getItem("access_token");
  if (access_token == null) {
    history.push("/login");
  }
  const headers = {
    Authorization: " Bearer " + access_token,
  };

  let { id } = props.match ? props.match.params : { id: 0 };
  const [name, setName] = useState("");
  const [country, setCountry]= useState("");
  const [city, setCity] = useState("");
  const [date_birth, setDate_Birth]= useState("");

  useEffect(() => {
    if (id != 0) {
      cargarAutor(id);
    }
  }, []);

  const cargarAutor = (id) => {
    axios.get("http://localhost:8000/api/autor/" + id, { headers }).then(
      (response) => {
        if (response.data.res !== "success") {
          swal(
            "Error ❌!",
            "No se ha podido obtener la lista de Autores",
            "danger"
          );
          return;
        }

        const autor = response.data.data;
        setName(autor.name);
        setCountry(autor.country);
        setCity(autor.city);
        setDate_Birth(autor.date_birth);
      },
      (error) => {
        if (error.response.status === 401) {
          swal(
            "Inicie Sesion!",
            "Se necesita una sesion iniciada para acceder",
            "info"
          );
          history.push("/login");
          return;
        }
        if (error.response.status === 403) {
          swal(
            "Lo siento ❌!",
            "Usted no tiene permiso para entrar a esta area",
            "info"
          );
          history.push("/login");
          return;
        }
        return error;
      }
    );
  };

  
  const enviarDatos = (e) => {
    e.preventDefault();
    const autor = {
      name,
      country,
      city,
      date_birth
    };
    if (id == 0) {
      enviarInsertar(autor);
    } else {
      enviarActualizar(autor, id);
    }
  };
  const enviarInsertar = (autor) => {
    axios
      .post("http://localhost:8000/api/autor/", autor, { headers })
      .then(
        (response) => {
          if (response.data.res !== "success") {
            swal(
              "Lo siento 😱!",
              "Verifique sus datos antes de enviar",
              "warning"
            );
            return;
          }
          swal(
            "Buen Trabajo!",
            "El nuevo Autor fue añadido Correctamente!",
            "success"
          );
          history.push("/autores");
        },
        (error) => {
          if (error.response.status === 401) {
            history.push("/login");
            return;
          }
          return error;
        }
      );
  };
  const enviarActualizar = (autor, id) => {
    axios
      .put("http://localhost:8000/api/autor/" + id, autor, { headers })
      .then(
        (response) => {
          if (response.data.res !== "success") {
            alert("error al enviar datos");
            return;
          }
          swal(
            "Buen Trabajo!",
            "El Autor fue actualizada Correctamente!",
            "success"
          );
          history.push("/autores");
        },
        (error) => {
          if (error.response.status === 401) {
            history.push("/login");
            return;
          }
          return error;
        }
      );
  };
  return (
    <>
    
      <div className="mt-3 text-center">
        <div className="container">
          <div className="page-header" xmlns="http://www.w3.org/1999/html">
            <h1 className="all-tittles">
              Biblioteca Virtual <small> Administración</small>
            </h1>
          </div>
        </div>
        <div className="container-fluid" style={{ margin: "50px 0" }}>
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-3">
              <img
                src={require("../estilos/img/book.png").default}
                alt="user"
                className="img-responsive center-box"
                style={{ maxWidth: "110px" }}
              ></img>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 text-justify lead">
              Bienvenido a Biblioteca Virtual Nur , el lugar donde estan los mejores libros,
               Hoy en dia somos lider nacional en
              publicaciones de libros.
            </div>
          </div>
        </div>

        <div className="container-fluid" >
          <div className="container-flat-form">
            <div className="title-flat-form title-flat-blue">
              Nuevo Autor
            </div>

            <form onSubmit={enviarDatos}>
              <input id="id" type="hidden" value={id} />
              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe el Autor"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Autor</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe su Pais"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="country"
                    value={country}
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Pais</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe su Ciudad"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="city"
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Ciudad</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="date_birth"
                    value={date_birth}
                    onChange={(event) => {
                      setDate_Birth(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Fecha de Nacimiento</label>
                </MiGroup>
              </MiColumnaSelect>







              <MiBoton><i class="zmdi zmdi-floppy"></i> &nbsp;&nbsp; Guardar  </MiBoton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
