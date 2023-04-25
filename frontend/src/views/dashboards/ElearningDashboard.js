import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import Glide from 'components/carousel/Glide';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import apiSACG from 'api/apiSACG';
import YourTimeChart from './components/YourTimeChart';

const ElearningDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const title = 'Inicio';
  const description = 'Inicio del Sistema Acádemico';

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(apiSACG.concat('/comunicados'));
      const data = await result.json();
      setAnnouncements(data);
    };

    fetchData();
  }, []);
  const breadcrumbs = [{ to: '', text: '' }];
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-4 display-4">{title}</h1>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="row-cols-1 row-cols-lg-5 g-2 mb-5">
        {/* Continue Learning Start */}

        <Col xl="6" className="mb-5">
          <h2 className="small-title">Avisos</h2>
          {announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4).map((announcement) => {
            const createdAtDate = new Date(announcement.createdAt);
            return (
              <Card key={`${announcement.description}-${announcement.createdAt}`} className="card mb-3">
                <Row className="g-0 flex-wrap">
                  <Col xs="auto" className="position-relative">
                    <img src="/img/logo/LiceoGuarari.jpg"
                      alt="alternate text"
                      className="card-img card-img-horizontal sw-14 sw-lg-25" />
                  </Col>
                  <Col>
                    <Card.Body className="py-0 d-flex align-items-stretch style={{ maxHeight: '100%' }}">
                      <div className="w-100">
                        <div className="d-flex flex-row justify-content-between mb-2">
                          <NavLink to="#">
                            <p className="card-text mt-2">{announcement.title}</p>
                          </NavLink>
                        </div>
                        <p className="text-semi-large">{announcement.description}</p>
                        <p className="text-muted">Publicado el {createdAtDate.toLocaleDateString()}</p>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Col>
        {/* Continue Learning End */}

        {/* Recommended Courses Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Sobre el Liceo</h2>
          <Card className="sh-50 sh-md-40 h-xl-100-card hover-img-scale-up">
            <img src="/img/logo/HistoriaFondo.png" className="card-img h-100 scale position-absolute" alt="card image" />
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div>
                <div className="cta-1 mb-3 text-black w-75 w-sm-50">Historia</div>
                <div className="w-50 text-black mb-3">
                  Nuestro colegio fue fundado en 1988 con el objetivo de brindar oportunidades educativas a la comunidad local. A lo largo de su historia, el Liceo de Guararí ha graduado a miles de estudiantes que han continuado sus estudios en universidades y han obtenido empleos en diversos sectores. El Liceo ha contribuido al desarrollo social y económico de la comunidad de Guararí y sus alrededores, brindando oportunidades educativas y formando ciudadanos responsables y comprometidos.
                  </div>
                  

                {/* <Rating
                  className="mb-2"
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                /> */}
              </div>
              <div>
                <NavLink to="/contacto" className="btn btn-icon btn-icon-start btn-outline-primary mt-3 stretched-link">
                  <CsLineIcons icon="chevron-right" /> <span>Contacto</span>
                </NavLink>
              </div>
            </div>
          </Card>
        </Col>
        {/* Recommended Courses End */}
      </Row>

      <Row>
        {/* Related Subjects Start */}
        <Col xl="12" className="mb-5">
          <h2 className="small-title">Accesos rápidos</h2>
          <Row className="g-2">
            <Col xs="6" xl="6" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="book" className="text-primary" />
                    <p className="heading mt-3 text-body">Calificaciones</p>

                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="6" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="news" className="text-primary" />
                    <p className="heading mt-3 text-body">Matricula</p>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="6" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="notification" className="text-primary" />
                    <p className="heading mt-3 text-body">Avisos</p>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="6" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="user" className="text-primary" />
                    <p className="heading mt-3 text-body">Usuarios</p>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* Related Subjects End */}

        {/* Your Time Start */}
        {/* <Col xl="4" className="mb-5">
          <h2 className="small-title">Your Time</h2>
          <Card style={{ height: '310px' }}>
            <Card.Body className="h-100">
              <YourTimeChart />
            </Card.Body>
          </Card>
        </Col> */}
        {/* Your Time End */}

        {/* Paths Start */}
        {/* <Col xl="4" className="mb-5">
          <h2 className="small-title">Paths</h2>
          <Card className="sh-40 h-xl-100-card">
            <Card.Body className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <img src="/img/illustration/icon-analytics.webp" className="theme-filter mb-3" alt="launch" />
                <p className="mb-3">You are not on any path!</p>
                <Button variant="primary" className="btn-icon btn-icon-start mt-3 stretched-link">
                  <CsLineIcons icon="chevron-right" className="text-primary" />
                  <span>Take a Path</span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* Paths End */}
      </Row>

      {/* Trending Courses Start */}
      {/* <h2 className="small-title">Trending Courses</h2>
      <Row className="row-cols-1 row-cols-md-2 row-cols-xl-5 g-2">
        <Col>
          <Card className="h-100">
            <Badge bg="primary" className="me-1 position-absolute e-3 t-n2 z-index-1">
              POPULAR
            </Badge>
            <Card.Img src="/img/product/small/product-4.webp" className="card-img-top sh-22" alt="card image" />
            <Card.Body>
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  Introduction to Bread Making
                </NavLink>
              </h5>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <div className="mb-2">
                <Rating
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                />
                <div className="text-muted d-inline-block text-small align-text-top ms-1">(39)</div>
              </div>
              <div className="card-text mb-0">
                <div className="text-muted text-overline text-small">
                  <del>$ 42.25</del>
                </div>
                <div>$ 27.50</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Img src="/img/product/small/product-5.webp" className="card-img-top sh-22" alt="card image" />
            <Card.Body>
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  Apple Cake Recipe
                </NavLink>
              </h5>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <div className="mb-2">
                <Rating
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                />
                <div className="text-muted d-inline-block text-small align-text-top ms-1">(221)</div>
              </div>
              <div className="card-text mb-0">
                <div className="text-muted text-overline text-small">
                  <del>$ 36.50</del>
                </div>
                <div>$ 15.25</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Img src="/img/product/small/product-6.webp" className="card-img-top sh-22" alt="card image" />
            <Card.Body>
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  Dough for the Molds
                </NavLink>
              </h5>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <div className="mb-2">
                <Rating
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                />
                <div className="text-muted d-inline-block text-small align-text-top ms-1">(572)</div>
              </div>
              <div className="card-text mb-0">
                <div className="text-muted text-overline text-small">
                  <del>$ 51.00</del>
                </div>
                <div>$ 36.80</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Img src="/img/product/small/product-7.webp" className="card-img-top sh-22" alt="card image" />
            <Card.Body>
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  Fruit Decorations
                </NavLink>
              </h5>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <div className="mb-2">
                <Rating
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                />
                <div className="text-muted d-inline-block text-small align-text-top ms-1">(25)</div>
              </div>
              <div className="card-text mb-0">
                <div className="text-muted text-overline text-small">
                  <del>$ 18.25</del>
                </div>
                <div>$ 11.00</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="d-none d-xl-block">
          <Card className="h-100">
            <Card.Img src="/img/product/small/product-8.webp" className="card-img-top sh-22" alt="card image" />
            <Card.Body>
              <h5 className="heading mb-0">
                <NavLink to="/courses/detail" className="body-link stretched-link">
                  14 Facts About Sugar
                </NavLink>
              </h5>
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
              <div className="mb-2">
                <Rating
                  initialRating={5}
                  readonly
                  emptySymbol={<i className="cs-star text-primary" />}
                  fullSymbol={<i className="cs-star-full text-primary" />}
                />
                <div className="text-muted d-inline-block text-small align-text-top ms-1">(472)</div>
              </div>
              <div className="card-text mb-0">
                <div className="text-muted text-overline text-small">
                  <del>$ 24.00</del>
                </div>
                <div>$ 14.90</div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row> */}
      {/* Trending Courses End */}
    </>
  );
};

export default ElearningDashboard;
