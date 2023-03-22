import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
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
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { useSelector } from 'react-redux';

const Usuarios = () => {
  const { currentUser, isUpdated } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const title = 'Usuarios';
  const description = 'Administración de usuarios';

  useEffect(() => {
    
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isUpdated]);

	const isValidUrl = urlString=> {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

  const columns = React.useMemo(() => {
    return [
      {
        Header: '',
        accessor: 'thumb',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            <img className="user-admin-images" src='https://www.nicepng.com/png/full/202-2024687_profile-icon-for-the-politics-category-profile-icon.png' alt="UserProp"/>
          );
        },
      },    
      { Header: 'Cédula', accessor: 'personalId', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nombre',
        accessor: 'name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
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
      { Header: 'Rol', accessor: 'role', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Estado', accessor: 'status', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
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
      { 
          isUpdated && (
            <Alert variant="success">
              Acción realizada con exito
            </Alert>
          )
        }
    
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
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} />
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
    </>
  );
};

export default Usuarios;
