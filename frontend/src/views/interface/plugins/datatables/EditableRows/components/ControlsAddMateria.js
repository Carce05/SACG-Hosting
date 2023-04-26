import React, { useState } from 'react';
import { Modal, Button, Form, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ControlsAddMateria = ({ tableInstance, secciones,  setDMS  }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { selectedFlatRows, data, setData } = tableInstance;



  const initialValues = {
    materia: ''
  };

  const validationSchema = Yup.object().shape({
    materia: Yup.string().required('Materia es requerida')
  });

  const onCancelAdd = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const handleTypeSelect = (e) => {
    setSelectedOption(e.seccion);
  };

  const onSubmit = async (values) => {
    try{
      await axios.post('http://localhost:8080/api/docentes_materias_secciones/', {
      docente: "",
      materia: values.materia,
      seccion: selectedOption,
    });

    toast.success('¡Materia Agregada!', { className: 'success' });

    setShowModal(false);

    const response = await axios.get(`http://localhost:8080/api/docentes_materias_secciones/`);
    const resultsDMS = [];

    /* eslint no-underscore-dangle: 0 */
    response.data.forEach((val) => {
      resultsDMS.push({
        _id: val._id,
        docente: val.docente,
        materia: val.materia,
        seccion: val.seccion
      });
    });

    if (data[0]){
      const resultsUpdate = resultsDMS.filter(x => x.seccion === data[0].seccion);
      setData([ 
        ...resultsUpdate
      ])  
    }

    setDMS([ 
      ...resultsDMS
    ])



    setSelectedOption((""));
    
    } catch {

    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Agregar</Tooltip>}>
        <Button onClick={onAddButtonClick} variant="foreground-alternate" className="btn-xl btn-icon-only shadow delete-datatable">
          <CsLineIcons icon="plus" />
        </Button>
      </OverlayTrigger>
      <Modal show={showModal} onHide={onCancelAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Materia</Modal.Title>
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

          <form id="materiaForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <Form.Group controlId="docente">
              <Form.Label>Sección</Form.Label>
              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="note" />
                <Select classNamePrefix="react-select" 
                    options={secciones} 
                    value={secciones.find(function (option) {
                      return option.value === selectedOption;})} 
                    placeholder="Seleccione" 
                    onChange={handleTypeSelect}
                  />
              </div>
            </Form.Group>
            <Form.Group controlId="materia">
              <Form.Label>Materia</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">                
                  <CsLineIcons icon="book-open" />
                  <Form.Control
                    type="text"
                    name="materia"
                    placeholder="Materia"
                    value={values.materia}
                    onChange={handleChange}
                  />
                {errors.materia && touched.materia && (
                  <div className="d-block invalid-tooltip">{errors.materia}</div>
                )}                  
                </div>
            </Form.Group>
            <Row className="mb-3">
                  <Col className="text-center">
            <Button variant="outline-primary" onClick={onCancelAdd} style={{ marginRight: '10px' }}>Cancelar</Button>
            <Button variant="primary" type="submit" style={{ marginLeft: '10px' }} >Agregar</Button>
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
export default ControlsAddMateria;
