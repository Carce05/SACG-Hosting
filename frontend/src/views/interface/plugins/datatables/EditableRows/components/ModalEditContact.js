import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const ModalEditContact = ({ contact, showModal, setShowModal, setData, setShowSuccessAlert, setShowDangerAlert }) => {
    const onSubmit = async (values) => {
        try {
            const response = await axios.put('http://localhost:8080/api/contacto/63f92ab00cd67a1ade5e243e', {
                phone: values.phone,
                location: values.location,
                email: values.email,
            });
            axios
                .get("http://localhost:8080/api/contacto/63f92ab00cd67a1ade5e243e")
                .then((res) => {
                    setData(res.data[0]);
                    setShowSuccessAlert(true);
                })
                .catch((err) => {
                    // console.error(err);
                    setShowDangerAlert(true);
                });
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
                    <Modal.Title>Editar Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={contact}
                        onSubmit={(values) => {
                            onSubmit(values)
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched }) => (
                            <form id="editForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                                <Form.Group controlId="phone" className="mb-2">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange} />

                                </Form.Group>
                                <Form.Group controlId="email" className="mb-2">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="location" className="mb-2">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text"
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Row className="mb-3">
                                    <Col className="text-center">
                                        <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                                            Actualizar
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
};

export default ModalEditContact;