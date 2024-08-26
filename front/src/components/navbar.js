import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";
const Dashboard = (props) => {
    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <Link to={"/inicio"} className="nav-link">
                        Tu tienda online
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/cliente">Clientes</Nav.Link>
                <Nav.Link href="/producto">Productos</Nav.Link>
                <Nav.Link href="/ventas">Ventas</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );    
}

export default Dashboard;
