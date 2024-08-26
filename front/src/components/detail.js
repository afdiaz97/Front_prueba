import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import Table from 'react-bootstrap/Table';

const Detailventa = () => {
    const { id } = useParams(); 
    const [venta, setVenta] = useState(null);
    const [detalles, setDetalles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchVentaDetails = async () => {
            try {
                const response = await axios.get(`/detail/${id}`);
                setVenta(response.data.venta);
                setDetalles(response.data.detalles);
            } catch (error) {
                setErrorMessage('Error al cargar los detalles de la venta.');
            }
        };

        fetchVentaDetails();
    }, [id]);

    if (!venta) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mt-4">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <h3>Detalles de la Venta</h3>
            <p><strong>ID de Venta:</strong> {venta.id_vents}</p>
            <p><strong>Fecha:</strong> {venta.fecha.split('T')[0]}</p> {/* Muestra solo la fecha */}
            <p><strong>Cliente:</strong> {venta.cliente.nombre}</p>
            <p><strong>Total Venta:</strong> ${venta.total_venta}</p>

            <h4>Productos Vendidos</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Valor</th>
                        <th>Valor Producto</th>
                        <th>IVA Calculado</th>
                    </tr>
                </thead>
                <tbody>
                    {detalles.map((detalle, index) => (
                        <tr key={index}>
                            <td>{detalle.producto.nombre}</td>
                            <td>{detalle.producto.valor}</td>
                            <td>{detalle.valor_producto}</td>
                            <td>{detalle.iva_calculado}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Detailventa;
