import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
const Inicio = (props) => {
    return(
        <div>
        <Row>
            <h1>Bienvenido</h1>
        </Row>
        <Row>
            <h2>Aqui podra administrar los datos de la tienda</h2>
        </Row>
        </div>
    )
}
export default Inicio;
