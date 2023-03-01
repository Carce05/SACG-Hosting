import React, { useState, useEffect } from 'react';
import { Row, Button, Form, Modal, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";

const ModalCalificacion = ({ tableInstance }) => {
  const history = useHistory();

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const initialValues = {
    cotidiano: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cotidiano : '',
    tarea: '', 
    examen1: '',
    examen2: '',
    proyecto: '',
    asistencia: '',
    observaciones: ''
  };
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    cotidiano: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de cotidiano requerida'),
    tarea: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de la tarea requerida'),
    examen1: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del primer examen requerida'),
    examen2: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del segundo examen requerida'),
    proyecto: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota del proyecto requerida'),
    asistencia: Yup.string().min(1,'La nota no puede ser menor a 0').required('Nota de asistencia requerida'),
    observaciones: Yup.string().max(200, 'Observaciones no puede contener más de 200 carateres'),
  });

  const onSubmit = async ({ cotidiano, tarea,  examen1, examen2, proyecto, asistencia, observaciones }) => {
    try {
      const rawResponse = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cotidiano,
          tarea, 
          examen1,
          examen2,
          proyecto,
          asistencia
        })
      });
      const response = await rawResponse.json();
      if (rawResponse.status === 400) {
        alert(response.msg);
      } else {
        axios
        .get("http://localhost:8080/api/usuarios")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
        setIsOpenAddEditModal(false);
      }
    } catch (e) {
      console.log(e);
    }

    <Redirect to="/dashboards/usuarios" />
    // history.push("/dashboards/usuarios");
  }

  const cancelRegister = () => {
    document.getElementById("registerForm").reset();
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  // const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

  return (

    <Modal className=" modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
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

            <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

              <Form.Group controlId="cotidiano">
              <Form.Label>Cotidiano</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  
                  <CsLineIcons icon="book-open" />
                  <Form.Control
                    type="text"
                    name="cotidiano"
                    placeholder="Cotidiano"
                    value={values.cotidiano}
                    onChange={handleChange}
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
                  />
                  {errors.asistencia && touched.asistencia && (
                    <div className="d-block invalid-tooltip">{errors.asistencia}</div>
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
                  />
                  {errors.observaciones && touched.observaciones && (
                    <div className="d-block invalid-tooltip">{errors.observaciones}</div>
                  )}
                </div>
              </Form.Group>

              <div>
                <Row className="g-6">
                  <Col md="3">
                    <Button variant="primary" type="submit">Subir</Button>
                  </Col>
                  <Col md="3">
                    <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}>
                    Cancelar
                    </Button>
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
