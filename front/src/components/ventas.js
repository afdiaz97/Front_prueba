import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

const Ventas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/ventas');
        setData(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const filterByDate = (rows, id, filterValue) => {
    if (!filterValue) return rows;
    return rows.filter(row => {
      const rowDate = extractDate(row.original.fecha);
      return rowDate === filterValue;
    });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Registro Venta', accessor: 'id_vents' },
      {
        Header: 'Fecha',
        accessor: (row) => extractDate(row.fecha),
      },
      {
        Header: 'Cliente',
        accessor: row => row.cliente.nombre,
        id: 'cliente',
      },
      { Header: 'Total Venta', accessor: 'total_venta' },
      {
        Header: 'Detalle',
        Cell: ({ row }) => (
          <Button
            variant="success"
            onClick={() => navigate(`/detail/${row.original.id_vents}`)}
          >
            Ver
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable(
    { columns, data, globalFilter: filterByDate },
    useGlobalFilter,
    useSortBy
  );

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    setGlobalFilter(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => navigate('/resgistrarventa')}>Crear</Button>
        </div>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
            placeholder="Filtrar por fecha"
          />
        </Col>
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

export default Ventas;
