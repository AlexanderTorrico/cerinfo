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
    MiSelect
  } from "../Component";

export const FormLibro= (props) => {

  let history = useHistory();
  const access_token = localStorage.getItem("access_token");
  if (access_token == null) {
    history.push("/login");
  }
  const headers = {
    Authorization: " Bearer " + access_token,
  };

  let { id } = props.match ? props.match.params : { id: 0 };
  const [title, setTitle] = useState("");
  const [detail, setDetail]= useState("");
  const [sigTop, setSigtop] = useState("");
  const [dewey, setDewey]= useState("");
  const [cuter, setCuter] = useState("");
  const [available, setAvailable]= useState("");
  const [show, setShow] = useState("");
  const [author_id, setAuthor_id]= useState("");
  const [gender_id , setGender_id]= useState("");
  const [language_id, setLanguage_id] = useState("");
  const [material_id, setMaterial_id]= useState("");

  useEffect(() => {
    if (id != 0) {
      cargarLibro(id);
    }
  }, []);

  const cargarLibro = (id) => {
    axios.get("http://localhost:8000/api/libro/" + id, { headers }).then(
      (response) => {
        if (response.data.res !== "success") {
          swal(
            "Error ❌!",
            "No se ha podido obtener la lista de Libros",
            "danger"
          );
          return;
        }

        const libro = response.data.data;
        setTitle(libro.title);
        setDetail(libro.detail);
        setSigtop(libro.sigTop);
        setDewey(libro.dewey);
        setCuter(libro.cuter);
        setAvailable(libro.available);
        setShow(libro.show);
        setAuthor_id(libro.author_id);
        setGender_id(libro.gender_id);
        setLanguage_id(libro.language_id);
        setMaterial_id(libro.material_id);
    
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
    const libro = {
      title,
      detail,
      sigTop,
      dewey,
      cuter,
      available,
      show,
      author_id,
      gender_id,
      language_id,
      material_id
    };
    if (id == 0) {
      enviarInsertar(libro);
    } else {
      enviarActualizar(libro, id);
    }
  };
  const enviarInsertar = (libro) => {
    axios
      .post("http://localhost:8000/api/libro/", libro, { headers })
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
            "El nuevo Libro fue añadido Correctamente!",
            "success"
          );
          history.push("/libros");
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
  const enviarActualizar = (libro, id) => {
    axios
      .put("http://localhost:8000/api/libro/" + id, libro, { headers })
      .then(
        (response) => {
          if (response.data.res !== "success") {
            alert("error al enviar datos");
            return;
          }
          swal(
            "Buen Trabajo!",
            "El Libro fue actualizada Correctamente!",
            "success"
          );
          history.push("/libros");
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

  const [listaAutores, setListaAutores] = useState([]);
  useEffect(() => {
    traerAutores();
  }, []);
  const traerAutores = (event) => {
    axios.get("http://localhost:8000/api/autorIndex").then((response) => {
      let respuesta = response.data;
    console.log(respuesta.respuesta);
      setListaAutores(respuesta.data);
    });
  };

  const [listaGeneros, setListaGeneros] = useState([]);
  useEffect(() => {
    traerGeneros();
  }, []);
  const traerGeneros = (event) => {
    axios.get("http://localhost:8000/api/genderIndex/").then((response) => {
      let respuesta = response.data;
      setListaGeneros(respuesta.data);
    });
  };

  const [listaLenguajes, setListaLenguajes] = useState([]);
  useEffect(() => {
    traerLenguajes();
  }, []);
  const traerLenguajes = (event) => {
    axios.get("http://localhost:8000/api/languageIndex/").then((response) => {
      let respuesta = response.data;
      setListaLenguajes(respuesta.data);
    });
  };

  const [listaMateriales, setListaMateriales] = useState([]);
  useEffect(() => {
    traerMateriales();
  }, []);
  const traerMateriales = (event) => {
    axios.get("http://localhost:8000/api/materialIndex/" ).then((response) => {
      let respuesta = response.data;
      setListaMateriales(respuesta.data);
    });
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
              Nuevo Libro
            </div>

            <form onSubmit={enviarDatos}>
              <input id="id" type="hidden" value={id} />
              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe el titulo"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="name"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Libro</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe el detalle"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="country"
                    value={detail}
                    onChange={(event) => {
                      setDetail(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Detalle</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escribe su SigTop"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="city"
                    value={sigTop}
                    onChange={(event) => {
                      setSigtop(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>SigTop</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escriba su Dewey"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="date_birth"
                    value={dewey}
                    onChange={(event) => {
                      setDewey(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Dewey</label>
                </MiGroup>
              </MiColumnaSelect>

              <MiColumnaSelect>
                <MiGroup>
                  <MiInput
                    type="text"
                    placeholder="Escriba su Cuter"
                    required=""
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                    maxLength="70"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="solo caracteres"
                    id="date_birth"
                    value={cuter}
                    onChange={(event) => {
                      setCuter(event.target.value);
                    }}
                  />
                  <MibarHigh></MibarHigh>
                  <label>Cuter</label>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <span>Disponible</span>
                  <MiSelect
                    value={available}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Una Opcion"
                    id="available"
                    onChange={(event) => {
                      setAvailable(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                     <option value="0">Si</option> 
                     <option value="1">No</option>
                   
                  </MiSelect>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <span>Visible</span>
                  <MiSelect
                    value={show}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Una Opcion"
                    id="show"
                    onChange={(event) => {
                      setShow(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                     <option value="0">Si</option> 
                     <option value="1">No</option>
                   
                  </MiSelect>
                </MiGroup>
              </MiColumnaSelect>


             
              <MiColumnaSelect>
                <MiGroup>
                  <span>Autor</span>
                  <MiSelect
                    value={author_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Una Ciudad"
                    id="ciudad_id"
                    onChange={(event) => {
                      setAuthor_id(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaAutores.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </MiSelect>
                </MiGroup>
              </MiColumnaSelect>



              <MiColumnaSelect>
                <MiGroup>
                  <span>Genero</span>
                  <MiSelect
                    value={gender_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Un Genero"
                    id="gender_id"
                    onChange={(event) => {
                      setGender_id(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaGeneros.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </MiSelect>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <span>Lenguaje</span>
                  <MiSelect
                    value={language_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Un Lenguaje"
                    id="language_id"
                    onChange={(event) => {
                      setLanguage_id(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaLenguajes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </MiSelect>
                </MiGroup>
              </MiColumnaSelect>


              <MiColumnaSelect>
                <MiGroup>
                  <span>Material</span>
                  <MiSelect
                    value={material_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige Un Material"
                    id="material_id"
                    onChange={(event) => {
                      setMaterial_id(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaMateriales.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </MiSelect>
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
