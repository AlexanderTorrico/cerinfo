import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from 'react-redux';
export const ListMaterial = (props) => {

 const access_token = localStorage.getItem("access_token");
  if (access_token === null) {
    history.push("/login");
  }
  let history = useHistory();

  const headers = {
    Authorization: " Bearer " + access_token,
  };
  const [listaMateriales, setListaMateriales] = useState([]);

  useEffect(() => {
    traerMateriales();
    //console.log(traerCategorias);
  }, []);

  const traerMateriales = () => {
    axios
      .get("http://localhost:8000/api/material", { headers })
      .then((response) => {
        console.log(response.data);
        setListaMateriales(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          history.push("/login");
        }
      });
  };

  const eliminarMaterial = (id) => {
    swal({
      title: "Estas Seguro?",
      text: "Una vez eliminado, ¡no podrás recuperar este archivo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(
      (willDelete) => {
        if (willDelete) {
          axios.delete("http://localhost:8000/api/material/" + id, {
            headers,
          });
          swal("Poof! El material  fue eliminado correctamente!", {
            icon: "success",
          });
          traerMateriales();
        } else {
          swal("Ha cancelado la eliminacion del Material!");
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
          <h2 className="text-center all-tittles">Lista de Materiales</h2>
        </div>
        <div className="container-fluid">
          <Link
            className="nav-link text-center all-tittles"
            to="/materiales/create"
          >
            Añadir de Material
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
            {listaMateriales.map((item) => (
              <tr key={"item-" + item.id}>
                <td className="div-table-cell">{item.id}</td>
                <td className="div-table-cell">{item.name}</td>
                <td className="div-table-cell">
                  <Link
                    to={"/materiales/edit/" + item.id}
                    className="btn btn-primary"
                  >
                    <i className="zmdi zmdi-edit"></i>
                  </Link>
                </td>
                <td className="div-table-cell">
                  <Button
                    onClick={() => eliminarMaterial(item.id)}
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
