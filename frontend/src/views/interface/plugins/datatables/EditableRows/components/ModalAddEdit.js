import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";

const ModalAddEdit = ({ tableInstance }) => {
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
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Editar' : 'Agregar'}</Modal.Title>
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

                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="user" />
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nombre Completo"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div className="d-block invalid-tooltip">{errors.name}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="personalId">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="credit-card" />
                  <Form.Control
                    type="text"
                    name="personalId"
                    placeholder="Cedula"
                    value={values.personalId}
                    onChange={handleChange}
                  />
                  {errors.personalId && touched.personalId && (
                    <div className="d-block invalid-tooltip">{errors.personalId}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="thumb">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="image" />
                  <Form.Control
                    type="text"
                    name="thumb"
                    placeholder="Imagen de perfil"
                    value={values.thumb}
                    onChange={handleChange}
                  />
                  {errors.thumb && touched.thumb && (
                    <div className="d-block invalid-tooltip">{errors.thumb}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="email">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="at-sign" />
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Correo Electronico"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="d-block invalid-tooltip">{errors.email}</div>
                  )}
                </div>
              </Form.Group>

              <Form.Group controlId="password">
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="eye-off" />
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="d-block invalid-tooltip">{errors.password}</div>
                  )}
                </div>
              </Form.Group>

              <div className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Group controlId="role">
                  <Form.Check
                    value="admin"
                    type="radio"
                    aria-label="radio 1"
                    label="Administrador"
                    onChange={handleChange}
                    checked={values.role === "admin"}
                  />
                  <Form.Check
                    value="profesor"
                    type="radio"
                    aria-label="radio 1"
                    label="Profesor"
                    onChange={handleChange}
                    checked={values.role === "profesor"}
                  />
                  <Form.Check
                    value="encargado"
                    type="radio"
                    aria-label="radio 2"
                    label="Encargado"
                    onChange={handleChange}
                    checked={values.role === "encargado"}
                  />
                </Form.Group>
              </div>

              <Form.Group controlId="terms">
                <div className="mb-3 position-relative form-group">
                  <label >Terminos y condiciones</label>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
                    <label className="form-check-label">
                      He leido y aceptado los {' '}
                      <NavLink to="/" target="_blank">
                        terminos y condiciones.
                      </NavLink>
                    </label>
                    {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
                  </div>
                </div>
              </Form.Group>

              <Button variant="primary" type="submit">{selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}>
                Cancelar

              </Button>

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

export default ModalAddEdit;
