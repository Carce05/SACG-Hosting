import { Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ButtonsCheckAll from 'views/interface/plugins/datatables/EditableRows/components/ButtonsCheckAll';
import ButtonsAddNew from 'views/interface/plugins/datatables/EditableRows/components/ButtonsAddNew';
import ControlsPageSize from 'views/interface/plugins/datatables/EditableRows/components/ControlsPageSize';
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalCalificacion from 'views/interface/plugins/datatables/EditableRows/components/ModalCalificacion';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';


const Secciones = (props) => {
  const [value, setValue] = useState([]);
  const [materias, setMaterias] = useState();
  const [secciones, setSecciones] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, materia, seccionn, touched, errors } = formik;
  const { setSelectedMateria, setSeccionn } = useState();
  
  
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const docente  = currentUser.email;
  

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(`http://localhost:8080/api/docentes_materias_secciones/DocenteAsignado/${docente}`);
      const resultsMaterias = []
      const resultsSecciones = []
      let contador = 0;
      // Store results in the results array
      response.data.forEach((val) => {
        resultsMaterias.forEach((dup) => {
          contador = 0;
          if (val.materia === dup.materia) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsMaterias.push({
          materia: val.materia,
          label: `${val.materia}`,
        });

      });
      response.data.forEach((val) => {
        resultsSecciones.push({
          seccion: val.seccion,
          materia: val.materia,
          label: `${val.seccion}`,
        });
      });
      // Update the options state
      setMaterias([ 
        ...resultsMaterias
      ])
      setSecciones([ 
        ...resultsSecciones
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);
  
  
  /*
  useEffect(() => {

    axios
      .get("http://localhost:8080/api/estudiantes/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
*/


  
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get("http://localhost:8080/api/estudiantes/");
      const resultsEstudiantes = []
      // Store results in the results array
      response.data.forEach((val) => {
        resultsEstudiantes.push({
          cedula: val.cedula,
          nombre: val.nombre,
          apellido: val.apellido,
          seccion: val.seccion,
        });
      });
      setEstudiantes([ 
        ...resultsEstudiantes
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);

  const [data, setData] = React.useState(estudiantes);



  const handleSeccion = (id) => {
    const dt = estudiantes.filter(x => x.seccion === id.seccion);
    setData(dt);
  }

  const handleMateria = (id) => {
    const dt = secciones.filter(x => x.materia === id.materia);
    setSeccion(dt);
    // id.seccion = formik;
    handleSeccion(id);
  }



  const title = 'Mis Secciones';
  const description = 'Elearning Portal School Dashboard Page';

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula', accessor: 'cedula', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nombre',
        accessor: 'nombre',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ cell }) => {
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
        },
      },    
      { Header: 'Apellido', accessor: 'apellido', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Seccion', accessor: 'seccion', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Button onClick={() => setIsOpenAddEditModal(true)} variant="outline-primary" >Nota</Button>;
        },
      },
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
              <p className="text-primary heading mb-8">Materia</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={materias} 
                    value={materia} 
                    onChange={handleMateria} 
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
              <p className="text-primary heading mb-8">Sección</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={seccion} 
                    value={seccionn} 
                    onChange={handleSeccion} 
                    placeholder="Seleccione" 
                  />
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Timetable End */}
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
              <h2 className="small-title">Estudiantes</h2>
              <NavLink to="/quiz/result" className="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small">
                <span className="align-bottom">Ver Todos</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
              </NavLink>
          </div>
          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
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
          <ModalCalificacion tableInstance={tableInstance}/>
        </Col>
      </Row>
    </>
  );
};

export default Secciones;
