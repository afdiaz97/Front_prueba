import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../axiosConfig';


const ClienteForm = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que la página se recargue
    
        const clienteData = {
          nombre,
          cedula,
          email,
          direccion,
          telefono,
        };
    
        try {
          const response = await axios.post('/cliente', clienteData);
          console.log('Cliente creado:', response.data);
          navigate('/cliente');
        } catch (error) {
          console.error('Error al crear el cliente:', error);
        }
      };
  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Row>
            <Col md={6}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Col>
            <Col md={6}>
              <Form.Label>Cedula</Form.Label>
              <Form.Control type="number" placeholder="Ingresar Cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresar email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Col>
            <Col md={6}>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" placeholder="Ingresar direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="number" placeholder="Ingresar telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        <Row>
        <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
        </Row>
      </Form>
    </div>
  );
}

export default ClienteForm;
