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
import ControlsAsignarDocente from 'views/interface/plugins/datatables/EditableRows/components/ControlsAsignarDocente';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAsignarDocente from 'views/interface/plugins/datatables/EditableRows/components/ModalAsignarDocente';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import apiSACG from 'api/apiSACG';

const AsignarDocente = (props) => {
  const [value, setValue] = useState([]);
  const [DMS, setDMS] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, materia, seccion, touched, errors } = formik;
  const { setSelectedMateria, setSeccionn } = useState();
  
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const docente  = currentUser.email;
  

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(apiSACG.concat(`/docentes_materias_secciones/`));
      const resultsDMS = []
      const resultsMaterias = []
      const resultsSecciones = []
      let contador = 0;

      // Store results in the results array

      /* eslint no-underscore-dangle: 0 */
      response.data.forEach((val) => {
        resultsDMS.push({
          _id: val._id,
          docente: val.docente,
          materia: val.materia,
          seccion: val.seccion
        });
      });

      response.data.forEach((val) => {
        contador = 0;
        resultsSecciones.forEach((dup) => {          
          if (val.seccion === dup.seccion) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsSecciones.push({
          seccion: val.seccion,
          label: `${val.seccion}`,
        });

      });

      resultsSecciones.sort((s1, s2)=>(s2.seccion < s1.seccion) ? 1 : (s2.seccion > s1.seccion) ? -1 : 0);

      // Update the options state
      setDMS([ 
        ...resultsDMS
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
      const response = await axios.get(apiSACG.concat("/usuarios/"));
      const resultsDocentes = []
      // Store results in the results array
      response.data.forEach((val) => {
        if (val.role === "Profesor" && val.status === "Activo"){
          resultsDocentes.push({           
            value: val.email,
            label: `${val.name} (${val.personalId})`,
          });
        }
      });

      resultsDocentes.sort((s1, s2)=>(s2.nombre < s1.nombre) ? 1 : (s2.nombre > s1.nombre) ? -1 : 0);

      setDocentes([ 
        ...resultsDocentes
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);




  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const [data, setData] = React.useState(DMS);

  const handleSeccion = (id) => {
    const dt = DMS.filter(x => x.seccion === id.seccion);
    setData(dt);
  }


  const title = 'Asignar Docentes';
  const description = 'Secciones del profesor logueado.';

  

  const columns = React.useMemo(() => {
    return [
      { Header: 'Materia', accessor: 'materia', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Sección', accessor: 'seccion', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Docente', accessor: 'docente', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },    
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
              <p className="text-primary heading mb-8">Sección</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={secciones} 
                    value={seccion} 
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
              <h2 className="small-title">Materias</h2>
              {/*
              <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                <h2 className="small-title">Nota</h2> 
              </div>
              */}
          </div>
          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                {/*
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <Button onClick={insertarCalificaciones} variant="outline-primary" >Refrescar</Button>
                </div>
                */}
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAsignarDocente tableInstance={tableInstance} />
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
          <ModalAsignarDocente           
          tableInstance={tableInstance}
          docentes={docentes}
          setDocentes={setDocentes}
          DMS={DMS}
          setDMS={setDMS}/>
        </Col>
      </Row>
    </>
  );
};

export default AsignarDocente;
