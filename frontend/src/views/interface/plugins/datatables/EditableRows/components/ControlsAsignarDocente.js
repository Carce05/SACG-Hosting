import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";

const ControlsAsignarDocente = ({ tableInstance }) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;

  if (selectedFlatRows.length !== 1) {
    return (
      <Button variant="foreground-alternate" className="btn-xl btn-icon-only shadow edit-datatable" disabled>
        <CsLineIcons icon="user" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">Asignar Docente</Tooltip>}>
      <Button onClick={() => setIsOpenAddEditModal(true)}  variant="foreground-alternate" className="btn-xl btn-icon-only shadow edit-datatable">
        <CsLineIcons icon="user" />
      </Button>
    </OverlayTrigger>
  );


};
export default ControlsAsignarDocente;
