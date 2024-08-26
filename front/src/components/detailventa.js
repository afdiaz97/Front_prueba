import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../axiosConfig';

const VentasForm = () => {
  const [cliente, setCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Arreglo para manejar múltiples productos
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('/cliente'); 
        setClientes(response.data); 
      } catch (err) {
        console.error('Error al obtener los clientes:', err);
        setErrorMessage('No se pudo obtener la lista de clientes.');
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('/producto'); 
        setProductos(response.data);
      } catch (err) {
        console.error('Error al obtener los productos:', err);
        setErrorMessage('No se pudo obtener la lista de productos.');
      }
    };

    fetchProductos();
  }, []);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { id: '', nombre: '', valor: '', valor_iva: '' }]); // Agrega un nuevo objeto de producto vacío
  };

  const handleProductChange = (index, value) => {
    const newProducts = [...selectedProducts];
    const selectedProduct = productos.find(prod => prod.Codigo === value);
    newProducts[index] = selectedProduct || { id: value, nombre: '', valor: '', valor_iva: '' };
    setSelectedProducts(newProducts);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const ventaResponse = await axios.post('/ventas', { cliente }); 

      const venta = ventaResponse.data.id_venta; 
      
      for ( var i = 0 ; i <selectedProducts.length ; i++ ){
        await axios.post('/detailventa', { venta, producto: selectedProducts[i].Codigo });
      }
      
      console.log('Venta creada con productos asociados');
      setErrorMessage(''); // Limpiar mensaje de error si se crea exitosamente
      navigate('/ventas'); // Ajusta la ruta de redirección según tu caso

    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        setErrorMessage(error.response.data.mensaje);
      } else {
        setErrorMessage('Error al crear la venta. Por favor, intenta nuevamente.');
      }
      console.error('Error al crear la venta:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
        <Form.Group className="mb-3">
          <Row>
            <Col md={6}>
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                as="select"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cli) => (
                  <option key={cli.cedula} value={cli.cedula}>
                    {cli.nombre}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>

        {selectedProducts.map((prod, index) => (
          <Form.Group key={index} className="mb-3">
            <Row>
              <Col md={4}>
                <Form.Label>Producto {index + 1}</Form.Label>
                <Form.Control
                  as="select"
                  value={prod.id}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((prodItem) => (
                    <option key={prodItem.Codigo} value={prodItem.Codigo}>
                      {prodItem.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={4}>
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="text"
                  value={prod.valor || ''} 
                  readOnly
                />
              </Col>
              <Col md={4}>
                <Form.Label>Porcentaje Iva</Form.Label>
                <Form.Control
                  type="text"
                  value={prod.valor_iva || ''} 
                  readOnly
                />
                <Button variant="danger" onClick={() => handleRemoveProduct(index)} className="mt-2">
                  Eliminar producto
                </Button>
              </Col>
            </Row>
          </Form.Group>
        ))}

        <Row className="mb-3">
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleAddProduct}>
              Agregar producto
            </Button>
          </div>
        </Row>

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
};

export default VentasForm;
