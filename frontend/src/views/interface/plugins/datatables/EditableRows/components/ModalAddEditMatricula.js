import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { agregarMatricula, obtenerMatriculas, onShowAlert } from 'store/slices/matricula/matriculaThunk';
import { setMatriculasLoaded, setMatriculasLoading } from 'store/slices/matricula/matriculaSlice';

const ModalAddEditMatricula = ({ tableInstance }) => {

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const initialValues = {
    encargadoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoId : currentUser.id,
    encargadoLegal : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoLegal : currentUser.name,
    nombreCompleto : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombreCompleto : '',
    fechaNacimiento : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.fechaNacimiento : '',
    edadCumplidaAnios : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.edadCumplidaAnios : '',
    edadCumplidaMeses : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.edadCumplidaMeses : '',
    nacionalidad : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nacionalidad : '',
    telefono : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.telefono : '',
    domicilio : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.domicilio : '',
    centroEducativoProcedencia : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.centroEducativoProcedencia : '',
    nivelAnterior : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nivelAnterior : '',
    matricularNivelDe : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.matricularNivelDe : '',
    estudianteConviveCon : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.estudianteConviveCon : '',
    estudianteConviveConOtros : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.estudianteConviveConOtros : '',
    tieneAdecuancion : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.tieneAdecuancion : '',
    cualAdecuancion : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cualAdecuancion : '',
    razonesEntrar : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.razonesEntrar : '',
  };
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    nombreCompleto: Yup.string().required('Nombre completo es requerido'),
    fechaNacimiento: Yup.string().required('Fecha Nacimiento es requerida'),
    edadCumplidaAnios : Yup.string().required('Años son requeridos'),
    edadCumplidaMeses : Yup.string().required('Meses son requeridos'),
    nacionalidad : Yup.string().required('Nacionalidad es requerida'),
    telefono : Yup.string().required('Telefono es requerido'),
    domicilio : Yup.string().required('Domicilio es requerido'),
    centroEducativoProcedencia : Yup.string().required('Centro Educativo Procedencia es requerido'),
    nivelAnterior : Yup.string().required('Nivel Anterior es requerido'),
    matricularNivelDe : Yup.string().required('Matricula en nivel requerido'),
    estudianteConviveCon : Yup.string().required('Convive con es requerido'),
    tieneAdecuancion : Yup.string().required('Tiene adecuación es requerido'),
    razonesEntrar : Yup.string().required('Razones son requeridas'),
  });

  const cancelRegister = () => {
    document.getElementById("registerForm").reset();
  }
  
  const onSubmit = async (values) => {
    dispatch(setMatriculasLoading())
    dispatch(agregarMatricula(values));
    dispatch(onShowAlert());
    setIsOpenAddEditModal(false)
    cancelRegister();
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (

    <Modal className="full-screen modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Ver Matricula' : 'Agregar Matricula'}</Modal.Title>
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
              <Form.Group controlId="name" className='form-input-hori'>
                <p>Encargado Legal: { values.encargadoLegal } | ID: {  values.encargadoId }</p>
              </Form.Group>
              <Form.Group controlId="name" className='form-input-hori'>
                <p>1. Nombre completo: </p>
                <div className="mb-3 form-group tooltip-end-top invalid-tooltip-matricula-container">
                  <Form.Control
                    type="text"
                    name="nombreCompleto"
                    value={values.nombreCompleto}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.nombreCompleto && touched.nombreCompleto && (
                    <div className="invalid-tooltip-matricula">{errors.nombreCompleto}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
                <p>2. Fecha de Nacimiento: </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="date"
                      name="fechaNacimiento"
                      value={values.fechaNacimiento}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.fechaNacimiento && touched.fechaNacimiento && (
                    <div className="invalid-tooltip-matricula">{errors.fechaNacimiento}</div>
                  )}
                  </div>
                </Form.Group>
                <p>Edad Cumplida: al 15 de febrero del 2023:  </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="edadCumplidaAnios"
                      value={values.edadCumplidaAnios}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.edadCumplidaAnios && touched.edadCumplidaAnios && (
                    <div className="invalid-tooltip-matricula">{errors.edadCumplidaAnios}</div>
                  )}
                  </div>
                </Form.Group>
                <p>(años)</p>
                <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="edadCumplidaMeses"

                    value={values.edadCumplidaMeses}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.edadCumplidaMeses && touched.edadCumplidaMeses && (
                    <div className="invalid-tooltip-matricula">{errors.edadCumplidaMeses}</div>
                  )}
                </div>
              </Form.Group>
              <p>(meses)</p>
              </div>
              <div className='form-input-hori'>
                <p>3. Nacionalidad: </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="nacionalidad"
                      value={values.nacionalidad}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.nacionalidad && touched.nacionalidad && (
                    <div className="invalid-tooltip-matricula">{errors.nacionalidad}</div>
                  )}
                  </div>
                </Form.Group>
                <p>Telefono: </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="telefono"
                      value={values.telefono}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.telefono && touched.telefono && (
                    <div className="invalid-tooltip-matricula">{errors.telefono}</div>
                  )}
                  </div>
                </Form.Group>
              </div>



              <Form.Group controlId="name" className='form-input-hori'>
              <p>4. Domicilio: </p>
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="domicilio"
                    value={values.domicilio}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.domicilio && touched.domicilio && (
                    <div className="invalid-tooltip-matricula">{errors.domicilio}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
              <p>5. Centro Educativo de procendencia: </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="centroEducativoProcedencia"
                      value={values.centroEducativoProcedencia}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.centroEducativoProcedencia && touched.centroEducativoProcedencia && (
                    <div className="invalid-tooltip-matricula">{errors.centroEducativoProcedencia}</div>
                  )}
                  </div>
                </Form.Group>
                <p>Nivel Anterior: </p>
                <Form.Group controlId="name">
                
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="nivelAnterior"
                      value={values.nivelAnterior}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.nivelAnterior && touched.nivelAnterior && (
                    <div className="invalid-tooltip-matricula">{errors.nivelAnterior}</div>
                  )}
                  </div>
                </Form.Group>
              </div>

              <Form.Group controlId="name" className='form-input-hori'>
              <p>6. Matricularé en el nivel de 7: </p>
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="matricularNivelDe"
                    value={values.matricularNivelDe}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.matricularNivelDe && touched.matricularNivelDe && (
                    <div className="invalid-tooltip-matricula">{errors.matricularNivelDe}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
              <p>7. La persona estudiante Convive Con: </p>
              <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top">
                    <Form.Select 
                      name="estudianteConviveCon"
                      defaultValue={values.estudianteConviveCon}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    >
                      <option>Seleccionar</option>
                      <option value="Ambos Padres">Ambos Padres</option>
                      <option value="Solo con la madre">Solo con la madre</option>
                      <option value="Solo con el padre">Solo con el padre</option>
                      <option value="Mamá y padrastro">Mamá y padrastro</option>
                      <option value="Papá y madrastra">Papá y madrastra</option>
                      <option value="Abuelos">Abuelos</option>
                      <option value="Otro">Otro</option>
                    </Form.Select>
                    {errors.estudianteConviveCon && touched.estudianteConviveCon && (
                    <div className="invalid-tooltip-matricula">{errors.estudianteConviveCon}</div>
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="name" className={(values.estudianteConviveCon === 'Otro') ? 'show-element' : 'hide-element' }>
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="estudianteConviveConOtros"
                    value={values.estudianteConviveConOtros}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                    {errors.estudianteConviveConOtros && touched.estudianteConviveConOtros && (
                    <div className="invalid-tooltip-matricula">{errors.estudianteConviveConOtros}</div>
                  )}
                </div>
              </Form.Group>
              </div>
              <div className='form-input-hori'>
              <p>8. Posee algun tipo de adecuación: </p>
              <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Select 
                       name="tieneAdecuancion"
                      defaultValue={values.tieneAdecuancion}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    >
                      <option>Seleccionar</option>
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </Form.Select>

                    {errors.tieneAdecuancion && touched.tieneAdecuancion && (
                    <div className="invalid-tooltip-matricula">{errors.tieneAdecuancion}</div>
                  )}
                </div>
              </Form.Group>
              <div className={(values.tieneAdecuancion === 'true') ? 'form-input-hori show-element' : 'form-input-hori hide-element' }>
                <p>Cual: </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="cualAdecuancion"
                      value={values.cualAdecuancion}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                    {errors.cualAdecuancion && touched.cualAdecuancion && (
                    <div className="invalid-tooltip-matricula">{errors.cualAdecuancion}</div>
                  )}
                  </div>
                </Form.Group>
              </div>

              </div>

              <Form.Group controlId="name">
              <p>9. Cuales son las razones por las que desea que su hijo (a) ingrese al liceo Diurno de Guarari?: </p>
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="textaArea"
                    name="razonesEntrar"
                    as="textarea"
                    value={values.razonesEntrar}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                    {errors.razonesEntrar && touched.razonesEntrar && (
                    <div className="invalid-tooltip-matricula">{errors.razonesEntrar}</div>
                  )}
                </div>
              </Form.Group>
              <Button variant="primary" className={(selectedFlatRows.length) === 1 ? 'hide-element' : ''} type="submit">{selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar Matricula'}
              </Button>
              <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}>
                Cerrar
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEditMatricula;
