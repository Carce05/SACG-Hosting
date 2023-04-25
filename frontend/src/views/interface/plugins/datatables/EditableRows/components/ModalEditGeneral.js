import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiSACG from 'api/apiSACG';

const ModalEditGeneral = ({ general, showModal, setShowModal, setData, setShowSuccessAlert, setShowDangerAlert }) => {
    const [descriptionCount, setDescriptionCount] = useState(0);
    const maxDescriptionLength = 3;

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
            const response = await axios.put(apiSACG.concat('/general/643f20fe9a24456baf1c57b1'), {
                anio: values.anio,
                periodo: values.periodo,
            });
            axios
                .get(apiSACG.concat("/general/643f20fe9a24456baf1c57b1"))
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
                        {({ handleSubmit, handleChange, values, touched }) => (
                            <form id="editForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                                <Form.Group controlId="anio" className="mb-2">
                                    <Form.Label>Año Lectivo</Form.Label>
                                    <Form.Control type="text"
                                        name="anio"
                                        value={values.anio}
                                        onChange={handleChange} />

                                </Form.Group>
                                <Form.Group controlId="periodo" className="mb-2">
                                    <div className="mb-3 filled form-group tooltip-end-top">
                                        <Form.Label>Periodo Actual</Form.Label>
                                        <Form.Control type="text"
                                            name="periodo"
                                            value={values.periodo}
                                            maxLength={maxDescriptionLength}
                                            onChange={(event) => {
                                                handleDescriptionChange(event);
                                                handleChange(event);
                                            }} />

                                        <div className="d-block text-muted">
                                            {`${descriptionCount}/${maxDescriptionLength}`}
                                        </div>
                                        {errors.description && touched.description && (
                                            <div className="d-block invalid-tooltip">{errors.description}</div>
                                        )}

                                    </div>
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