import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from 'react-redux';

export const ListGenero = (props) => {
  let history = useHistory();
  const access_token = localStorage.getItem("access_token");
  if (access_token == null) {
    history.push("/login");
  }
  const headers = {
    Authorization: " Bearer " + access_token,
  };
  const [listaGeneros, setListaGeneros] = useState([]);

  useEffect(() => {
    traerGeneros();
    //console.log(traerCategorias);
  }, []);

  const traerGeneros = () => {
    axios
      .get("http://localhost:8000/api/gender", { headers })
      .then((response) => {
        console.log(response.data);
        setListaGeneros(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          history.push("/login");
        }
      });
  };

  const eliminarGenero = (id) => {
    swal({
      title: "Estas Seguro?",
      text: "Una vez eliminado, ¡no podrás recuperar este archivo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(
      (willDelete) => {
        if (willDelete) {
          axios.delete("http://localhost:8000/api/gender/" + id, {
            headers,
          });
          swal("Poof! El Genero  fue eliminado correctamente!", {
            icon: "success",
          });
          traerGeneros();
        } else {
          swal("Ha cancelado la eliminacion del Genero!");
        }
      },
      (error) => {
        if (error.response.status === 401) {
          history.push("/login");
          return;
        }
        if (error.response.status === 403) {
          history.push("/principal");
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
              Bienvenido a Biblioteca Virtual Nur , el lugar donde estan los
              mejores libros, Hoy en dia somos lider nacional en publicaciones
              de libros.
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <h2 className="text-center all-tittles">Lista de Generos</h2>
        </div>
        <div className="container-fluid">
          <Link
            className="nav-link text-center all-tittles"
            to="/generos/create"
          >
            Añadir de Genero
          </Link>
        </div>

        <Table className="table table-sm">
          <thead>
            <tr className="div-table-row div-table-head">
              <th className="div-table-cell">ID</th>
              <th className="div-table-cell">NOMBRE</th>
              <th className="div-table-cell">ACTUALIZAR</th>
              <th className="div-table-cell">ELIMINAR</th>
            </tr>
          </thead>
          <tbody>
            {listaGeneros.map((item) => (
              <tr key={"item-" + item.id}>
                <td className="div-table-cell">{item.id}</td>
                <td className="div-table-cell">{item.name}</td>
                <td className="div-table-cell">
                  <Link
                    to={"/generos/edit/" + item.id}
                    className="btn btn-primary"
                  >
                    <i className="zmdi zmdi-edit"></i>
                  </Link>
                </td>
                <td className="div-table-cell">
                  <Button
                    onClick={() => eliminarGenero(item.id)}
                    variant="danger"
                  >
                    <i className="zmdi zmdi-delete"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
