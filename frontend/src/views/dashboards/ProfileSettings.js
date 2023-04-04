import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { actualizarUsuario } from 'store/slices/usuarios/usuarioThunk';
import { useDispatch, useSelector } from 'react-redux';
import { UploadProfileImages } from 'views/interface/components/UploadProfileImages';
import { useForm } from "../../hooks/useForm";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { currentUser, isUpdated } = useSelector((state) => state.auth);
  const { id, name, email, role, thumb, pass } = currentUser;
  const title = 'Profile Settings';
  const description = 'Profile Settings';

  const genderOptions = [
    { value: 'Encargado', label: 'Encargado' },
    { value: 'Profesor', label: 'Profesor' },
    { value: 'Admin', label: 'Admin' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [genderValue, setGenderValue] = useState( { value: role, label: role });

  const { formName, formEmail, formPass, onInputChange, formState } =
  useForm({
    formName: name,
    formEmail: email,
    formPass: 'passvacia'
  });

  const onActualizarPerfil = () => {

    if(formPass !== 'passvacia') {
      dispatch(actualizarUsuario(formState, id));
    } else {
      dispatch(actualizarUsuario({...formState, formPass: pass}, id));
    }
    ref.current.handleSubmit()
  }
  
  console.log(thumb)


  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>

        <Col>


          {/* Public Info Start */}
          <h2 className="small-title">Información del Usuario</h2>
          <Card className="mb-5">
            <Card.Body>
            <UploadProfileImages userData={{
                userId: id,
                updateImage: true,
                thumb
              }} ref={ ref }/>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Nombre</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" name='formName' onChange={ onInputChange } defaultValue={ formName } />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Rol</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={setGenderValue} isDisabled/>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" name='formEmail' onChange={ onInputChange } defaultValue={ formEmail } disabled />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Contraseña</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="password" name='formPass' onChange={ onInputChange } defaultValue={ formPass } />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1" onClick={ onActualizarPerfil }>
                      Actualizar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          { 
          isUpdated && (
            <Alert variant="success">
              Perfil Actualizado con exito
            </Alert>
          )
        }
          {/* Public Info End */}
        </Col>
      </Row>
    </>
  );
};

export default ProfileSettings;
