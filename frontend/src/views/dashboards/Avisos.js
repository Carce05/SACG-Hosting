import { Row, Col, Card, Button, Badge, Alert, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ScrollByCount from 'components/scroll-by-count/ScrollByCount';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ButtonsCheckAll from 'views/interface/plugins/datatables/EditableRows/components/ButtonsCheckAll';
import ButtonsAddNew from 'views/interface/plugins/datatables/EditableRows/components/ButtonsAddNew';
import ControlsPageSize from 'views/interface/plugins/datatables/EditableRows/components/ControlsPageSize';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDeleteAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ControlsDeleteAnnouncement';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import ModalAddAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ModalAddAnnouncement';


const SchoolDashboard = () => {
  const [data, setData] = useState([]);
  const title = 'Avisos';
  const description = '';
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const handleEditClick = () => {
    setShowModal(true);
  };

  useEffect(() => {

    axios
      .get("http://localhost:8080/api/comunicados")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const columns = React.useMemo(() => {
    return [
      { Header: 'Publicación', accessor: 'createdAt', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Titulo',
        accessor: 'title',
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
      {
        Header: 'Descripción',
        accessor: 'description',
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


  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    { columns, data, setData, stateReducer: (state, action) => {
      if (action.type === 'toggleRowSelected' && Object.keys(state.selectedRowIds).length) {
         const newState = { ...state };

         newState.selectedRowIds = {
           [action.id]: true,
         };

         return newState;
      }

      return state;
   }, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
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
          </Col>
        </Row>
      </div>
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
                  <Button onClick={handleEditClick} variant="foreground-alternate" className="btn-icon btn-icon-only shadow add-datatable">
                    <CsLineIcons icon="plus" />
                  </Button>{/* <ControlsEdit tableInstance={tableInstance} /> */} <ControlsDeleteAnnouncement tableInstance={tableInstance} />
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Col className="mb-3 d-flex align-items-center justify-content-center">
            {showSuccessAlert && (
                  <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    Aviso agregado correctamente.
                  </Alert>
                )}
            </Col>
            <Col className="mb-3 d-flex align-items-center justify-content-center">
            {showDangerAlert && (
                  <Alert variant="danger" onClose={() => setShowDangerAlert(false)} dismissible>
                    Un error ha ocurrido al intentar crear el aviso.
                  </Alert>
                )}
            </Col>
            
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
                <ModalAddAnnouncement  showModal={showModal} setShowModal={setShowModal} setData={setData} setShowSuccessAlert={setShowSuccessAlert} setShowDangerAlert= {setShowDangerAlert} />
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
    </>
  );
};

export default SchoolDashboard;
