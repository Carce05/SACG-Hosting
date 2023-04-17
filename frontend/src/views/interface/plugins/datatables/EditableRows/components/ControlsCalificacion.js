import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";

const ControlsCalificacion = ({ tableInstance }) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;

  if (selectedFlatRows.length !== 1) {
    return (
      <Button variant="foreground-alternate" overlay={<Tooltip id="tooltip-top-add">Ver notas</Tooltip>} className="btn-xl btn-icon-only shadow edit-datatable" disabled>
        <CsLineIcons icon="diploma" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-add">Notas</Tooltip>}>
      <Button onClick={() => setIsOpenAddEditModal(true)}  variant="foreground-alternate" className="btn-xl btn-icon-only shadow edit-datatable">
        <CsLineIcons icon="diploma" />
      </Button>
      </OverlayTrigger>
    </OverlayTrigger>
  );


};
export default ControlsCalificacion;
