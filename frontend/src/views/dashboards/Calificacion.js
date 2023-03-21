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
      setCalificaciones([ 
        ...resultsCalificaciones
      ])
    }


    fetchData();
  }, []);
  


  const title = 'Calificación';
  const description = 'Pantalla de calificación';


  const breadcrumbs = [{ to: '', text: 'Home' }];
  return (
    <>
      <HtmlHead title={title} description={description} />

      <div className="page-title-container">
        <Row>
          
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
     
          </Col>
      
        </Row>
      </div>
     

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
          <Form.Control type="number" value={calificaciones[1].tarea}/>
        </Col>
        <Col md="1">
          <Form.Label>Examen 1</Form.Label>
          <Form.Control type="number" value={calificaciones[2].examen1}/>
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
