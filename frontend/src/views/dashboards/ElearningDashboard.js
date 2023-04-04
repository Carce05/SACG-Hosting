import React, {useState, useEffect} from 'react';
import { Row, Col, Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import Glide from 'components/carousel/Glide';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import YourTimeChart from './components/YourTimeChart';

const ElearningDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);

  const title = 'Inicio';
  const description = 'Inicio del Sistema Acádemico';

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/api/comunicados');
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

      <Row >
        {/* Continue Learning Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Avisos</h2>
          {announcements.map((announcement) => (
            <Card key={`${announcement.description}-${announcement.createdAt}`} className="row g-0 h-auto sh-md-19 card mb-3">
              <Row className="g-0 sh-14">
                <Col xs="auto" className="position-relative">
                  <img src="/img/logo/LiceoGuarari.jpg" 
                  alt="alternate text" 
                  className="card-img card-img-horizontal sw-14 sw-lg-25" />
                </Col>
                <Col>
                  <Card.Body className="py-0 h-100 d-flex align-items-center">
                    <div className="w-100">
                      <div className="d-flex flex-row justify-content-between mb-2">
                      <NavLink to="#">
                      <p className="card-text">{announcement.title}</p>
                        </NavLink>
                        {/* 
                        <NavLink to="/courses/detail">
                        </NavLink>
                        <div className="text-muted">67%</div> */}
                      </div>
                      <p className="card-text">{announcement.description}</p>
                      <p className="text-muted">Publicado el {announcement.createdAt}</p>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
                      
          
          
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac odio tempor orci dapibus ultrices in. Mauris ultrices eros in cursus. Duis at tellus at urna condimentum mattis pellentesque id. Pretium viverra suspendisse potenti nullam ac tortor vitae. Donec ultrices tincidunt arcu non sodales neque sodales ut. Sed libero enim sed faucibus turpis in. Ornare quam viverra orci sagittis.
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
                <NavLink to="/dashboards/Contacto" className="btn btn-icon btn-icon-start btn-outline-primary mt-3 stretched-link">
                  <CsLineIcons icon="chevron-right" /> <span>Contacto</span>
                </NavLink>
              </div>
            </div>
          </Card>
        </Col>
        {/* Recommended Courses End */}
      </Row>

      {/* Achievements Start */}
      {/* <h2 className="small-title">Accesos rápidos</h2>
      <Row className="gx-2">
        <Col xs="12" className="p-0">
          <Glide
            noControls
            options={{
              gap: 0,
              rewind: false,
              bound: true,
              perView: 6,
              breakpoints: {
                600: { perView: 1 },
                1400: { perView: 2 },
                1900: { perView: 4 },
                3840: { perView: 5 },
              },
            }}
          >
            <Glide.Item>
              <Card className="mb-5 sh-25">
                <Card.Body className="text-center align-items-center d-flex flex-column justify-content-between">
                  <div className="d-flex sw-6 sh-6 bg-gradient-light mb-4 align-items-center justify-content-center rounded-xl position-relative mt-3">
                    <CsLineIcons icon="burger" className="text-white" />
                    <div className="achievement bg position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                    <div className="achievement level position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4517 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="card-text mb-0 d-flex">Calificaciones</p>
                  <p className="text-center mb-0 d-flex text-primary">Level 1</p>
                </Card.Body>
              </Card>
            </Glide.Item>
            <Glide.Item>
              <Card className="mb-5 sh-25">
                <Card.Body className="text-center align-items-center d-flex flex-column justify-content-between">
                  <div className="d-flex sw-6 sh-6 bg-gradient-light mb-4 align-items-center justify-content-center rounded-xl position-relative mt-3">
                    <CsLineIcons icon="loaf" className="text-white" />
                    <div className="achievement bg position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                    <div className="achievement level position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4517 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.5989 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4517 72.3088 45.7883 75 37.5 75C29.2117 75 21.5482 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="card-text mb-0 d-flex">Bread Expert</p>
                  <p className="text-center mb-0 d-flex text-primary">Level 3</p>
                </Card.Body>
              </Card>
            </Glide.Item>
            <Glide.Item>
              <Card className="mb-5 sh-25">
                <Card.Body className="text-center align-items-center d-flex flex-column justify-content-between">
                  <div className="d-flex sw-6 sh-6 bg-gradient-light mb-4 align-items-center justify-content-center rounded-xl position-relative mt-3">
                    <CsLineIcons icon="cupcake" className="text-white" />
                    <div className="achievement bg position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                    <div className="achievement level position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4517 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.5989 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="card-text mb-0 d-flex">Cake Apprentice</p>
                  <p className="text-center mb-0 d-flex text-primary">Level 2</p>
                </Card.Body>
              </Card>
            </Glide.Item>
            <Glide.Item>
              <Card className="mb-5 sh-25">
                <Card.Body className="text-center align-items-center d-flex flex-column justify-content-between">
                  <div className="d-flex sw-6 sh-6 bg-gradient-light mb-4 align-items-center justify-content-center rounded-xl position-relative mt-3">
                    <CsLineIcons icon="radish" className="text-white" />
                    <div className="achievement bg position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                    <div className="achievement level position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4517 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="card-text mb-0 d-flex">Vegetable Novice</p>
                  <p className="text-center mb-0 d-flex text-primary">Level 1</p>
                </Card.Body>
              </Card>
            </Glide.Item>
            <Glide.Item>
              <Card className="mb-5 sh-25">
                <Card.Body className="text-center align-items-center d-flex flex-column justify-content-between">
                  <div className="d-flex sw-6 sh-6 bg-gradient-light mb-4 align-items-center justify-content-center rounded-xl position-relative mt-3">
                    <CsLineIcons icon="banana" className="text-white" />
                    <div className="achievement bg position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                    <div className="achievement level position-absolute">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3422 7.24333C21.5482 2.69119 29.2117 0 37.5 0C45.7883 0 53.4518 2.69119 59.6578 7.24333C60.5562 7.90233 60.7431 9.15516 60.0752 10.0416C59.4073 10.9281 58.1375 11.1124 57.2391 10.4534C51.7048 6.39402 44.8833 4 37.5 4C30.1167 4 23.2952 6.39403 17.7609 10.4535C16.8625 11.1124 15.5927 10.9281 14.9248 10.0416C14.2569 9.15516 14.4438 7.90233 15.3422 7.24333ZM65.0942 15.1001C66.006 14.4592 67.2717 14.6688 67.9213 15.5684C72.3763 21.7377 75 29.3164 75 37.5C75 45.6836 72.3763 53.2623 67.9213 59.4316C67.2717 60.3311 66.006 60.5408 65.0942 59.8999C64.1825 59.2589 63.97 58.0101 64.6196 57.1105C68.599 51.5998 70.9459 44.8284 70.9459 37.5C70.9459 30.1716 68.599 23.4002 64.6196 17.8895C63.97 16.9899 64.1825 15.7411 65.0942 15.1001ZM9.90579 15.1001C10.8175 15.7411 11.03 16.9899 10.3804 17.8895C6.40105 23.4002 4.05405 30.1716 4.05405 37.5C4.05405 44.8284 6.40105 51.5998 10.3804 57.1105C11.03 58.0101 10.8175 59.2589 9.90579 59.8999C8.99405 60.5408 7.72832 60.3312 7.07871 59.4316C2.62373 53.2623 0 45.6836 0 37.5C0 29.3164 2.62373 21.7377 7.07871 15.5684C7.72832 14.6689 8.99404 14.4592 9.90579 15.1001ZM14.9248 64.9584C15.5927 64.0719 16.8625 63.8876 17.7609 64.5466C23.2952 68.606 30.1167 71 37.5 71C44.8833 71 51.7048 68.606 57.2391 64.5465C58.1375 63.8876 59.4073 64.0719 60.0752 64.9584C60.7431 65.8448 60.5562 67.0977 59.6578 67.7567C53.4518 72.3088 45.7883 75 37.5 75C29.2117 75 21.5483 72.3088 15.3422 67.7567C14.4438 67.0977 14.2569 65.8448 14.9248 64.9584Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="card-text mb-0 d-flex">Fruit Master</p>
                  <p className="text-center mb-0 d-flex text-primary">Level 2</p>
                </Card.Body>
              </Card>
            </Glide.Item>
          </Glide>
        </Col>
      </Row> */}
      {/* Achievements End */}

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
