import { Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
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
          {/* Title Start */}
          <Col md="7">
            <h1 className="medium-title">{title}</h1>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>

      <div>

        {data ? (
            <div key={data.id}>
              <div className="card mb-5">
                <a href="img/product/large/product-1.webp" className="lightbox">
                  <img src="/img/logo/LiceoGuarari.jpg" className="card-img-top sh-50" alt="card image" />
                </a>
                <div className="card-body card mb-5 text-center">
                  <h3 className="mb-3">Liceo Diurno Guararí </h3>
                  <div className="card-title" style={{ display: 'flex', flexDirection: 'row' }}>
                    <h3 className="small-title ">Telefono:  </h3><p>{data.phone}</p>
                  </div>
                  <div className="card mb-5 text-center" style={{ display: 'flex', flexDirection: 'row' }}>
                    <p className="small-title">Electronico:  </p><p>{data.email}</p>
                  </div>
                  <div className="card mb-5 text-center" style={{ display: 'flex', flexDirection: 'row' }}>
                    <p className="small-title">Dirección:  </p><p>{data.location}</p>
                  </div>
                  <div className="card mb-5 sh-50">
                    <div className="card-body h-100">
                      <iframe className="h-70 w-70 text-center" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3564093874397!2d-84.11884098520592!3d9.987389292859756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fad92ee9eef1%3A0xdbadcff68c3ff7aa!2sLiceo%20Diurno%20De%20Guarar%C3%AD!5e0!3m2!1ses!2scr!4v1677693059238!5m2!1ses!2scr"
                        title="GoogleMaps" width="400" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                    </div>
                  </div>
                </div>
                <Button variant="outline-primary" onClick={handleEditClick} className="mb-3" > Editar Contacto</Button>
              </div>
            </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ModalEditContact contact={data} showModal={showModal} setShowModal={setShowModal} setData={setData}/>
    </>
  );
};

export default Contacto;
