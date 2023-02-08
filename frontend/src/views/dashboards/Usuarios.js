import { Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState } from 'react';
import Select from 'react-select';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ButtonsCheckAll from 'views/interface/plugins/datatables/EditableRows/components/ButtonsCheckAll';
import ButtonsAddNew from 'views/interface/plugins/datatables/EditableRows/components/ButtonsAddNew';
import ControlsPageSize from 'views/interface/plugins/datatables/EditableRows/components/ControlsPageSize';
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';

/* const dummyData = [
  { id: 1, name: 'Basler Brot', email: 213, cedula: 392310440, role: 'Sourdough', tag: 'New' },
  { id: 2, name: 'Bauernbrot', email: 633, cedula: 129234013, role: 'Multigrain', tag: 'Done' },
  { id: 3, name: 'Kommissbrot', email: 2321, cedula: 561017657, role: 'Whole Wheat', tag: '' },
  { id: 4, name: 'Lye Roll', email: 973, cedula: 127580420, role: 'Sourdough', tag: '' },
  { id: 5, name: 'Panettone', email: 563, cedula: 789313762, role: 'Sourdough', tag: 'Done' },
  { id: 6, name: 'Saffron Bun', email: 98, cedula: 129074548, role: 'Whole Wheat', tag: '' },
  { id: 7, name: 'Ruisreikäleipä', email: 459, cedula: 904716276, role: 'Whole Wheat', tag: '' },
  { id: 8, name: 'Rúgbrauð', email: 802, cedula: 797307649, role: 'Whole Wheat', tag: '' },
  { id: 9, name: 'Yeast Karavai', email: 345, cedula: 680078801, role: 'Multigrain', tag: '' },
  { id: 10, name: 'Brioche', email: 334, cedula: 378937746, role: 'Sourdough', tag: '' },
  { id: 11, name: 'Pullman Loaf', email: 456, cedula: 461638720, role: 'Multigrain', tag: '' },
  { id: 12, name: 'Soda Bread', email: 1152, cedula: 348536477, role: 'Whole Wheat', tag: '' },
  { id: 13, name: 'Barmbrack', email: 854, cedula: 591276986, role: 'Sourdough', tag: '' },
  { id: 14, name: 'Buccellato di Lucca', email: 1298, cedula: 980925057, role: 'Multigrain', tag: '' },
  { id: 15, name: 'Toast Bread', email: 2156, cedula: 220171422, role: 'Multigrain', tag: '' },
  { id: 16, name: 'Cheesymite Scroll', email: 452, cedula: 545847219, role: 'Sourdough', tag: '' },
  { id: 17, name: 'Baguette', email: 456, cedula: 553121944, role: 'Sourdough', tag: '' },
  { id: 18, name: 'Guernsey Gâche', email: 1958, cedula: 371226430, role: 'Multigrain', tag: '' },
  { id: 19, name: 'Bazlama', email: 858, cedula: 384036275, role: 'Whole Wheat', tag: '' },
  { id: 20, name: 'Bolillo', email: 333, cedula: 484876903, role: 'Whole Wheat', tag: '' },
]; */



const Usuarios = () => {

  const rawResponse = 'http://localhost:8080/api/usuarios'
  const title = 'Usuarios';
  const description = 'Administración de usuarios';

  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula', accessor: 'cedula', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nombre',
        accessor: 'name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ cell }) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {cell.value}
            </a>
          );
        },
      },    
      { Header: 'Email', accessor: 'email', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Rol', accessor: 'role', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      {
        Header: 'Tag',
        accessor: 'tag',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return <Badge bg="outline-primary">{cell.value}</Badge>;
        },
      },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      },
    ];
  }, []);

  const [data, setData] = React.useState("");
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const breadcrumbs = [{ to: '', text: 'Home' }];
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      {/* Timetable Start */}
      {/* <h2 className="small-title">Timetable</h2> */}
      
      {/* Timetable End */}

      <Row>
        {/* Exam Results Start */}
        {/* <Col lg="12" className="mb-5">
          <div className="d-flex justify-content-between">
            <h2 className="small-title">Estudiantes</h2>
            <NavLink to="/quiz/result" className="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small">
              <span className="align-bottom">View All</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
            </NavLink>
          </div>
          <div className="scroll-out">
            <ScrollByCount count="5">
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        1-1828-0064
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Erick Guillén
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      12.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        B
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        1-1122-3333
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Christopher Arce
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      11.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        A
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        1-1565-7678
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Yulianna Jiménez
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      08.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        A
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        1-5555-1212
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Jesús Arroyo
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      06.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        A
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        1-1828-0064
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Erick Guillén
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      06.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        C
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-2 sh-11 sh-md-8">
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                      <NavLink to="/quiz/result" className="body-link text-truncate stretched-link">
                        Mechanics
                      </NavLink>
                    </Col>
                    <Col xs="5" md="4" className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted">
                      Winry Rockbell
                    </Col>
                    <Col xs="5" md="3" className="d-flex align-items-center justify-content-center text-muted">
                      04.05.2021
                    </Col>
                    <Col xs="2" md="2" className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end">
                      <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                        A
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </ScrollByCount>
          </div>
        </Col> */}
        {/* Exam Results End */}

        {/* Homework Start */}
        {/* <Col lg="6" className="mb-5">
          <h2 className="small-title">Homework</h2>
          <Card className="sh-40 h-lg-100-card">
            <Card.Body className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <img src="/img/illustration/icon-performance.webp" className="theme-filter mb-3" alt="launch" />
                <p className="mb-3">Yay, no homework for the week!</p>
                <Button variant="primary" className="btn-icon btn-icon-start mt-3 stretched-link">
                  <CsLineIcons icon="chevron-right" className="text-primary" />
                  <span>Results</span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* Homework End */}
      </Row>
      <Row>
        <Col>
          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} /> <ControlsDelete tableInstance={tableInstance} />
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          <ModalAddEdit tableInstance={tableInstance} />
        </Col>
      </Row>

      <Row>
        {/* Notifications Start */}
        {/* <Col xl="6" xxl="4" className="mb-5">
          <h2 className="small-title">Notifications</h2>
          <Card className="sh-40 h-xl-100-card">
            <Card.Body className="mb-n2 scroll-out h-100">
              <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="h-100">
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="circle" className="text-primary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Jujubes brownie marshmallow apple.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">18 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="square" className="text-secondary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Pie fruitcake jelly beans.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">15 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="triangle" className="text-tertiary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Candy tootsie roll pie.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Liquorice chocolate bar toffee.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Tiramisu lemon drops tootsie.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="square" className="text-secondary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Chocolate bar chocolate bar tart.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">15 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="triangle" className="text-tertiary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Bear claw cotton candy powder pastry.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Chocolate bar chocolate bar tart.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Gummi bears dessert muffin.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Apple pie candy sugar plum.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Candy canes lemon drops.</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
              </OverlayScrollbarsComponent>
            </Card.Body>
          </Card>
        </Col> */}
        {/* Notifications End */}

        {/* Today’s Lunch Start */}
        {/* <Col xl="6" xxl="4" className="mb-5">
          <div className="d-flex justify-content-between">
            <h2 className="small-title">Today’s Lunch</h2>
            <NavLink to="#" className="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small">
              <span className="align-bottom">Weekly Menu</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
            </NavLink>
          </div>
          <Card className="w-100 sh-50 sh-md-40 h-xxl-100-card position-relative">
            <img src="/img/banner/lunch.webp" className="card-img h-100 position-absolute" alt="card image" />
            <div className="card-img-overlay d-flex flex-column justify-content-end bg-transparent">
              <div>
                <div className="cta-4 mb-2 text-black">Salmon Sweet Potato Cakes</div>
                <div className="text-black mb-0">Liquorice caramels chupa chups chocolate bonbon.</div>
              </div>
            </div>
          </Card>
        </Col> */}
        {/* Today’s Lunch End */}

        {/* Materials Start */}
        {/* <Col xxl="4" className="mb-5">
          <h2 className="small-title">Materials</h2>
          <Card className="mb-2 sh-17 sh-sm-8">
            <Card.Body className="py-0">
              <Row className="h-100 align-content-center">
                <Col xs="12" sm="auto" className="mb-2 mb-sm-0 text-center text-sm-start">
                  <CsLineIcons icon="science" className="text-primary" />
                </Col>
                <Col xs="12" className="col-sm mb-3 mb-sm-0 text-center text-sm-start">
                  <div className="text-alternate">Chemistry</div>
                </Col>
                <Col xs="12" className="col-sm d-flex justify-content-center justify-content-sm-end">
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 text-small">
                    NOTES
                  </Button>
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 ms-1 text-small">
                    SYLLABUS
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-17 sh-sm-8">
            <Card.Body className="py-0">
              <Row className="h-100 align-content-center">
                <Col xs="12" sm="auto" className="mb-2 mb-sm-0 text-center text-sm-start">
                  <CsLineIcons icon="abacus" className="text-primary" />
                </Col>
                <Col xs="12" className="col-sm mb-3 mb-sm-0 text-center text-sm-start">
                  <div className="text-alternate">Algebra</div>
                </Col>
                <Col xs="12" className="col-sm d-flex justify-content-center justify-content-sm-end">
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 text-small">
                    NOTES
                  </Button>
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 ms-1 text-small">
                    SYLLABUS
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-17 sh-sm-8">
            <Card.Body className="py-0">
              <Row className="h-100 align-content-center">
                <Col xs="12" sm="auto" className="mb-2 mb-sm-0 text-center text-sm-start">
                  <CsLineIcons icon="flask" className="text-primary" />
                </Col>
                <Col xs="12" className="col-sm mb-3 mb-sm-0 text-center text-sm-start">
                  <div className="text-alternate">Biology</div>
                </Col>
                <Col xs="12" className="col-sm d-flex justify-content-center justify-content-sm-end">
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 text-small">
                    NOTES
                  </Button>
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 ms-1 text-small">
                    SYLLABUS
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="sh-17 sh-sm-8">
            <Card.Body className="py-0">
              <Row className="h-100 align-content-center">
                <Col xs="12" sm="auto" className="mb-2 mb-sm-0 text-center text-sm-start">
                  <CsLineIcons icon="book-open" className="text-primary" />
                </Col>
                <Col xs="12" className="col-sm mb-3 mb-sm-0 text-center text-sm-start">
                  <div className="text-alternate">History</div>
                </Col>
                <Col xs="12" className="col-sm d-flex justify-content-center justify-content-sm-end">
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 text-small">
                    NOTES
                  </Button>
                  <Button variant="outline-primary" className="py-1 px-3 lh-1-5 ms-1 text-small">
                    SYLLABUS
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}
        {/* Materials End */}
      </Row>

      {/* Teachers Start */}
      {/* <h2 className="small-title">Teachers</h2>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-6 g-2">
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Blaine Cottrell
              </NavLink>
              <div className="text-muted text-medium mb-2">Chemistry</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(572)</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-2.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Kirby Peters
              </NavLink>
              <div className="text-muted text-medium mb-2">Geometry</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(211)</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-3.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Olli Hawkins
              </NavLink>
              <div className="text-muted text-medium mb-2">Physics</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(28)</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-4.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Emilia Antoine
              </NavLink>
              <div className="text-muted text-medium mb-2">Gymnastics</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(75)</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-5.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Kathryn Mengel
              </NavLink>
              <div className="text-muted text-medium mb-2">Biology</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(46)</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="sw-13 position-relative mb-3 mx-auto">
                <img src="/img/profile/profile-6.webp" className="img-fluid rounded-xl" alt="thumb" />
              </div>
              <NavLink to="/instructor/detail" className="mb-3 stretched-link body-link">
                Daisy Hartley
              </NavLink>
              <div className="text-muted text-medium mb-2">Gymnastics</div>
              <Rating
                initialRating={5}
                readonly
                emptySymbol={<i className="cs-star text-primary" />}
                fullSymbol={<i className="cs-star-full text-primary" />}
              />
              <div className="text-muted d-inline-block text-small align-text-top">(91)</div>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      {/* Teachers End */}
    </>
  );
};

export default Usuarios;
