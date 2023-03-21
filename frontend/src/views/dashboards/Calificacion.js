import { Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ButtonsCheckAll from 'views/interface/plugins/datatables/EditableRows/components/ButtonsCheckAll';
import ButtonsAddNew from 'views/interface/plugins/datatables/EditableRows/components/ButtonsAddNew';
import ControlsPageSize from 'views/interface/plugins/datatables/EditableRows/components/ControlsPageSize';
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { da } from 'date-fns/locale';



const Calificacion = () => {
  const [value, setValue] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [anios, setAnios] = useState();
  const [periodos, setPeriodos] = useState();
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, anio, trimestre, touched, errors } = formik;
  const { currentUser, isLogin, isUpdated } = useSelector((state) => state.auth);
  const encargado  = currentUser.email;



  
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get("http://localhost:8080/api/calificaciones/");
      const resultsCalificaciones = []
      const resultsAnios = []
      const resultsPeriodo= []

      let contador = 0;
      let contador2 = 0;


      response.data.forEach((val) => {
        resultsAnios.forEach((dup) => {
        contador2 = 0;
          if (val.anio === dup.anio) {
            contador2+=1;
          }
        })
        if (contador2 === 0)
        resultsAnios.push({
          anio: val.anio,
          label: `${val.anio}`,
          });
        });

        response.data.forEach((val) => {
          resultsPeriodo.forEach((dup) => {
            contador = 0;
            if (val.trimestre === dup.trimestre) {
              contador+=1;
            }
          })
          if (contador === 0)
          resultsPeriodo.push({
            trimestre: val.trimestre,
            anio: val.anio,
            label: `${val.trimestre}`,
          });
  
        });


      response.data.forEach((val) => {
        resultsCalificaciones.push({
          estudiante: val.estudiante,
          materia: val.materia,
          cotidiano: val.cotidiano,
          tarea: val.tarea,
          examen1: val.examen1,
          examen2: val.examen2,
          asistencia: val.asistencia,
          total: val.total,
          observaciones: val.observaciones,
        });
      });

      setAnios([ 
        ...resultsAnios
      ])
      setPeriodos([ 
        ...resultsPeriodo
      ])
      setCalificaciones([ 
        ...resultsCalificaciones
      ])
    }
    
    // Trigger the fetch
    fetchData();
  }, []);

  const [data, setData] = React.useState(calificaciones);

  const handlePeriodo = (id) => {
    const dt = calificaciones.filter(x => x.trimestre === id.trimestre);
    setData(dt);
  }

  const handleAnio= (id) => {
    const dt = calificaciones.filter(x => x.anio=== id.anio);
    setPeriodos(dt);
    handlePeriodo(id);
   
  }


  const title = 'Calificación';
  const description = 'Pantalla de calificación';

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Identificación',
        accessor: 'estudiante',
        sortable: true,
        headerClassName: 'text-muted  text-small text-uppercase w-10',},    

      { Header: 'Materia', 
      accessor: 'materia', 
      sortable: true, 
      headerClassName: 'text-muted  text-small text-uppercase w-5' },
      {
        Header: 'Trabajo Cotidiano',
        accessor: 'cotidiano',
        sortable: false,
        headerClassName: 'text-muted  text-small text-uppercase w-5',
       /* Cell: ({ cell }) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {cell.value}
            </a>
          );
        }, */
      },    
      { Header: 'Tarea', 
      accessor: 'tarea', 
      sortable: false, 
      headerClassName: 'text-muted  text-small text-uppercase w-5' },


      { Header: 'Primer Examen', 
      accessor: 'examen1', 
      sortable: false, 
      headerClassName: 'text-muted  text-small text-uppercase w-10' },


      { Header: 'Segundo Examen', 
      accessor: 'examen2', 
      sortable: false, 
      headerClassName: 'text-muted text-small text-uppercase w-10' },

      { Header: 'Asistencia', 
      accessor: 'asistencia', 
      sortable: false, 
      headerClassName: 'text-muted text-small text-uppercase w-5' },

      { Header: 'Total', 
      accessor: 'total', 
      sortable: true, 
      headerClassName: 'text-muted text-small text-uppercase w-10' },

      { Header: 'Observaciones', 
      accessor: 'observaciones', 
      sortable: false, 
      headerClassName: 'text-muted text-small text-uppercase w-50' },



     /* {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      }, */
    ];
  }, []);

 

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const breadcrumbs = [{ to: '', text: 'Home' }];
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>

      <Row className="row-cols-1 row-cols-lg-5 g-2 mb-5">
        <Col>
          <Card className="h-100">
            <Card.Body className="mb-5">
              <p className="text-primary heading mb-8">Año</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={anios} 
                    value={anio} 
                    onChange={handleAnio} 
                    placeholder="Seleccione" 
                  />
                </Col>          
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
          <Card.Body className="mb-5">
              <p className="text-primary heading mb-8">Trimestre</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={periodos} 
                    value={trimestre} 
                    onChange={handlePeriodo} 
                    placeholder="Seleccione" 
                  />
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
    
      <Row>
        <Col>
        <div className="d-flex justify-content-between">
              <h2 className="small-title">Estudiantes</h2>
             
          </div>
          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} />
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          <ModalAddEdit tableInstance={tableInstance} />
        </Col>
      </Row>

      
    </>
  );
};

export default Calificacion;
