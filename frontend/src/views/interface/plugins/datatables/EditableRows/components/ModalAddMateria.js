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

const ModalAddMateria = ({ tableInstance }) => {

  const { selectedFlatRows, data, setData, setIsOpenAddMateriaModal, isOpenAddMateriaModal } = tableInstance;

  return (
    <>
      <Modal onHide={() => setIsOpenAddMateriaModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>

              <form id="editForm" className="tooltip-end-bottom" onSubmit={""}>
                <Form.Group controlId="title" className="mb-2">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <Form.Label>Titulo del aviso</Form.Label>
                  </div>
                </Form.Group>
                <Form.Group controlId="description" className="mb-2">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <Form.Label>Descripción del aviso</Form.Label>
                </div>
                </Form.Group>
                <Row className="mb-3">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                      Agregar
                    </Button>
                    <Button variant="outline-primary" onClick={() => setIsOpenAddMateriaModal(false)} style={{ marginLeft: '10px' }}>
                      Cancelar
                    </Button>
                  </Col>
                </Row>


              </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddMateria;