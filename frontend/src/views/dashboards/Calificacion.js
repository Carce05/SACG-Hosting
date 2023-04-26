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
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { da } from 'date-fns/locale';



const Calificacion = (props) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [anios, setAnios] = useState([]);
  const [aniosFiltrados, setAniosFiltrados] = useState([]);
  const [periodos, setPeriodos] = useState();
  const [trimestre, setTrimestre] = useState([]);
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, anioo, trimestree, estudiante, touched, errors } = formik;
  const { currentUser, isLogin, isUpdated } = useSelector((state) => state.auth);

  const [selectedAnio, setSelectedAnio] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("");

  // const usuario  = userInfo?.email;
  const usuario  = currentUser.email;

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`);
      const resultsEstudiantes = []
      // Store results in the results array
      response.data.forEach((value) => {
        resultsEstudiantes.push({
          value: value.cedula,
          label: `${value.nombre} ${value.apellido} (${value.cedula})`,
        });
      });
      // Update the options state
      setEstudiantes([ 
        ...resultsEstudiantes
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get("http://localhost:8080/api/calificaciones/");
      const resultsCalificaciones = []
      const resultsAnios = []
      const resultsPeriodo= []

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
          anio: val.anio.toString(),
          trimestre: val.trimestre,
          observaciones: val.observaciones,
        });
  
      });
      response.data.forEach((val) => {
        resultsAnios.push({
          anio: val.anio.toString(),
          estudiante: val.estudiante,
          label: `${val.anio}`,
          });
      });



      response.data.forEach((val) => {
          resultsPeriodo.push({
            trimestre: val.trimestre,
            anio: val.anio.toString(),
            estudiante: val.estudiante,
            label: `${val.trimestre}`,
          })
      });

      setCalificaciones([ 
        ...resultsCalificaciones
      ])    

      setAnios([ 
        ...resultsAnios
      ])
      setPeriodos([ 
        ...resultsPeriodo
      ])

      }
      
      // Trigger the fetch
      fetchData();
  }, []);


  const [data, setData] = React.useState(calificaciones);


  const handlePeriodo = (id) => {    
    const dt = calificaciones.filter(x => x.anio === id.anio && x.trimestre === id.trimestre && x.estudiante === id.estudiante);
    setData(dt);
  }

  const handleAnio= (id) => {
    const dt = periodos.filter(x => x.anio === selectedAnio && x.estudiante === id.estudiante);
    setTrimestre(dt);
    handlePeriodo(id);
   
  }

  const handleEstudiante = (id) => {
    const dt = anios.filter(x => x.estudiante === id.value);

    let contador = 0;
    const td = [];

    dt.forEach((val) => {
      contador = 0;
      td.forEach((dup) => {
        if (val.anio === dup.anio) {
          contador+=1;
        }
      })
      if (contador === 0)
      td.push({
        anio: val.anio.toString(),
        estudiante: val.estudiante,
        label: `${val.anio}`,
      });
    });

    td.sort((s1, s2)=>(s2.anio < s1.anio) ? 1 : (s2.anio > s1.anio) ? -1 : 0);

    setAniosFiltrados(td);
    
    handleAnio(id);
  }

  const handleSelectedAnio = (e) => {
    setSelectedAnio(e.anio);
    const dt = periodos.filter(x => x.anio === e.anio && x.estudiante === e.estudiante);
    setTrimestre(dt);
    handlePeriodo(e);
  };

  const handleSelectedPeriodo = (e) => {
    setSelectedPeriodo(e.trimestre);
    const dt = calificaciones.filter(x => x.anio === e.anio && x.trimestre === e.trimestre && x.estudiante === e.estudiante);
    setData(dt);
  };

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
      headerClassName: 'text-muted  text-small text-uppercase w-10' },
      {
        Header: 'Trabajo Cotidiano',
        accessor: 'cotidiano',
        sortable: true,
        headerClassName: 'text-muted  text-small text-uppercase w-10'
      },    
      { Header: 'Tarea', 
      accessor: 'tarea', 
      sortable: true, 
      headerClassName: 'text-muted  text-small text-uppercase w-10' },


      { Header: 'Primer Examen', 
      accessor: 'examen1', 
      sortable: true, 
      headerClassName: 'text-muted  text-small text-uppercase w-10' },


      { Header: 'Segundo Examen', 
      accessor: 'examen2', 
      sortable: true, 
      headerClassName: 'text-muted text-small text-uppercase w-10' },

      { Header: 'Asistencia', 
      accessor: 'asistencia', 
      sortable: true, 
      headerClassName: 'text-muted text-small text-uppercase w-10' },

      { Header: 'Total', 
      accessor: 'total', 
      sortable: true, 
      headerClassName: 'text-muted text-small text-uppercase w-10' },

      { Header: 'Observaciones', 
      accessor: 'observaciones', 
      sortable: true, 
      headerClassName: 'text-muted text-small text-uppercase w-50' },

    ];
  }, []);

  const tableInstance = useTable(
    { columns, data, setData, stateReducer: (state, action) => {
      if (action.type === 'toggleRowSelected' && Object.keys(state.selectedRowIds).length) {
         const newState = { ...state };

         newState.selectedRowIds = {
           [action.id]: true,
         };

         return newState;
      }

      return state;
   }, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
           
          </Col>
          {/* Title End */}
        </Row>
      </div>

      <Row className="row-cols-1 row-cols-lg-5 g-2 mb-5">
        <Col>
          <Card className="h-100">
            <Card.Body className="mb-5">
              <p className="text-primary heading mb-8">Estudiante</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={estudiantes} 
                    value={estudiante} 
                    onChange={handleEstudiante} 
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
              <p className="text-primary heading mb-8">Año</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={aniosFiltrados} 
                    value={aniosFiltrados.find(function (option) {
                      return option.value === selectedAnio;})} 
                    placeholder="Seleccione" 
                    onChange={handleSelectedAnio} 
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
                    options={trimestre} 
                    value={trimestre.find(function (option) {
                      return option.value === selectedPeriodo;})} 
                    placeholder="Seleccione"
                    onChange={handleSelectedPeriodo}                     
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
          
        </Col>
      </Row>

      
    </>
  );
};

export default Calificacion;
