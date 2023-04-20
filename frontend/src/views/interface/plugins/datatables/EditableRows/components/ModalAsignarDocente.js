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
import apiSACG from 'api/apiSACG';

const ModalAsignarDocente = ({ tableInstance, docentes, setDocentes, DMS, setDMS }) => {
  const history = useHistory();
 
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  const [selectedOption, setSelectedOption] = useState("");

  let dmsId = "";
  let materiaRes = "";
  let seccionRes = "";

  if (selectedFlatRows.length === 1) {
    dmsId = selectedFlatRows[0].original._id;
    materiaRes = selectedFlatRows[0].original.materia;
    seccionRes = selectedFlatRows[0].original.seccion;
  }

  
  const initialValues = {
    docente:''
  };

  const validationSchema = Yup.object().shape({
    docente: Yup.string().required('Un docente es requerido')
  });

  //const { docente } = Formik;

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
  };

  const cancelRegister = () => {
    document.getElementById("agregarDocenteForm").reset();
  }

  const onSubmit = async () => {
    try {
      const response = await axios.put(apiSACG.concat(`/docentes_materias_secciones/${dmsId}`), {
        docente: selectedOption,
        materia: materiaRes,
        seccion: seccionRes
      });
      toast('¡Docente Asignado!', { className: 'success' });
      setIsOpenAddEditModal(false);
      
      axios
          .get(apiSACG.concat("/docentes_materias_secciones"))
          .then((res) => {
           setDMS(res.data);
            })
            .catch((err) => {
               console.error(err);
             });

      /*
      estudiantes.forEach((val) => {
        calificaciones.forEach((cali) => {
          if (val.cedula === cali.estudiante && val.materia === cali.materia) {
            val.total = cali.total;
          }
        })
      });    
      */         

    } catch (e) {
      console.log(e.message);
      if (e.response && e.response.status === 400) {
        console.log(e.response.data.msg);
        alert(e.response.data.msg);
        setIsOpenAddEditModal(true);
      }  else {
        alert('Problema al actualizar la calificación');
        setIsOpenAddEditModal(true);
      }
    }
  }

  return (

    <Modal show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false) }>
      <Modal.Header>
        <Modal.Title>Asignar Docente</Modal.Title>
      </Modal.Header>
      <Modal.Body>


            <Form id="agregarDocenteForm" className="tooltip-end-bottom" onSubmit={onSubmit}>

              <Form.Group controlId="docente">
              <Form.Label>Docentes</Form.Label>
                <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="user" />
                <Select classNamePrefix="react-select" 
                    options={docentes} 
                    value={docentes.find(function (option) {
                      return option.value === selectedOption;})} 
                    placeholder="Seleccione" 
                    onChange={handleTypeSelect}
                  />
                </div>
              </Form.Group>
              <br/>
              <Row className="mb-3">
                  <Col className="text-center">
                    <Button variant="primary" onClick={() => onSubmit()} style={{ marginRight: '10px' }}>
                      Actualizar
                    </Button>
                    <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()} style={{ marginLeft: '10px' }}>
                      Cancelar
                    </Button>
                  </Col>
                </Row>


            </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAsignarDocente;