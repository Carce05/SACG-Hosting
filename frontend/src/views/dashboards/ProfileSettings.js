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
import DatePicker from 'react-datepicker';

const ProfileSettings = () => {
  const title = 'Profile Settings';
  const description = 'Profile Settings';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'pages', text: 'Pages' },
    { to: 'pages/settings', text: 'Settings' },
  ];

  const genderOptions = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Other', label: 'Other' },
    { value: 'None', label: 'None' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [genderValue, setGenderValue] = useState();

  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>

        <Col>


          {/* Public Info Start */}
          <h2 className="small-title">Public Info</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue="Lisa Jackson" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">User Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue="writerofrohan" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Company</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Location</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Birthday</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Gender</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={setGenderValue} placeholder="" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Bio</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control as="textarea" rows={3} defaultValue="I'm a Cyborg, But That's OK" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" value="me@lisajackson.com" disabled />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Public Info End */}

          {/* Contact Start */}
          <h2 className="small-title">Contact</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Primary Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" defaultValue="me@lisajackson.com" disabled />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Secondary Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" defaultValue="lisajackson@gmail.com" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Phone</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue="+6443884455" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Contact End */}

          {/* Jobs Start */}
          <h2 className="small-title">Contact</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Freelance</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Check type="checkbox" className="mt-2" label="I am available for hire" id="freelanceCheckbox" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Jobs End */}
        </Col>
      </Row>
    </>
  );
};

export default ProfileSettings;
