import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { agregarMatricula, matriculaModificarEstado, obtenerMatriculas, onShowAlert } from 'store/slices/matricula/matriculaThunk';
import { setMatriculasLoaded, setMatriculasLoading } from 'store/slices/matricula/matriculaSlice';
import { toast } from 'react-toastify';
import paises from './data/listaPais.json';

const ModalAddEditMatricula = ({ tableInstance }) => {

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  
  const initialValues = {
    encargadoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoId : currentUser.personalId,
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
    estadoMatriculaAdmin : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.estadoMatriculaAdmin : '',
    seccionMatriculaAdmin : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.seccionMatriculaAdmin : '',
  };
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const telephoneRegExp = /^[0-9]{8}$/;

  const validationSchema = Yup.object().shape({
    nombreCompleto: Yup.string()
    .required('Nombre Completo es requerido')
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no debe tener mas de 50 caracteres')
    .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios'),
    fechaNacimiento: Yup.string().required('Fecha Nacimiento es requerida'),
    edadCumplidaAnios: Yup.number()
    .required('Años cumplidos es requerido')
    .min(8, 'Debe ser mayor a 8 años')
    .max(120, 'Ingrese una edad valida'),
    edadCumplidaMeses: Yup.number()
    .required('Meses cumplidos es requerido')
    .min(1, 'Ingrese un mes valido valida')
    .max(12, 'Ingrese un mes valido valida'),
    nacionalidad : Yup.string().required('Nacionalidad es requerida'),
    telefono: Yup.string()
    .matches(telephoneRegExp, 'Teléfono no es válido')
    .required('Teléfono no es requerido'),
    domicilio : Yup.string().required('Domicilio es requerido'),
    centroEducativoProcedencia : Yup.string().required('Centro Educativo Procedencia es requerido'),
    nivelAnterior: Yup.number()
    .required('Nivel anterior es requerido')
    .min(1, 'Ingrese un Nivel valido valida')
    .max(12, 'Ingrese un Nivel valido valida'),
    matricularNivelDe : Yup.string().required('Matricula en nivel requerido'),
    estudianteConviveCon : Yup.string().required('Convive con es requerido'),
    tieneAdecuancion : Yup.string().required('Tiene adecuación es requerido'),
    razonesEntrar : Yup.string().required('Razones son requeridas'),
  });

  const cancelRegister = () => {
    document.getElementById("registerForm").reset();
  }
  
  const onSubmit = async (values) => {
    if(selectedFlatRows.length !== 1) {
      dispatch(setMatriculasLoading())
      dispatch(agregarMatricula(values));
      dispatch(onShowAlert());
      toast('¡Matricula agregada con éxito!')
    } else {
      const {_id: id} = selectedFlatRows[0].original;
      const matriculaEstado  = {
        "seccionAsiganada": "8-2",
        "estadoMatriculaAdmin": values.estadoMatriculaAdmin,
        "apellido": "Guillén",
        "cedula": "1-1828-0064",
        "correo_encargado": "arcecris123@gmail.com",
        "nombre": "Erick",
        "seccion": values.estadoMatriculaAdmin === "Aprobado" ? values.seccionMatriculaAdmin : ""
      }
      dispatch(matriculaModificarEstado(id, matriculaEstado));
      toast('¡Estado de la matricula, actualizado!')
    }
    dispatch(setMatriculasLoading());
    dispatch(onShowAlert());
    setIsOpenAddEditModal(false);
    cancelRegister();
  }


const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = new Date();
const fechaFormateada = `${fecha.getDate()} de ${meses[fecha.getMonth()]} del ${fecha.getFullYear()}`;


  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (

    <Modal className="large-xl modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
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
                <p><b>Encargado Legal:</b> { values.encargadoLegal } | <b>Cédula de identidad:</b> {  values.encargadoId }</p>
              </Form.Group>
              <Form.Group controlId="name" className='form-input-hori label-arriba'>
                <p>1. Nombre completo </p>
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
                <div className='form-input-hori label-arriba mr-40px'>
                  <p>2. Fecha de Nacimiento </p>
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
                </div>
                <div className='form-input-hori label-arriba'>
                <p>Edad Cumplida al <b>{ fechaFormateada }</b></p>
                <div className='form-input-hori'>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="edadCumplidaAnios"
                      placeholder='Años'
                      value={values.edadCumplidaAnios}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    />
                  {errors.edadCumplidaAnios && touched.edadCumplidaAnios && (
                    <div className="invalid-tooltip-matricula">{errors.edadCumplidaAnios}</div>
                  )}
                  </div>
                </Form.Group>
                <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="edadCumplidaMeses"
                    placeholder='Meses'
                    value={values.edadCumplidaMeses}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.edadCumplidaMeses && touched.edadCumplidaMeses && (
                    <div className="invalid-tooltip-matricula">{errors.edadCumplidaMeses}</div>
                  )}
                </div>
              </Form.Group>
              </div>
              </div>
              </div>
              <div className='form-input-hori'>
              <div className='form-input-hori label-arriba mr-40px'>
                <p>3. Nacionalidad </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Select 
                      name="nacionalidad"
                      defaultValue={values.nacionalidad}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                    >
                      <option>Seleccionar</option>
                      {
                        paises.map(({ nombrePais  }) => (
                          <option key={nombrePais} value={ nombrePais }>{ nombrePais }</option>
                        ))
                      }
                    </Form.Select>
                  {errors.nacionalidad && touched.nacionalidad && (
                    <div className="invalid-tooltip-matricula">{errors.nacionalidad}</div>
                  )}
                  </div>
                </Form.Group>
                </div>
                <div className='form-input-hori label-arriba'>
                <p>Telefono </p>
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
              </div>



              <Form.Group controlId="name" className='form-input-hori label-arriba'>
              <p>4. Domicilio </p>
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
              <div className='form-input-hori label-arriba mr-40px'>
              <p>5. Centro Educativo de procendencia </p>
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
                </div>
                <div className='form-input-hori label-arriba'>
                <p>Nivel Anterior </p>
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
              </div>

              <Form.Group controlId="name" className='form-input-hori label-arriba'>
              <p>6. Matricularé en el nivel de 7 </p>
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
              <div className='form-input-hori label-arriba'>
              <p>7. La persona estudiante Convive Con </p>
              <Form.Group controlId="name">
              <div className="mb-3 form-group tooltip-end-top form-input-hori">
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
                    <Form.Group controlId="name" className={(values.estudianteConviveCon === 'Otro') ? 'show-element form-input-hori' : 'hide-element' }>
              <p className='mb-0'>Cual: </p>
                <div className="form-group tooltip-end-top">
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
                    {errors.estudianteConviveCon && touched.estudianteConviveCon && (
                    <div className="invalid-tooltip-matricula">{errors.estudianteConviveCon}</div>
                  )}
                </div>
              </Form.Group>
              </div>

              </div>
              <div className='form-input-hori'>
              <div className='form-input-hori label-arriba'>
              <p>8. Posee algun tipo de adecuación </p>
              <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top form-input-hori">
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
                    <div className={(values.tieneAdecuancion === 'true') ? 'form-input-hori show-element' : 'form-input-hori hide-element' }>
                      <div className='form-input-hori'>
                        <p>Cual: </p>
                        <Form.Group controlId="name">
                          <div className="form-group tooltip-end-top">
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

                    {errors.tieneAdecuancion && touched.tieneAdecuancion && (
                    <div className="invalid-tooltip-matricula">{errors.tieneAdecuancion}</div>
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
                      {
                        (selectedFlatRows.length === 1 && currentUser.role === 'Administrador') && (
                          <>   
                           <Modal.Title>Modificar estado de la matricula</Modal.Title>
                          
                          <hr/>
                          <div className='form-input-hori label-arriba'>
                            <p>Estado Actual de la matricula</p>
                            <Form.Group controlId="name">
                              <div className="mb-3 form-group tooltip-end-top form-input-hori">
                                <Form.Select 
                                  name="estadoMatriculaAdmin"
                                  defaultValue={values.estadoMatriculaAdmin}
                                  onChange={handleChange}
                                  >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="Rechazado">Rechazado</option>
                                  </Form.Select>
                                  <div className={(values.estadoMatriculaAdmin === 'Aprobado') ? 'form-input-hori show-element' : 'form-input-hori hide-element' }>
                                    <div className='form-input-hori'>
                                      <p>Sección: </p>
                                      <Form.Group controlId="name">
                                        <div className="mb-3 form-group tooltip-end-top">
                                          <Form.Control
                                            type="text"
                                            name="seccionMatriculaAdmin"
                                            value={values.seccionMatriculaAdmin}
                                            onChange={handleChange}
                                          />
                                          {errors.seccionMatriculaAdmin && touched.seccionMatriculaAdmin && ( <div className="invalid-tooltip-matricula">{errors.cualAdecuancion}</div> )}
                                        </div>
                                      </Form.Group>
                                    </div>
                                  </div>
                                  {errors.estadoMatriculaAdmin && touched.estadoMatriculaAdmin && (<div className="invalid-tooltip-matricula">{errors.estadoMatriculaAdmin}</div> )}
                              </div>
                            </Form.Group>
                          </div>
                        </>



                        )
                      }

              <Button variant="primary" className={(selectedFlatRows.length) === 1 ? 'hide-element' : ''} type="submit">{selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar Matricula'}</Button>
              <Button variant="primary" className={(selectedFlatRows.length) !== 1 ? 'hide-element' : ''} type="submit">Modificar estado</Button>
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
