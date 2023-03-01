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
    name: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.name : '',
    thumb: '',
    email: '',
    role: 'admin',
    password: '',
    personalId: '',
    status: '',
    terms: false
  };
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre completo es requerido'),
    thumb: Yup.string().required('Thumb is required'),
    email: Yup.string().email().required('Correo Electronico requerido'),
    password: Yup.string().min(6, 'Debe tener como minimo 6 caracteres!').required('Favor ingresar contraseña'),
    personalId: Yup.string().min(9, 'Cedula debe contener 9 digitos al menos!').required('Favor ingresar cedula').max(9, 'Cedula debe contener 9 digitos maximo!'),
    terms: Yup.bool().required().oneOf([true], 'Es necesario aceptar los terminos'),
  });

  const onSubmit = async ({ name, thumb, email, role, password, personalId }) => {
    try {
      const rawResponse = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          thumb,
          email,
          password,
          role,
          personalId,
          status: 'Activo'
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

              <Form.Group controlId="name">
              <Form.Label>Cotidiano</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  
                  <CsLineIcons icon="book-open" />
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Cotidiano"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div className="d-block invalid-tooltip">{errors.name}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="personalId">
              <Form.Label>Tarea</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="home-garage" />
                  <Form.Control
                    type="text"
                    name="personalId"
                    placeholder="Tarea"
                    value={values.personalId}
                    onChange={handleChange}
                  />
                  {errors.personalId && touched.personalId && (
                    <div className="d-block invalid-tooltip">{errors.personalId}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="thumb">
              <Form.Label>Examen 1</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="quiz" />
                  <Form.Control
                    type="text"
                    name="thumb"
                    placeholder="Examen 1"
                    value={values.thumb}
                    onChange={handleChange}
                  />
                  {errors.thumb && touched.thumb && (
                    <div className="d-block invalid-tooltip">{errors.thumb}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="email">
              <Form.Label>Examen 2</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="quiz" />
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Examen 2"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="d-block invalid-tooltip">{errors.email}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="password">
              <Form.Label>Proyecto</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="file-chart" />
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Proyecto"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="d-block invalid-tooltip">{errors.password}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="password">
              <Form.Label>Asistencia</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="online-class" />
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Asistencia"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="d-block invalid-tooltip">{errors.password}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="password">
              <Form.Label>Observaciones</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="eye" />
                  <Form.Control
                    as="textarea" 
                    rows={5}
                    type="text"
                    name="password"
                    placeholder="Observaciones"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="d-block invalid-tooltip">{errors.password}</div>
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
