import React, { useState, useEffect } from 'react';
import { Row, Button, Form, Modal, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ModalCalificacion = ({ tableInstance, calificaciones, setCalificaciones, estudiantes, setEstudiantes}) => {
const history = useHistory();
 
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  let materiaRes = "";

  let cedula = "";

  let idRes = "";
  let cotidianoRes = 0;
  let tareaRes = 0;
  let examen1Res = 0;
  let examen2Res = 0;
  let proyectoRes = 0;
  let asistenciaRes = 0;
  let totalRes = 0;
  let observacionesRes = "";
  let seccionRes = "";
  let anioActual = "";
  let periodoActual = "";

  const { currentUser } = useSelector((state) => state.auth);

  const rol  = currentUser.role;

  if (selectedFlatRows.length === 1) {
    cedula = selectedFlatRows[0].original.cedula;
    materiaRes = selectedFlatRows[0].original.materia;
    seccionRes = selectedFlatRows[0].original.seccion;
  }

  if (isOpenAddEditModal) {
    // updateCalificaciones(cedula, materiaRes);
    
    if (calificaciones !== undefined && calificaciones.length >= 1 ) {
      calificaciones.forEach((val) => {
        if (val.estudiante === cedula && val.materia === materiaRes){
          /* eslint no-underscore-dangle: 0 */
          idRes = val._id;
          cotidianoRes = val.cotidiano;
          tareaRes = val.tarea;
          examen1Res = val.examen1;
          examen2Res = val.examen2;
          proyectoRes = val.proyecto;
          asistenciaRes = val.asistencia;
          totalRes = val.total
          observacionesRes = val.observaciones;
        }
      });
    }
    
  }

  const initialValues = {
    cotidiano: cotidianoRes,
    tarea: tareaRes, 
    examen1: examen1Res,
    examen2: examen2Res,
    proyecto: proyectoRes,
    asistencia: asistenciaRes,
    total: totalRes,
    observaciones: observacionesRes
  };

  const validationSchema = Yup.object().shape({
    cotidiano: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de cotidiano requerida'),
    tarea: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de la tarea requerida'),
    examen1: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del primer examen requerida'),
    examen2: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del segundo examen requerida'),
    proyecto: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del proyecto requerida'),
    asistencia: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de asistencia requerida'),
    total: Yup.string().min(1,'La nota no puede ser menor a 0').required('Total requerido'),
    observaciones: Yup.string().max(200, 'Observaciones no puede contener más de 200 carateres'),
  });

  const cancelRegister = () => {
    document.getElementById("calificacionForm").reset();
  }

  const onSubmit = async ({ estudiante, materia, cotidiano, tarea,  examen1, examen2, proyecto, asistencia, total, observaciones, anio, trimestre }) => {
    if (idRes !== "") {
    try {
      await axios.put(`http://localhost:8080/api/calificaciones/${idRes}`, {
        cotidiano,
        tarea, 
        examen1,
        examen2,
        proyecto,
        asistencia,
        total,
        observaciones  
      });
      toast.success('¡Calificación Actualizada!', { className: 'success' });
      setIsOpenAddEditModal(false);
      
      axios
          .get("http://localhost:8080/api/calificaciones")
          .then((res) => {
           setCalificaciones(res.data);
            })
            .catch((err) => {
               console.error(err);
             });     
             
      const resultsUpdate = [];

      data.forEach((val) => {
        if (val.cedula === selectedFlatRows[0].original.cedula){
          resultsUpdate.push({
            cedula: val.cedula,
            apellido: val.apellido,
            nombre: val.nombre,
            materia: val.materia,
            seccion: val.seccion,
            total: total,
          });
        } else {
          resultsUpdate.push({
            cedula: val.cedula,
            apellido: val.apellido,
            nombre: val.nombre,
            materia: val.materia,
            seccion: val.seccion,
            total: val.total,
          });
        }
      });

      setData([ 
        ...resultsUpdate
      ])      

    } catch (e) {
      console.log(e.message);
      if (e.response && e.response.status === 400) {
        console.log(e.response.data.msg);
       // alert(e.response.data.msg);
        setIsOpenAddEditModal(true);
      }  else {
        toast.error('¡Hubo un problema al actualizar la calificación!');
        setIsOpenAddEditModal(true);
      }
    }
    
  }
  else {
    try {
      await axios
      .get("http://localhost:8080/api/general/643f20fe9a24456baf1c57b1")
      .then((res) => {
        anioActual = res.data[0].anio;
        periodoActual = res.data[0].periodo; 
      })
      .catch((err) => {
        console.error(err);
      });

      const response = await axios.post('http://localhost:8080/api/calificaciones', {
        estudiante: cedula,
        materia: materiaRes,
        cotidiano,
        tarea, 
        examen1,
        examen2,
        proyecto,
        asistencia,
        total: 0,
        observaciones,
        anio: anioActual,
        trimestre: periodoActual,
        seccion: seccionRes
    });
    toast.success('¡Calificación actualizada!', { className: 'success' });
          setIsOpenAddEditModal(false);
          axios
          .get("http://localhost:8080/api/calificaciones")
          .then((res) => {
           setCalificaciones(res.data);
            })
            .catch((err) => {
               console.error(err);
             });
    } catch (e) {
      console.log(e.message);
      if (e.response && e.response.status === 400) {
        setIsOpenAddEditModal(true);
        console.log(e.response.data.msg);
        alert(e.response.data.msg, { onDismiss: () => setIsOpenAddEditModal(true) });
      } 
      else {
        toast.error('¡Problema al guardar el usuario!', { className: 'danger' });
        alert('Problema al guardar el usuario', { onDismiss: () => setIsOpenAddEditModal(true) });
        setIsOpenAddEditModal(true);
      }
    }
  }
  }
  /*
  axios
  .get("http://localhost:8080/api/calificaciones")
  .then((res) => {
    setData(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
  */
 



  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  // const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

  return (

    <Modal className=" modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false) }>
      <Modal.Header>
        <Modal.Title>Calificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (

            <form id="calificacionForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

              <Form.Group controlId="cotidiano">
              <Form.Label>Cotidiano</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  
                  <CsLineIcons icon="book-open" />
                  <Form.Control
                    id='cotidiano'              
                    type="text"
                    name="cotidiano"
                    placeholder="Cotidiano"
                    value={values.cotidiano}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.cotidiano && touched.cotidiano && (
                    <div className="d-block invalid-tooltip">{errors.cotidiano}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="tarea">
              <Form.Label>Tarea</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="home-garage" />
                  <Form.Control
                    type="text"
                    name="tarea"
                    placeholder="Tarea"
                    value={values.tarea}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.tarea && touched.tarea && (
                    <div className="d-block invalid-tooltip">{errors.tarea}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="examen1">
              <Form.Label>Examen 1</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="quiz" />
                  <Form.Control
                    type="text"
                    name="examen1"
                    placeholder="Examen 1"
                    value={values.examen1}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.examen1 && touched.examen1 && (
                    <div className="d-block invalid-tooltip">{errors.examen1}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="examen2">
              <Form.Label>Examen 2</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="quiz" />
                  <Form.Control
                    type="text"
                    name="examen2"
                    placeholder="Examen 2"
                    value={values.examen2}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.examen2 && touched.examen2 && (
                    <div className="d-block invalid-tooltip">{errors.examen2}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="proyecto">
              <Form.Label>Proyecto</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="file-chart" />
                  <Form.Control
                    type="text"
                    name="proyecto"
                    placeholder="Proyecto"
                    value={values.proyecto}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.proyecto && touched.proyecto && (
                    <div className="d-block invalid-tooltip">{errors.proyecto}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="asistencia">
              <Form.Label>Asistencia</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="online-class" />
                  <Form.Control
                    type="text"
                    name="asistencia"
                    placeholder="Asistencia"
                    value={values.asistencia}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.asistencia && touched.asistencia && (
                    <div className="d-block invalid-tooltip">{errors.asistencia}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="total">
              <Form.Label>Total</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="check-circle" />
                  <Form.Control
                    type="text"
                    name="total"
                    placeholder="Total"
                    value={values.total}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.total && touched.total && (
                    <div className="d-block invalid-tooltip">{errors.total}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="observaciones">
              <Form.Label>Observaciones</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="eye" />
                  <Form.Control
                    as="textarea" 
                    rows={5}
                    type="text"
                    name="observaciones"
                    placeholder="Observaciones"
                    value={values.observaciones}
                    onChange={handleChange}
                    readOnly={(currentUser.role === "Administrador")}
                  />
                  {errors.observaciones && touched.observaciones && (
                    <div className="d-block invalid-tooltip">{errors.observaciones}</div>
                  )}
                </div>
              </Form.Group>

              <div>
                <Row className="g-6">
                  <Col md="4">
                    <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()} hidden={(currentUser.role === "Administrador")} >
                    Cancelar
                    </Button>
                  </Col>
                  <Col md="2">
                    <Button variant="primary" type="submit" hidden={(currentUser.role === "Administrador")}>Subir</Button>
                  </Col>
                </Row>
              </div>


            </form>
          )}
        </Formik>
      </Modal.Body>

      <Modal.Footer>
        {/* <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {selectedFlatRows.length === 1 ? 'Hecho' : 'Agregar'}
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCalificacion;