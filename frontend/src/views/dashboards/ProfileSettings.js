import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState } from 'react';
import Select from 'react-select';
import { actualizarUsuario } from 'store/slices/usuarios/usuarioThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "../../hooks/useForm";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { currentUser, isUpdated } = useSelector((state) => state.auth);
  const { id, name, email, role, thumb } = currentUser;
  const title = 'Profile Settings';
  const description = 'Profile Settings';

  const genderOptions = [
    { value: 'Encargado', label: 'Encargado' },
    { value: 'Profesor', label: 'Profesor' },
    { value: 'Admin', label: 'Admin' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [genderValue, setGenderValue] = useState( { value: role, label: role });

  const { formName, formEmail, formThumb, onInputChange, formState } =
  useForm({
    formName: name,
    formEmail: email,
    formThumb: thumb,
  });

  const onActualizarPerfil = () => {
    dispatch(actualizarUsuario(formState, id));
  }


  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>

        <Col>


          {/* Public Info Start */}
          <h2 className="small-title">Información del Usuario</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <img className="settings-profile-img" alt={ name } src={ thumb } />
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Imagen</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" name='formThumb' onChange={ onInputChange } defaultValue={ formThumb } />
                  </Col>
                </Row>
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
                    <Form.Control type="email" name='formEmail' onChange={ onInputChange } defaultValue={ formEmail } />
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
