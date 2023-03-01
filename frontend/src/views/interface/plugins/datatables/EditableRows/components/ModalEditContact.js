import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const ModalEditContact = ({ contact, showModal, setShowModal, setData }) => {

    const onSubmit = async (values) => {
        try {
            const response = await axios.put('http://localhost:8080/api/contacto/63f92ab00cd67a1ade5e243e', {
                phone: values.phone,
                location: values.location,
                email: values.email,
            });
            alert('Contacto actualizado con exito');
            axios
                .get("http://localhost:8080/api/contacto/63f92ab00cd67a1ade5e243e")
                .then((res) => {
                    setData(res.data[0]);
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (e) {
            console.log("PELOS", e.message);
            if (e.response && e.response.status === 400) {
                console.log(e.response.data.msg);
                alert(e.response.data.msg);

            }
            else {
                alert('Problema al actualizar el usuario');

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
                            console.log('en el submit del form', values);
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched }) => (
                            <form id="editForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                                <Form.Group controlId="phone">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange} />

                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="location">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text"
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Actualizar
                                </Button>
                                <Button variant="outline-primary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalEditContact;