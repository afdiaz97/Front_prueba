import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import "bootstrap/dist/css/bootstrap.min.css";

const Producto = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/crearproducto'); // Cambia '/ruta-deseada' por la ruta a la que quieres redirigir
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/producto');
        setData(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Codigo', accessor: 'Codigo' },
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Valor', accessor: 'valor' },
      {
        Header: 'IVA',
        accessor: 'iva',
        Cell: ({ value }) => (value ? 'Sí' : 'No') // Convierte true/false a Sí/No
      },
      { Header: 'Porcentaje iva', accessor: 'valor_iva' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleRedirect}>Crear</Button>
        </div>
      </Row>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ border: 'solid 1px black', padding: '5px' }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ border: 'solid 1px black', padding: '5px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Producto;