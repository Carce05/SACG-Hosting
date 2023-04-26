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
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useBlockLayout } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ButtonsCheckAll from 'views/interface/plugins/datatables/EditableRows/components/ButtonsCheckAll';
import ButtonsAddNew from 'views/interface/plugins/datatables/EditableRows/components/ButtonsAddNew';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDeleteAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ControlsDeleteAnnouncement';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import ModalAddAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ModalAddAnnouncement';
import apiSACG from 'api/apiSACG';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const SchoolDashboard = () => {
  const [data, setData] = useState([]);
  const title = 'Avisos';
  const description = '';
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const handleAddClick = () => {
    setShowModal(true);
  };


  useEffect(() => {

    axios
      .get(apiSACG.concat('/comunicados'))
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const { currentUser } = useSelector((state) => state.auth);
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Publicación', accessor: 'createdAt', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10', Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return date.toLocaleDateString();
        },
      }, ,
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
        headerClassName: 'text-muted text-small text-uppercase',
        Cell: ({ cell }) => {
          return (
            <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', maxWidth: '400px' }}>
              {cell.value}
            </div>
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
    {
      columns, data, setData, stateReducer: (state, action) => {
        if (action.type === 'toggleRowSelected' && Object.keys(state.selectedRowIds).length) {
          const newState = { ...state };

          newState.selectedRowIds = {
            [action.id]: true,
          };

          return newState;
        }

        return state;
      }, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 }
    },
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
              {currentUser.role !== 'Administrador' ? (
                <></>
              ) : (
                <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                  <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                    <Button onClick={handleAddClick} variant="foreground-alternate" className="btn-xl btn-icon-only shadow add-datatable">
                      <CsLineIcons icon="plus" />
                    </Button>
                  </div>
                  <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">                            
                    <ControlsDeleteAnnouncement tableInstance={tableInstance} />
                  </div>
                </Col>
              )}
            </Row>

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
      <ModalAddAnnouncement showModal={showModal} setShowModal={setShowModal} setData={setData} setShowSuccessAlert={setShowSuccessAlert} setShowDangerAlert={setShowDangerAlert} />

    </>
  );
};

export default SchoolDashboard;
