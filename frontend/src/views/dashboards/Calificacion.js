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
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from "axios";

const dummyData = [
  { id: 1, name: 'Basler Brot', sales: 213, stock: 392310440, category: 'Sourdough', tag: 'New' },
  { id: 2, name: 'Bauernbrot', sales: 633, stock: 129234013, category: 'Multigrain', tag: 'Done' },
  { id: 3, name: 'Kommissbrot', sales: 2321, stock: 561017657, category: 'Whole Wheat', tag: '' },
  { id: 4, name: 'Lye Roll', sales: 973, stock: 127580420, category: 'Sourdough', tag: '' },
  { id: 5, name: 'Panettone', sales: 563, stock: 789313762, category: 'Sourdough', tag: 'Done' },
  { id: 6, name: 'Saffron Bun', sales: 98, stock: 129074548, category: 'Whole Wheat', tag: '' },
  { id: 7, name: 'Ruisreikäleipä', sales: 459, stock: 904716276, category: 'Whole Wheat', tag: '' },
  { id: 8, name: 'Rúgbrauð', sales: 802, stock: 797307649, category: 'Whole Wheat', tag: '' },
  { id: 9, name: 'Yeast Karavai', sales: 345, stock: 680078801, category: 'Multigrain', tag: '' },
  { id: 10, name: 'Brioche', sales: 334, stock: 378937746, category: 'Sourdough', tag: '' },
  { id: 11, name: 'Pullman Loaf', sales: 456, stock: 461638720, category: 'Multigrain', tag: '' },
  { id: 12, name: 'Soda Bread', sales: 1152, stock: 348536477, category: 'Whole Wheat', tag: '' },
  { id: 13, name: 'Barmbrack', sales: 854, stock: 591276986, category: 'Sourdough', tag: '' },
  { id: 14, name: 'Buccellato di Lucca', sales: 1298, stock: 980925057, category: 'Multigrain', tag: '' },
  { id: 15, name: 'Toast Bread', sales: 2156, stock: 220171422, category: 'Multigrain', tag: '' },
  { id: 16, name: 'Cheesymite Scroll', sales: 452, stock: 545847219, category: 'Sourdough', tag: '' },
  { id: 17, name: 'Baguette', sales: 456, stock: 553121944, category: 'Sourdough', tag: '' },
  { id: 18, name: 'Guernsey Gâche', sales: 1958, stock: 371226430, category: 'Multigrain', tag: '' },
  { id: 19, name: 'Bazlama', sales: 858, stock: 384036275, category: 'Whole Wheat', tag: '' },
  { id: 20, name: 'Bolillo', sales: 333, stock: 484876903, category: 'Whole Wheat', tag: '' },
];

const Calificacion = (props) => {
  const [value, setValue] = useState([]);
  const [materias, setMaterias] = useState();
  const [secciones, setSecciones] = useState();
  const [calificaciones, setCalificaciones] = useState([]);
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
      const response = await axios.get("http://localhost:8080/api/calificaciones/");
      const resultsCalificaciones = []
      // Store results in the results array
      response.data.forEach((val) => {
        resultsCalificaciones.push({
          estudiante: val.seccion,
          materia: val.materia,
          cotidiano: val.cotidiano,
          tarea: val.tarea,
          examen1: val.examen1,
          examen2: val.examen2,
          proyecto: val.proyecto,
          asistencia: val.asistencia,
          total: val.total,
          observaciones: val.observaciones,
        });
      });
      // Update the options state
      setCalificaciones([ 
        ...resultsCalificaciones
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




  const title = 'Calificación';
  const description = 'Pantalla de calificación';


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
      {/* Title and Top Buttons End */}

      {/* Timetable Start */}
      {/* <h2 className="small-title">Timetable</h2> */}
      
      {/* Timetable End */}

      <Card body className="mb-5">
              
            
      <Row>
        <Col>
          <div>
          <Form>
      <Row className="g-6">
        <Col md="1">
          <Form.Label>Cotidiano</Form.Label>
          <Form.Control type="number" value={calificaciones[0].cotidiano}/>
        </Col>
        <Col md="1">
          <Form.Label>Tarea</Form.Label>
          <Form.Control type="number" value={calificaciones[0].tarea}/>
        </Col>
        <Col md="1">
          <Form.Label>Examen 1</Form.Label>
          <Form.Control type="number" value={calificaciones[0].examen1}/>
        </Col>
        <Col md="1">
          <Form.Label>Examen 2</Form.Label>
          <Form.Control type="number" value={calificaciones[0].examen2}/>
        </Col>
        <Col md="1">
          <Form.Label>Proyecto</Form.Label>
          <Form.Control type="number" value={calificaciones[0].proyecto}/>
        </Col>
        <Col md="1">
          <Form.Label>Asistencia</Form.Label>
          <Form.Control type="number" value={calificaciones[0].asistencia}/>
        </Col>
        <Col md="1">
          <Form.Label>Total</Form.Label>
          <Form.Control type="number" value={calificaciones[0].total}/>
        </Col>
        
      </Row>
      <br/>
      <Row className="g-3">
        <Col md="3">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control as="textarea" rows={3} value={calificaciones[0].observaciones}/>
        </Col>
      </Row>
      <br/>
      <Row className="g-3">
        <Col md="1">
          <Button variant="success" className="mb-1">
            Subir
          </Button>{' '}
        </Col>
      </Row>
    </Form>
          </div>
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default Calificacion;
