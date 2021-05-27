import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from 'react-redux';

const access_token = localStorage.getItem("access_token");

const headers = {
    Authorization: " Bearer " + access_token,
};

export class ListPrestamo extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            cliente: {name: "", last_name: "", mother_last_name: ""},
            prestamos: []
        })
    }

    componentDidMount() {
        if (access_token === null) {
            window.location.href("/login")
        }
    }

    traerPrestamos = (obj) => {
        axios
            .get("http://localhost:8000/api/active_loans/" + obj, { headers })
            .then((response) => {
                console.log(response.data.data.client[0])
                this.setState({cliente: response.data.data.client[0]})
                this.setState({prestamos: response.data.data.loans});
                //document.getElementById('client_name').innerText(response.data.data.client[0].name)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    this.setState({prestamos:[], cliente: {name: "", last_name: "", mother_last_name: ""}})
                }
            });
    };

    eliminarPrestamo = (id) => {
        swal({
            title: "Estas Seguro?",
            text: "Una vez eliminado, ¡no podrás recuperar este archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(
            (willDelete) => {
                if (willDelete) {
                    axios.delete("http://localhost:8000/api/active_loans/492140" + id, {
                        headers,
                    });
                    swal("Poof! El Prestamo  fue eliminado correctamente!", {
                        icon: "success",
                    });
                    this.traerPrestamos();
                } else {
                    swal("Ha cancelado la eliminacion del Prestamo!");
                }
            },
            (error) => {
                if (error.response.status === 401) {
                    window.location.href("/login");
                }
                if (error.response.status === 403) {
                    window.location.href("/principal");
                }
            }
        );
    };

    render() {
        return (
            <React.Fragment>
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
                                <Table className="table table-sm">
                                    <thead>
                                        <tr className="div-table-row div-table-head">
                                            <th className="div-table-cell">ID</th>
                                            <th className="div-table-cell">NOMBRE</th>
                                            <th className="div-table-cell">BUSCAR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="div-table-cell"><input type="text" id="input_id" /></td>
                                            <td className="div-table-cell"><label htmlFor="input_id" id="client-name">{this.state.cliente.name+" "+this.state.cliente.last_name+" "+this.state.cliente.mother_last_name}</label></td>
                                            <td className="div-table-cell">
                                                <Button
                                                    onClick={() => { this.traerPrestamos(document.getElementById('input_id').value) }}
                                                    variant="btn btn-primary"
                                                >
                                                    <i className="zmdi zmdi-search"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <h2 className="text-center all-tittles">Lista de Prestamos</h2>
                    </div>
                    <div className="container-fluid">
                        <Link
                            className="nav-link text-center all-tittles"
                            to="/prestamos/create"
                        >
                            Añadir de Prestamo
          </Link>
                    </div>

                    <Table className="table table-sm">
                        <thead>
                            <tr className="div-table-row div-table-head">
                                <th className="div-table-cell">ID</th>
                                <th className="div-table-cell">NOMBRE</th>
                                <th className="div-table-cell">PRESTADO EL</th>
                                <th className="div-table-cell">ACTUALIZAR</th>
                                <th className="div-table-cell">ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.prestamos.map((item) => (
                                <tr key={"item-" + item.id}>
                                    <td className="div-table-cell">{item.id}</td>
                                    <td className="div-table-cell">{item.title}</td>
                                    <td className="div-table-cell">{item.created_at}</td>
                                    <td className="div-table-cell">
                                        <Link
                                            to={"/prestamos/edit/" + item.id}
                                            className="btn btn-primary"
                                        >
                                            <i className="zmdi zmdi-edit"></i>
                                        </Link>
                                    </td>
                                    <td className="div-table-cell">
                                        <Button
                                            onClick={() => this.eliminarPrestamo(item.id)}
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
            </React.Fragment>
        )
    }
}