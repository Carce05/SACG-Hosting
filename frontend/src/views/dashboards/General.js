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
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDeleteAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ControlsDeleteAnnouncement';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import ModalAddAnnouncement from 'views/interface/plugins/datatables/EditableRows/components/ModalAddAnnouncement';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const General = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/comunicados')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {/* Renderizar las cards con los datos obtenidos */}
      {datos.map(data => (
        <div
          key={data.id}
          style={{
            border: '1px solid #000',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
            width: '200px',
          }}
        >
          <h2>{data.title}</h2>
          <p>Edad: {data.edad}</p>
          <p>Profesión: {data.profesion}</p>
          
          {}
        </div>
      ))}
    </div>
  );
};

export default General;