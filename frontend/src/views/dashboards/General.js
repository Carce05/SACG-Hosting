import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState, useEffect } from 'react';
import ModalEditGeneral from 'views/interface/plugins/datatables/EditableRows/components/ModalEditGeneral';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiSACG from 'api/apiSACG';

const General = () => {
  const [data, setData] = useState(null);
  const title = 'Información general del curso lectivo';
  const description = 'Información de contacto';
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const handleEditClick = () => {
    setShowModal(true);
  };
  useEffect(() => {
    axios
      .get(apiSACG.concat("/general/643f20fe9a24456baf1c57b1"))
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
            <Button variant="outline-primary" onClick={handleEditClick} className="mb-3">Editar infomación</Button>
          </Col>
          <Col className="mb-3 d-flex align-items-center justify-content-center">
           
            </Col>
            <Col className="mb-3 d-flex align-items-center justify-content-center">
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
                    <CsLineIcons icon="calendar" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Año Lectivo</p>
                    <p className="card-title mb-0">{data.anio}</p>
                  </div>
                </div>
              </Col>
              <Col xl="4" className="mb-5">
                <div className="card sh-19">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="book-open" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Periodo Actual</p>
                    <p className="card-title mb-0">{data.periodo}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xl="4" className="mb-5">
                <div className="card sh-19">
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <CsLineIcons icon="content" size="25" className="text-primary mb-2" />
                    <p className="heading mb-3 text-primary">Estado de la Matricula</p>
                    <p className="card-title mb-0">{(data.matriculaActivator == 'true') ? 'Activa' : 'NO activa'}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <ModalEditGeneral general={data} showModal={showModal} setShowModal={setShowModal} setData={setData} setShowSuccessAlert={setShowSuccessAlert} setShowDangerAlert= {setShowDangerAlert} />
    </>
  );
};

export default General;
