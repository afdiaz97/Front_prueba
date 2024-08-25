import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from '../axiosConfig';
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import "bootstrap/dist/css/bootstrap.min.css";

const Cliente = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/cliente');
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
      { Header: 'Cédula', accessor: 'cedula' },
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Dirección', accessor: 'direccion' },
      { Header: 'Teléfono', accessor: 'telefono' },
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
          <Button variant="primary">Crear</Button>
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

export default Cliente;
