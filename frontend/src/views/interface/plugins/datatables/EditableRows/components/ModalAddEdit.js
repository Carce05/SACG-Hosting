import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, useHistory } from 'react-router-dom';

const ModalAddEdit = ({ tableInstance }) => {
  const history = useHistory();

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const initialValues = { name: '', thumb: '', email: '', role: 'admin', password: '', terms: false };
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre completo es requerido'),
    thumb: Yup.string().required('Thumb is required'),
    email: Yup.string().email().required('Correo Electronico requerido'),
    password: Yup.string().min(6, 'Debe tener como minimo 6 caracteres!').required('Favor ingresar contraseña'),
    terms: Yup.bool().required().oneOf([true], 'Es necesario aceptar los terminos'),
  });

  const onSubmit = async ({ name, thumb, email, role, password }) => {
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
        role
      })
    });
    history.push("/dashboards/usuarios");
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
            onSubmit(values) 
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (

            <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>

              
              {/* <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="user" />
                <Form.Control type="text" name="name" placeholder="Nombre Completo" value={values.name} onChange={handleChange} />
                {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
              </div>

              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="user" />
                <Form.Control type="text" name="thumb" placeholder="Fotografia" value={values.thumb} onChange={handleChange} />
                {errors.thumb && touched.thumb && <div classthumb="d-block invalid-tooltip">{errors.thumb}</div>}
              </div>

              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="email" />
                <Form.Control type="text" name="email" placeholder="Correo Electronico" value={values.email} onChange={handleChange} />
                {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <CsLineIcons icon="lock-off" />
                <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Contraseña" />
                {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
              </div> */}

          <Form.Group controlId="name">
            <div className="mb-3 filled form-group tooltip-end-top">
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

          <Form.Group controlId="thumb">
            <div className="mb-3 filled form-group tooltip-end-top">
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

              <Button variant="primary" type="submit">Agregar :|
              </Button>

              <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
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
