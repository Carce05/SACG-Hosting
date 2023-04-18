import React, { useState, useEffect } from 'react';
import { Row, Button, Form, Modal, Col } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAsignarDocente = ({ tableInstance, docentes, setDocentes }) => {
const history = useHistory();
 
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  /*
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
  */




  // const {coti} = calificaciones.length === 2 ? calificaciones[0].cotidiano :'';


  // const estudiante = selectedFlatRows[0].original.cedula;


  // const [selectedItem, setSelectedItem] = useState(initialValues);


  

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


  const { docente } = Formik;



  return (

    <Modal show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false) }>
      <Modal.Header>
        <Modal.Title>Asignar Docente</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (

            <form id="calificacionForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

              <Form.Group controlId="cotidiano">
              <Form.Label>Docentes</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                <Select classNamePrefix="react-select" 
                    options={docentes} 
                    value={docente} 
                    onChange={""} 
                    placeholder="Seleccione" 
                  />
                </div>
              </Form.Group>
              <div>
                <Row className="g-6">
                  <Col md="3">
                    <Button variant="primary" type="submit">Subir</Button>
                  </Col>
                  <Col md="3">
                    <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
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

export default ModalAsignarDocente;