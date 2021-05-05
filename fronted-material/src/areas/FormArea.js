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

export const FormArea= (props) => {

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
  const [abbreviation, setAbbreviation]= useState("");

  useEffect(() => {
    if (id != 0) {
      cargarArea(id);
    }
  }, []);

  const cargarArea = (id) => {
    axios.get("http://localhost:8000/api/area/" + id, { headers }).then(
      (response) => {
        if (response.data.res !== "success") {
          swal(
            "Error ❌!",
            "No se ha podido obtener la lista de Areas",
            "danger"
          );
          return;
        }

        const area = response.data.data;
        setName(area.name);
        setAbbreviation(area.abbreviation);
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
    const area = {
      name,
      abbreviation
    };
    if (id == 0) {
      enviarInsertar(area);
    } else {
      enviarActualizar(area, id);
    }
  };
  const enviarInsertar = (area) => {
    axios
      .post("http://localhost:8000/api/area/", area, { headers })
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
            "El nuevo Area fue añadido Correctamente!",
            "success"
          );
          history.push("/areas");
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
  const enviarActualizar = (area, id) => {
    axios
      .put("http://localhost:8000/api/area/" + id, area, { headers })
      .then(
        (response) => {
          if (response.data.res !== "success") {
            alert("error al enviar datos");
            return;
          }
          swal(
            "Buen Trabajo!",
            "El Area fue actualizada Correctamente!",
            "success"
          );
          history.push("/areas");
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
              Nueva Area
            </div>

            <form onSubmit={enviarDatos}>
              <input id="id" type="hidden" value={id} />
              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe el Area"
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
                  <label>Area</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe la Abrevacion"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="abbreviation"
                    value={abbreviation}
                    onChange={(event) => {
                      setAbbreviation(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>abreviación</label>
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
