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
import ControlsCalificacion from 'views/interface/plugins/datatables/EditableRows/components/ControlsCalificacion';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalCalificacion from 'views/interface/plugins/datatables/EditableRows/components/ModalCalificacion';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

const AdminSecciones = (props) => {
  const [value, setValue] = useState([]);
  const [materias, setMaterias] = useState();
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [secciones, setSecciones] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, materia, docentee, seccionn, touched, errors } = formik;
  const { setSelectedMateria, setSeccionn } = useState();
  
  
 
  

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(`http://localhost:8080/api/docentes_materias_secciones/`);
      const resultsMaterias = []
      const resultsDocentes = []
      const resultsSecciones = []

      let contador = 0;
      let contador2 = 0;
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
        resultsDocentes.forEach((dup) => {
          contador2 = 0;
          if (val.docente === dup.docente) {
            contador2 +=1;
          }
        })
        if (contador2 === 0)
        resultsDocentes.push({
          docente: val.docente,
          materia: val.materia,
          label: `${val.docente}`,
        });
      }); 

       /* response.data.forEach((val) => {
          resultsDocentes.forEach((dup) => {
            contador = 0;
            if (val.docente === dup.docente) {
              contador+=1;
            }
          })
          if (contador === 0)
          resultsDocentes.push({
            docente: val.docente,
            label: `${val.docente}`,
          });
  
        }); */

      
          
      response.data.forEach((val) => {
        resultsSecciones.push({
          seccion: val.seccion,
          docente: val.docente,
          materia: val.materia,
          label: `${val.seccion}`,
        });
      });
      // Update the options state
      setMaterias([ 
        ...resultsMaterias
      ])
      setDocentes([ 
        ...resultsDocentes
      ])
      setSecciones([ 
        ...resultsSecciones
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);
  
  

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get('http://localhost:8080/api/calificaciones');
      const resultsCalificaciones = []
      // Store results in the results array
  
      /* eslint no-underscore-dangle: 0 */
      response.data.forEach((val) => {
        resultsCalificaciones.push({
          _id: val._id,
          estudiante: val.estudiante,
          materia: val.materia,
          cotidiano: val.cotidiano,
          tarea: val.tarea,
          examen1: val.examen1,
          examen2: val.examen2,
          proyecto: val.proyecto,
          asistencia: val.asistencia,
          total: val.total,
          observaciones: val.observaciones,
          anio: val.anio,
          trimestre: val.trimestre,
        });
      });
      setCalificaciones([ 
        ...resultsCalificaciones
      ])
    }
  
        // Trigger the fetch
        fetchData();
  }, []);
  
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

  const insertarCalificaciones = () => {
    estudiantes.forEach((val) => {
      calificaciones.forEach((cali) => {
        if (val.cedula === cali.estudiante && val.materia === cali.materia) {
          val.total = cali.total;
        }
      })
    });
  }

  const [data, setData] = React.useState(estudiantes);

  const handleSeccion = (id) => {
    insertarCalificaciones();
    const dt = estudiantes.filter(x => x.seccion === id.seccion);
    setData(dt);
  }

  const handleDocente= (id) => {
    const dt = secciones.filter(x => x.docente === id.docente);
    const td = dt.filter(x => x.materia === id.materia);
    setSeccion(td);
    // handleSeccion(id);
   
  }

  const handleMateria = (id) => {
    estudiantes.forEach((val) => {
      val.materia = id.materia;
    });
    const dt = docentes.filter(x => x.materia === id.materia);
    setDocentesFiltrados(dt);
    // handleDocente(id);
    
  }





  const title = 'Secciones Administrador';
  const description = 'Calificaciones Administrador';

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula', accessor: 'cedula', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nombre',
        accessor: 'nombre',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
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
      { Header: 'Materia', accessor: 'materia', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Seccion', accessor: 'seccion', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Total', accessor: 'total', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange}/>;
        },
      },
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
              <p className="text-primary heading mb-8">Docente</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={docentesFiltrados} 
                    value={docentee} 
                    onChange={handleDocente} 
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
                  <ControlsCalificacion tableInstance={tableInstance} />
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
          <ModalCalificacion onHide={insertarCalificaciones}
           tableInstance={tableInstance} 
           calificaciones={calificaciones}
           setCalificaciones={setCalificaciones}
           estudiantes={estudiantes}
           setEstudiantes={setEstudiantes}/>
        </Col>
      </Row>
    </>
  );
};

export default AdminSecciones;