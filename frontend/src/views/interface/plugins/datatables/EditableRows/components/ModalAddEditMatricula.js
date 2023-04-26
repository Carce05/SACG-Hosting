import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { agregarMatricula, matriculaModificarEstado, onShowAlert } from 'store/slices/matricula/matriculaThunk';
import { setMatriculasLoading } from 'store/slices/matricula/matriculaSlice';
import { toast } from 'react-toastify';
import paises from './data/listaPais.json';

const ModalAddEditMatricula = ({ tableInstance }) => {

  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { matriculas } = useSelector((state) => state.matricula);
  const { secciones } = useSelector((state) => state.seccion);
  const [initialValues, setInitialValues] = useState({});
  const [matriculasPorUsuario, setMatriculasPorUsuario] = useState([]);

  const initValues = {
    encargadoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoId : currentUser.personalId,
    encargadoCorreo : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoCorreo : currentUser.email,
    encargadoLegal : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoLegal : currentUser.name,
    nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    apellido : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.apellido : '',
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
    cedulaEstudiante : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cedulaEstudiante : '',
  } 

  useEffect(() => {
    setInitialValues({
      encargadoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoId : currentUser.personalId,
      encargadoCorreo : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoCorreo : currentUser.email,
      encargadoLegal : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoLegal : currentUser.name,
      nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
      apellido : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.apellido : '',
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
      cedulaEstudiante : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cedulaEstudiante : '',
    })
    const matriculasPorUsuarioFiltradas = matriculas.filter(element => element.encargadoId === currentUser.personalId);
    const mostRecentRows = Object.values(matriculasPorUsuarioFiltradas.reduce((acc, obj) => {
      if (!acc[obj.cedulaEstudiante] || obj.fechaCreacionMatricula > acc[obj.cedulaEstudiante].fechaCreacionMatricula) {
        acc[obj.cedulaEstudiante] = obj;
      }
      return acc;
    }, {}));
    setMatriculasPorUsuario(mostRecentRows);
  }, [selectedFlatRows])
  
  const [selectedItem, setSelectedItem] = useState(initialValues);

  const telephoneRegExp = /^[0-9]{8}$/;
  const cedulaRegExp = /^[0-9]{9}$/;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
    .required('Nombre Completo es requerido')
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no debe tener mas de 50 caracteres')
    .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios'),
    apellido: Yup.string()
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
    .min(0, 'Ingrese un Nivel valido valida')
    .max(12, 'Ingrese un Nivel valido valida'),
    matricularNivelDe : Yup.number().min(Yup.ref('nivelAnterior'), 'El nivel a matricular debe ser mayor que el nivel anterior').required('Nivel anterior es requerido'),
    estudianteConviveCon : Yup.string().required('Convive con es requerido'),
    tieneAdecuancion : Yup.string().required('Tiene adecuación es requerido'),
    razonesEntrar : Yup.string().required('Razones son requeridas'),
    cedulaEstudiante: Yup.string()
    .matches(cedulaRegExp, 'Cedula tiene un formato no valido')
    .required('Cedula es es requerida'),
  });

  const cancelRegister = () => {
    document.getElementById("registerForm").reset();
  }
  
  const onSubmit = async (values) => {
    if(selectedFlatRows.length !== 1) {
      dispatch(setMatriculasLoading())
      dispatch(agregarMatricula(values));
      dispatch(onShowAlert());
      toast.success('¡Matricula agregada con éxito!')
    } else {
      const {_id: id} = selectedFlatRows[0].original;
      const matriculaEstado  = {
        "nombre": values.nombre,
        "apellido": values.apellido,
        "estadoMatriculaAdmin": values.estadoMatriculaAdmin,
        "cedula": values.cedulaEstudiante,
        "correo_encargado": values.encargadoCorreo,
        "seccion": values.estadoMatriculaAdmin === "Aprobado" ? values.seccionMatriculaAdmin : ""
      }
      dispatch(matriculaModificarEstado(id, matriculaEstado));
      toast.success('¡Estado de la matricula, actualizado!');
    }
    dispatch(setMatriculasLoading());
    dispatch(onShowAlert());
    setIsOpenAddEditModal(false);
    cancelRegister();
  }


const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = new Date();
const fechaFormateada = `${fecha.getDate()} de ${meses[fecha.getMonth()]} del ${fecha.getFullYear()}`;


const onCargarExistenteMatricula = ({ target }) => {
  const { value } = target;
  if (value === "seleccionar-prellenado") {
    setInitialValues({
      encargadoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoId : currentUser.personalId,
      encargadoCorreo : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoCorreo : currentUser.email,
      encargadoLegal : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.encargadoLegal : currentUser.name,
      nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
      apellido : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.apellido : '',
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
      cedulaEstudiante : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cedulaEstudiante : '',
    })
  } else {
    const { encargadoId, encargadoCorreo, nombre, apellido, encargadoLegal, fechaNacimiento, edadCumplidaAnios, edadCumplidaMeses, nacionalidad, telefono, domicilio, centroEducativoProcedencia, nivelAnterior, matricularNivelDe, estudianteConviveCon, estudianteConviveConOtros, tieneAdecuancion, cualAdecuancion, razonesEntrar, estadoMatriculaAdmin, seccionMatriculaAdmin, cedulaEstudiante } = matriculas.find(({ _id:id }) => id === value );
    setInitialValues({
      encargadoId,
      encargadoCorreo,
      encargadoLegal,
      nombre,
      apellido,
      fechaNacimiento,
      edadCumplidaAnios,
      edadCumplidaMeses,
      nacionalidad,
      telefono,
      domicilio,
      centroEducativoProcedencia,
      nivelAnterior,
      matricularNivelDe,
      estudianteConviveCon,
      estudianteConviveConOtros,
      tieneAdecuancion,
      cualAdecuancion,
      razonesEntrar,
      estadoMatriculaAdmin,
      seccionMatriculaAdmin,
      cedulaEstudiante
    })
  }
}

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (

    <Modal className="large-xl modal-right fade" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Ver Matricula' : 'Agregar Matricula'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          initialValues={(selectedFlatRows.length === 1 && currentUser.role === 'Administrador') ? initValues: initialValues }
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                                  {
                        (selectedFlatRows.length === 1 && currentUser.role === 'Administrador') && (
                          <>   
                           <Modal.Title>Modificar estado de la matricula</Modal.Title>
                          
                          <hr/>
                          <div className='form-input-hori label-arriba'>
                            <p>Estado Actual de la matricula:</p>
                            <Form.Group controlId="name">
                              <div className="mb-2 form-group tooltip-end-top form-input-hori">
                                <Form.Select 
                                  name="estadoMatriculaAdmin"
                                  defaultValue={values.estadoMatriculaAdmin}
                                  onChange={handleChange}
                                  >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="Rechazado">Rechazado</option>
                                  </Form.Select>
                                  {errors.estadoMatriculaAdmin && touched.estadoMatriculaAdmin && (<div className="invalid-tooltip-matricula">{errors.estadoMatriculaAdmin}</div> )}
                              </div>
                              <div className={(values.estadoMatriculaAdmin === 'Aprobado') ? 'form-input-hori show-element' : 'form-input-hori hide-element' }>
                                    <div className='form-input-hori mb-3 label-arriba'>
                                      <p>Sección: </p>
                                      <Form.Select 
                                        name="seccionMatriculaAdmin"
                                        defaultValue={ values.seccionMatriculaAdmin }
                                        onChange={handleChange}
                                      >
                                        {
                                         
                                          secciones.map(({ nombreSeccion  }) => (
                                            <option key={nombreSeccion} value={ nombreSeccion }>{ nombreSeccion }</option>
                                          ))
                                        }
                                        </Form.Select>
                                    </div>
                                  </div>
                            </Form.Group>
                          </div>
                        </>
                        )
                      }
              <h5>Información del encargado Legal</h5>
              <Form.Group controlId="name" className='form-input-hori'>
                <p><b>Nombre Completo:</b> { values.encargadoLegal }<br/>
                <b>Cédula de identidad:</b> {  values.encargadoId }<br/>
                <b>Correo Electrónico:</b> {  values.encargadoCorreo }<br/>
                </p>
              </Form.Group>
              {
                (selectedFlatRows.length !== 1 && matriculasPorUsuario.length > 0) && (
                  <div className='form-input-hori label-arriba mr-40px'>
                  <p>Prellenar información de matricula por estudiante</p>
                  <Form.Group controlId="name">
                    <div className="mb-3 form-group tooltip-end-top">
                      <Form.Select 
                        name="nacionalidad"
                        defaultValue={values.nacionalidad}
                        onChange={ onCargarExistenteMatricula }
                        disabled={ selectedFlatRows.length === 1 }
                      >
                        <option value="seleccionar-prellenado">Nuevo Ingreso</option>
                        {
                          matriculasPorUsuario.map(({ nombre, fechaCreacionMatricula, _id  }) => (
                            <option key={_id} value={ _id }>Estudiante: { nombre } - Fecha de creación de la matricula: { fechaCreacionMatricula }</option>
                          ))
                        }
                      </Form.Select>
                    {errors.nacionalidad && touched.nacionalidad && (
                      <div className="invalid-tooltip-matricula">{errors.nacionalidad}</div>
                    )}
                    </div>
                  </Form.Group>
                  </div>
                )
              }
              <Form.Group controlId="name" className='form-input-hori label-arriba'>
                <p>Cédula del estudiante</p>
                <div className="mb-3 form-group tooltip-end-top invalid-tooltip-matricula-container">
                  <Form.Control
                    type="text"
                    name="cedulaEstudiante"
                    value={values.cedulaEstudiante}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                  />
                  {errors.cedulaEstudiante && touched.cedulaEstudiante && (
                    <div className="invalid-tooltip-matricula">{errors.cedulaEstudiante}</div>
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="name" className='form-input-hori label-arriba'>
                <p>Nombre </p>
                <div className="mb-3 form-group tooltip-end-top invalid-tooltip-matricula-container">
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    style={{ width: '650px' }}
                  />
                  {errors.nombre && touched.nombre && (
                    <div className="invalid-tooltip-matricula">{errors.nombre}</div>
                  )}
                </div>
                <p>Apellidos</p>
                <div className="mb-3 form-group tooltip-end-top invalid-tooltip-matricula-container">
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    style={{ width: '650px' }}
                  />
                  {errors.apellido && touched.apellido && (
                    <div className="invalid-tooltip-matricula">{errors.apellido}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
                <div className='form-input-hori label-arriba mr-40px'>
                  <p>1. Fecha de Nacimiento </p>
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
                  <Form.Select 
                    name="edadCumplidaMeses"
                    defaultValue={values.edadCumplidaMeses}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    >
                      <option value="1">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                  </Form.Select>
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
                <p>2. Pais de procedencia </p>
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
                       style={{ width: '275px' }}
                    />
                  {errors.telefono && touched.telefono && (
                    <div className="invalid-tooltip-matricula">{errors.telefono}</div>
                  )}
                  </div>
                </Form.Group>
                </div>
              </div>



              <Form.Group controlId="name" className='form-input-hori label-arriba'>
              <p>3. Domicilio </p>
                <div className="mb-3 form-group tooltip-end-top">
                  <Form.Control
                    type="text"
                    name="domicilio"
                    value={values.domicilio}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    style={{ width: '655px' }}
                  />
                  {errors.domicilio && touched.domicilio && (
                    <div className="invalid-tooltip-matricula">{errors.domicilio}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
              <div className='form-input-hori label-arriba mr-40px'>
              <p>4. Centro Educativo de procendencia </p>
                <Form.Group controlId="name">
                  <div className="mb-3 form-group tooltip-end-top">
                    <Form.Control
                      type="text"
                      name="centroEducativoProcedencia"
                      value={values.centroEducativoProcedencia}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                       style={{ width: '450px' }}
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
                  <Form.Select 
                    name="nivelAnterior"
                    defaultValue={values.nivelAnterior}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    style={{ width: '155px' }}
                    >
                      <option value="0">Seleccionar</option>
                      <option value="1">Escuela</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                  </Form.Select>
                  {errors.nivelAnterior && touched.nivelAnterior && (
                    <div className="invalid-tooltip-matricula">{errors.nivelAnterior}</div>
                  )}
                  </div>
                </Form.Group>
                </div>
              </div>

              <Form.Group controlId="name" className='form-input-hori label-arriba'>
              <p>5. Nivel a matricular</p>
                <div className="mb-3 form-group tooltip-end-top">
                <Form.Select 
                    name="matricularNivelDe"
                    defaultValue={values.matricularNivelDe}
                    onChange={handleChange}
                    disabled={ selectedFlatRows.length === 1 }
                    >
                      <option value="0">Seleccionar</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                  </Form.Select>
                  {errors.matricularNivelDe && touched.matricularNivelDe && (
                    <div className="invalid-tooltip-matricula">{errors.matricularNivelDe}</div>
                  )}
                </div>
              </Form.Group>
              <div className='form-input-hori'>
              <div className='form-input-hori label-arriba'>
              <p>6. La persona estudiante Convive Con </p>
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
              <p>7. Posee algun tipo de adecuación </p>
              <Form.Group controlId="name">
                <div className="mb-3 form-group tooltip-end-top form-input-hori">
                  <Form.Select 
                       name="tieneAdecuancion"
                      defaultValue={values.tieneAdecuancion}
                      onChange={handleChange}
                       disabled={ selectedFlatRows.length === 1 }
                       style={{ width: '150px' }}
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
                              style={{ width: '465px' }}
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
              <p>8. Cuales son las razones por las que desea que su hijo (a) ingrese al liceo Diurno de Guarari?: </p>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <Button
                  variant="primary"
                  className={(selectedFlatRows.length) === 1 ? 'hide-element' : ''}
                  type="submit"
                >
                  {selectedFlatRows.length === 1 ? 'Actualizar' : 'Agregar Matrícula'}
                </Button>
                  {
                    (selectedFlatRows.length === 1 && currentUser.role === 'Administrador') && (
                      <Button
                      variant="primary"
                      className={(selectedFlatRows.length) !== 1 ? 'hide-element' : ''}
                      type="submit"
                    >
                      Modificar estado
                    </Button>
                    )
                  }
                <Button
                  variant="outline-primary"
                  onClick={() => setIsOpenAddEditModal(false) || cancelRegister()}
                >
                  Cerrar
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEditMatricula;
