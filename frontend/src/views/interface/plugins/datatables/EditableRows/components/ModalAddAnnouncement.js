import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const ModalAddAnnouncement = ({ showModal, setShowModal, setData, setShowSuccessAlert, setShowDangerAlert }) => {
  const initialValues = {
    title: '',
    description: '',
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Un titulo para el aviso es requerido'),
    description: Yup.string().required('Una descripcion para el aviso es requerida'),
  });
  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/comunicados', {
        title: values.title,
        description: values.description,
      });
      axios
        .get("http://localhost:8080/api/comunicados")
        .then((res) => {
          setData(res.data);
          setShowSuccessAlert(true);
        })
        .catch((err) => {
          console.error(err);
        });
      // setShowModal(false);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        // console.log(e.response.data.msg);
        setShowDangerAlert(true);
      }
      else {
        setShowDangerAlert(true);
      }
    }
    setShowModal(false);
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values)
            }}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <form id="editForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-2">
                  <Form.Label>Titulo del aviso</Form.Label>
                  <Form.Control type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title && (
                    <div className="d-block invalid-tooltip">{errors.title}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="description" className="mb-2">
                  <Form.Label>Descripción del aviso</Form.Label>
                  <Form.Control type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange} />
                  {errors.description && touched.description && (
                    <div className="d-block invalid-tooltip">{errors.description}</div>
                  )}
                </Form.Group>
                <Row className="mb-3">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                      Agregar
                    </Button>
                    <Button variant="outline-primary" onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
                      Cancelar
                    </Button>
                  </Col>
                </Row>


              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAddAnnouncement;
