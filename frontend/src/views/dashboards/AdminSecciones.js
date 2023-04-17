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
import apiSACG from 'api/apiSACG';

const AdminSecciones = (props) => {
  const [value, setValue] = useState([]);
  const [materias, setMaterias] = useState();
  const [materiasFiltradas, setMateriasFiltradas] = useState();
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [secciones, setSecciones] = useState();
  const [seccionesFiltradas, setSeccionesFiltradas] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [anios, setAnios] = useState([]);
  const [aniosFiltrados, setAniosFiltrados] = useState([]);
  const [trimestres, setTrimestres] = useState([]);
  const [trimestresFiltrados, setTrimestresFiltrados] = useState();
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, materia, docentee, seccionn, trimestre, anio, touched, errors } = formik;
  const { setSelectedMateria, setSeccionn } = useState();

  const url = apiSACG.concat('/usuarios/login');
  
  
 
  
/*
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(apiSACG.concat(`/docentes_materias_secciones/`));
      const resultsMaterias = []
      const resultsDocentes = []
      const resultsSecciones = []

      let contador = 0;
      
      
      response.data.forEach((val) => {
        contador = 0;
        resultsMaterias.forEach((dup) => {
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
        contador = 0;
        resultsDocentes.forEach((dup) => {          
          if (val.docente === dup.docente) {
            contador +=1;
          }
        })
        if (contador === 0)
        resultsDocentes.push({
          docente: val.docente,
          materia: val.materia,
          label: `${val.docente}`,
        });
      }); 

      response.data.forEach((val) => {
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
  
        }); 

      
          
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
  */

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(apiSACG.concat('/calificaciones'));
      const resultsCalificaciones = []
      const resultsAnios = []
      const resultsTrimestres = []
      const resultsMaterias = []
      const resultsSecciones = []
      let contador = 0;
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
          seccion: val.seccion,
        });
      });      
      
      response.data.forEach((val) => {
        contador = 0;
        resultsAnios.forEach((dup) => {          
          if (val.anio === dup.anio) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsAnios.push({
          anio: val.anio,
          label: `${val.anio}`,
        });

      });

      resultsAnios.sort((s1, s2)=>s1.anio-s2.anio);

      response.data.forEach((val) => {
        contador = 0;
        resultsTrimestres.forEach((dup) => {          
          if (val.anio === dup.anio && val.trimestre === dup.trimestre) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsTrimestres.push({
          trimestre: val.trimestre,
          anio: val.anio,
          label: `${val.trimestre}`,
        });

      });

      response.data.forEach((val) => {
        contador = 0;
        resultsMaterias.forEach((dup) => {
          if (val.anio === dup.anio && val.trimestre === dup.trimestre && val.materia === dup.materia) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsMaterias.push({
          materia: val.materia,
          trimestre: val.trimestre,
          anio: val.anio,
          label: `${val.materia}`,
        });

      });

      response.data.forEach((val) => {
        resultsSecciones.push({
          seccion: val.seccion,
          materia: val.materia,
          trimestre: val.trimestre,
          anio: val.anio,
          label: `${val.seccion}`,
        });
      });

      setCalificaciones([ 
        ...resultsCalificaciones
      ])

      setAnios([ 
        ...resultsAnios
      ])
      setTrimestres([ 
        ...resultsTrimestres
      ])
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
  
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(apiSACG.concat("/estudiantes/"));
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
    const dt = calificaciones.filter(x => x.anio === id.anio && x.trimestre === id.trimestre && x.materia === id.materia && x.seccion === id.seccion);

    const estudiantesFiltrados = [];

    estudiantes.forEach((val) => {
      dt.forEach((cali) => {
        if (val.cedula === cali.estudiante) {
          estudiantesFiltrados.push({
            cedula: val.cedula,
            nombre: val.nombre,
            apellido: val.apellido,
            materia: cali.materia,
            seccion: cali.seccion,
            total: cali.total,
          });
        }
      })
    });

    estudiantesFiltrados.sort((s1, s2)=>(s2.apellido < s1.apellido) ? 1 : (s2.apellido > s1.apellido) ? -1 : 0);

    setData(estudiantesFiltrados);
  }


  const handleMateria = (id) => {
    const dt = secciones.filter(x => x.anio === id.anio && x.trimestre === id.trimestre && x.materia === id.materia);
    setSeccionesFiltradas(dt);
    handleSeccion(id);
  }

  const handleTrimestre = (id) => {    
    const dt = materias.filter(x => x.anio === id.anio && x.trimestre === id.trimestre);
    setMateriasFiltradas(dt);
    handleMateria(id);
  }

  const handleAnio= (id) => {
    const dt = trimestres.filter(x => x.anio=== id.anio);
    setTrimestresFiltrados(dt);
    handleTrimestre(id);
  }


  const title = 'Secciones Administrador';
  const description = 'Calificaciones Administrador';

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula', accessor: 'cedula', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Apellido', accessor: 'apellido', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
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
                    options={trimestresFiltrados} 
                    value={trimestre} 
                    onChange={handleTrimestre} 
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
              <p className="text-primary heading mb-8">Materia</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={materiasFiltradas} 
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
                    options={seccionesFiltradas} 
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