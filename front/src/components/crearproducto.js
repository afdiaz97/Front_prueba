import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../axiosConfig';

const ProductoForm = () => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [iva, setIva] = useState('');
  const [porcentaje_iva, setValoriva] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ivaBoolean = iva === 'true';
    const productoData = {
      codigo,
      nombre,
      valor : parseFloat(valor),
      iva: ivaBoolean,
      porcentaje_iva : iva === 'true' ? parseFloat(porcentaje_iva) : null,
    };

    try {
      const response = await axios.post('/producto', productoData);
      console.log('Producto creado:', response.data);
      setErrorMessage(''); // Limpiar mensaje de error si se crea exitosamente
      navigate('/producto');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        // Captura y muestra el mensaje de error específico
        setErrorMessage(error.response.data.mensaje);
      } else {
        // Muestra un mensaje de error genérico si no hay un mensaje específico
        setErrorMessage('Error al crear el producto. Por favor, intenta nuevamente.');
      }
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Form.Group className="mb-3">
          <Row>
            <Col md={6}>
              <Form.Label>Codigo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el código" 
                value={codigo} 
                onChange={(e) => setCodigo(e.target.value)} 
              />
            </Col>
            <Col md={6}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el nombre del producto" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Label>Valor</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese el valor del producto" 
                value={valor} 
                onChange={(e) => setValor(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>IVA</Form.Label>
              <Form.Control
                as="select"
                value={iva}
                onChange={(e) => setIva(e.target.value)}
              >
                <option value="false" >No</option>
                <option value="true" >Sí</option>
              </Form.Control>
            </Col>
          </Row>
          {iva === 'true' && (
            <Row>
              <Col md={6}>
                <Form.Label>Porcentaje del IVA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar el porcentaje del IVA"
                  value={porcentaje_iva}
                  onChange={(e) => setValoriva(e.target.value)}
                />
              </Col>
            </Row>
          )}
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

export default ProductoForm;
