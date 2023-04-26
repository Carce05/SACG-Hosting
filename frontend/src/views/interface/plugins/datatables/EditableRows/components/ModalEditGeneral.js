import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEditGeneral = ({ general, showModal, setShowModal, setData, setShowSuccessAlert, setShowDangerAlert }) => {

    const [descriptionCount, setDescriptionCount] = useState(0);
    const maxDescriptionLength = 4;
    useEffect(() => {
        if (!showModal) {
            setDescriptionCount(0);
        }
    }, [showModal]);
    const handleDescriptionChange = (event) => {
        const count = event.target.value.length;
        setDescriptionCount(count);
    };
    const onSubmit = async (values) => {
        try {
            const response = await axios.put('http://localhost:8080/api/general/643f20fe9a24456baf1c57b1', {
                anio: values.anio,
                periodo: values.periodo,
                matriculaActivator: values.matriculaActivator,
            });
            axios
                .get("http://localhost:8080/api/general/643f20fe9a24456baf1c57b1")
                .then((res) => {
                    setData(res.data[0]);
                    setShowSuccessAlert(true);
                })
                .catch((err) => {
                    toast.error('¡Un error ha ocurrido al intentar actualizar la información!');
                    // console.error(err);
                    setShowDangerAlert(true);
                });
            toast.success('¡Información general modificada con exito!');
        } catch (e) {
            if (e.response && e.response.status === 400) {
                toast.error('¡Un error ha ocurrido al intentar actualizar la información!');
                // console.log(e.response.data.msg);
                setShowDangerAlert(true);
            }
            else {
                toast.error('¡Un error ha ocurrido al intentar actualizar la información!');
                setShowDangerAlert(true);
            }
        }
        setShowModal(false);
    };

    const periodoOptions = [
        { value: 'I', label: 'Primer periodo' },
        { value: 'II', label: 'Segundo Periodo' },
        { value: 'III', label: 'Tercer Periodo' },
    ];


    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Información</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={general}
                        onSubmit={(values) => {
                            onSubmit(values)
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <form id="editForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                                <Form.Group controlId="anio" className="mb-2">
                                    <Form.Label>Año Lectivo</Form.Label>
                                    <Form.Control type="number"
                                        name="anio"
                                        value={values.anio}
                                        maxLength={maxDescriptionLength}
                                        onChange={(event) => {
                                            handleDescriptionChange(event);
                                            handleChange(event);
                                        }}
                                        placeholder="Seleccione un año"
                                        min="2020" // Año mínimo permitido
                                        max="2099" // Año máximo permitido
                                        step="1" // Incremento/decremento en unidades de 1
                                    />
                                    <div className="d-block text-muted">
                                        {`${descriptionCount}/${maxDescriptionLength}`}
                                    </div>
                                    {errors.description && touched.description && (
                                        <div className="d-block invalid-tooltip">{errors.description}</div>
                                    )}

                                </Form.Group>
                                <Form.Group controlId="periodo" className="mb-2">
                                    <Form.Label>Periodo Actual</Form.Label>
                                    <Form.Select type="text"
                                        name="periodo"
                                        value={values.periodo}
                                        onChange={handleChange}>
                                        <option value="I">Primer Periodo</option>
                                        <option value="II">Segundo Periodo</option>
                                        <option value="III">Tercer Periodo Periodo</option>
                                        {errors.periodo && touched.periodo && (
                                            <div className="invalid-tooltip-matricula">{errors.nombreCompleto}</div>
                                        )}


                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="matriculaActivator" className="mb-2">
                                    <Form.Label>Estado de la Matricula</Form.Label>
                                    <Form.Select
                                        name="matriculaActivator"
                                        defaultValue={values.matriculaActivator}
                                        onChange={handleChange}
                                    >
                                        <option value="true">Activa</option>
                                        <option value="false">NO activa</option>
                                        {errors.matriculaActivator && touched.matriculaActivator && (
                                            <div className="invalid-tooltip-matricula">{errors.nombreCompleto}</div>
                                        )}
                                    </Form.Select>
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

export default ModalEditGeneral;