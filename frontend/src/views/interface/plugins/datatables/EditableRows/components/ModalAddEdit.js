import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { actualizarUsuario, actualizarUsuarioFromAdmin, agregarUsuarioFromAdmin } from 'store/slices/usuarios/usuarioThunk';
import { useDispatch } from 'react-redux';

const ModalAddEdit = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const initialValues = {
    img: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.img : '',
    name: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.name : '',
    thumb: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.thumb : '',
    email: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.email : '',
    role: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.role : 'Administrador',
    password: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.password : '',
    personalId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.personalId : '',
    status: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.status : 'Activo',
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

  const onSubmit = async ({ name, thumb, email, role, password, personalId, status }) => {

    console.log(name);
    // if (selectedFlatRows.length === 1) {
    //   const formState = { name, thumb, email, role, password, status }
    //   console.log(selectedItem)
    //   try {
    //     const {_id: id} = selectedFlatRows[0].original;
    //     dispatch(actualizarUsuarioFromAdmin(formState, id));

    //   } catch (e) {
    //     console.log(e.message);
    //     if (e.response && e.response.status === 400) {
    //       console.log(e.response.data.msg);
    //       alert(e.response.data.msg);
    //       setIsOpenAddEditModal(true);
    //     } 
    //     else {
    //       alert('Problema al actualizar el usuario');
    //       setIsOpenAddEditModal(true);
    //     }
    //   }

    // }
    // else {
    //   try {
    //     const response = await axios.post('http://localhost:8080/api/usuarios/', {
    //       name,
    //       thumb,
    //       email,
    //       password,
    //       role,
    //       personalId,
    //       status
    //     });

    //     alert('Usuario guardado con exito');
        
    //   } catch (e) {
    //     console.log(e.message);
    //     if (e.response && e.response.status === 400) {
    //       setIsOpenAddEditModal(true);
    //       console.log(e.response.data.msg);
    //       alert(e.response.data.msg, { onDismiss: () => setIsOpenAddEditModal(true) });
    //     } 
    //     else {
    //       alert('Problema al guardar el usuario', { onDismiss: () => setIsOpenAddEditModal(true) });
    //       setIsOpenAddEditModal(true);
    //     }
    //   }
    // }
    // axios
    //         .get("http://localhost:8080/api/usuarios")
    //         .then((res) => {
    //           setData(res.data);
    //         })
    //         .catch((err) => {
    //           console.error(err);
    //         });
          
  }
  const cancelRegister = () => {
    document.getElementById("usersForm").reset();
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });


  const onSaveInfo = (e, formState) => {
    e.preventDefault();
    if (selectedFlatRows.length === 1) {
      const {_id: userID} = selectedFlatRows[0].original;
      dispatch(actualizarUsuarioFromAdmin(formState, userID));
    } else {
      dispatch(agregarUsuarioFromAdmin(formState));
    }
    setIsOpenAddEditModal(false);
    cancelRegister();
  }
  return (

    <Modal className=" modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Editar' : 'Agregar'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSaveInfo()
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (

            <form id="usersForm" className="tooltip-end-bottom" onSubmit={ (e) => onSaveInfo(e, values) }>

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
                    value="Administrador"
                    type="radio"
                    aria-label="radio 1"
                    label="Administrador"
                    onChange={handleChange}
                    checked={values.role === "Administrador"}
                  />
                  <Form.Check
                    value="Profesor"
                    type="radio"
                    aria-label="radio 1"
                    label="Profesor"
                    onChange={handleChange}
                    checked={values.role === "Profesor"}
                  />
                  <Form.Check
                    value="Encargado"
                    type="radio"
                    aria-label="radio 2"
                    label="Encargado"
                    onChange={handleChange}
                    checked={values.role === "Encargado"}
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Label>Estado del usuario</Form.Label>
                <Form.Group controlId="status">
                  <Form.Check
                    value="Activo"
                    type="radio"
                    aria-label="radio 1"
                    label="Activo"
                    onChange={handleChange}
                    checked={values.status === "Activo"}
                  />
                  <Form.Check
                    value="Inactivo"
                    type="radio"
                    aria-label="radio 1"
                    label="Inactivo"
                    onChange={handleChange}
                    checked={values.status === "Inactivo"}
                  />
                </Form.Group>
              </div>
              <Button variant="primary" type="submit">{selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar Matricula'}</Button>
              <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}>Cerrar</Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEdit;
