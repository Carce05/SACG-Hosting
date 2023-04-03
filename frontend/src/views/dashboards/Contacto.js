import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState, useEffect } from 'react';
import ModalEditContact from 'views/interface/plugins/datatables/EditableRows/components/ModalEditContact';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";

const Contacto = () => {
  const [data, setData] = useState(null);
  const title = 'Contacto';
  const description = 'Información de contacto';
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const handleEditClick = () => {
    setShowModal(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contacto/63f92ab00cd67a1ade5e243e")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          <Col md="7">
            <h1 className="medium-title">{title}</h1>
          </Col>
          <Col md="5" className="d-flex justify-content-end align-items-center">
            <Button variant="outline-primary" onClick={handleEditClick} className="mb-3">Editar Contacto</Button>
          </Col>
          <Col className="mb-3 d-flex align-items-center justify-content-center">
            {showSuccessAlert && (
                  <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    Contacto actualizado correctamente.
                  </Alert>
                )}
            </Col>
            <Col className="mb-3 d-flex align-items-center justify-content-center">
            {showDangerAlert && (
                  <Alert variant="danger" onClose={() => setShowDangerAlert(false)} dismissible>
                    Un error ha ocurrido al intentar actualizar el contacto.
                  </Alert>
                )}
            </Col>
        </Row>
      </div>
      <div>
        {data ? (
          <div key={data.id}>
            <Row className="justify-content-center">
              <Col xl="7" className="mb-5">
                <div className="card sh-48">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <img src="/img/logo/LiceoGuarari.jpg" className="mb-3" alt="card image" style={{ width: '600px', height: '300px' }} />
                    <h1 className="medium-title">Liceo Diurno de Guararí</h1>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xl="4" className="mb-5">
                <div className="card sh-19">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="phone" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Telefono</p>
                    <p className="card-title mb-0">{data.phone}</p>
                  </div>
                </div>
              </Col>
              <Col xl="4" className="mb-5">
                <div className="card sh-19">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="email" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Correo Electronico</p>
                    <p className="card-title mb-0">{data.email}</p>
                  </div>
                </div>
              </Col>
              <Col xl="4" className="mb-5">
                <div className="card sh-19">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="destination" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Dirección</p>
                    <p className="card-title mb-0">{data.location}</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xl="8" className="mb-5">
                <div className="card sh-60">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="pin" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Ubicación</p>
                    <iframe className="h-70 w-70 text-center" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3564093874397!2d-84.11884098520592!3d9.987389292859756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fad92ee9eef1%3A0xdbadcff68c3ff7aa!2sLiceo%20Diurno%20De%20Guarar%C3%AD!5e0!3m2!1ses!2scr!4v1677693059238!5m2!1ses!2scr"
                      title="GoogleMaps" width="400" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <ModalEditContact contact={data} showModal={showModal} setShowModal={setShowModal} setData={setData} setShowSuccessAlert={setShowSuccessAlert} setShowDangerAlert= {setShowDangerAlert} />
    </>
  );
};

export default Contacto;
