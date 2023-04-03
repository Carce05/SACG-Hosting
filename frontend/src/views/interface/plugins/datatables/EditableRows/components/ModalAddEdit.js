import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { actualizarUsuario, actualizarUsuarioFromAdmin, agregarUsuarioNuevo } from 'store/slices/usuarios/usuarioThunk';
import { useDispatch } from 'react-redux';
import { UploadProfileImages } from 'views/interface/components/UploadProfileImages';

const ModalAddEdit = ({ tableInstance, setShowSuccessAlert, setShowDangerAlert }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const initialValues = {
    /* eslint no-underscore-dangle: 0 */
    userMongoId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original._id : '',
    img: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.img : '',
    thumb: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.thumb : '',
    name: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.name : '',
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
    email: Yup.string().email().required('Correo Electronico requerido'),
    password: Yup.string().min(6, 'Debe tener como minimo 6 caracteres!').required('Favor ingresar contraseña'),
    personalId: Yup.string().min(9, 'Cedula debe contener 9 digitos al menos!').required('Favor ingresar cedula').max(9, 'Cedula debe contener 9 digitos maximo!'),
    // terms: Yup.bool().required().oneOf([true], 'Es necesario aceptar los terminos'),
  });

  const onSubmit = async ({ name, thumb, email, role, password, personalId, status }) => {
    if (selectedFlatRows.length === 1) {
      try {
        const {_id: id} = selectedFlatRows[0].original;
        const response = await axios.put(`http://localhost:8080/api/usuarios/${id}`, {
          name,
          thumb,
          email,
          password,
          role,
          personalId,
          status
        });
        ref.current.handleSubmit();
        setShowSuccessAlert(true);
      } catch (e) {
        console.log(e.message);
        setShowDangerAlert(true);
        if (e.response && e.response.status === 400) {
          // console.log(e.response.data.msg);
          setShowDangerAlert(true);
        } 
        else {
          setShowDangerAlert(true);
        }
      }
    }
    else {
      try {
        const userToSave = {
          name,
          thumb,
          email,
          password,
          role,
          personalId,
          status
        }
        dispatch(agregarUsuarioNuevo(userToSave, ref.current.returnImage()));
        setShowSuccessAlert(true);
      } catch (e) {
        if (e.response && e.response.status === 400) {
          setIsOpenAddEditModal(true);
          console.log(e.response.data.msg);
          alert(e.response.data.msg, { onDismiss: () => setIsOpenAddEditModal(true) });
        } 
        else {
          setShowDangerAlert(true);
          // alert('Problema al guardar el usuario', { onDismiss: () => setIsOpenAddEditModal(true) });
        }
      }
    }
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
  const cancelRegister = () => {
    document.getElementById("registerForm").reset();
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });


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
              <Form.Group controlId="name">

              {
                selectedFlatRows.length === 1 
                ? <UploadProfileImages userData={{
                  userId: values.userMongoId,
                  updateImage: true,
                  thumb: values.thumb
                }} ref={ ref }/>
                : <UploadProfileImages userData={{
                  userId: values.userMongoId,
                  updateImage: false,
                  thumb: values.thumb
                }} ref={ ref }/>

              }

              </Form.Group>
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
                    type="text"
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
              <Button variant="primary" type="submit">{selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}>
                Cancelar
              </Button>   
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEdit;
