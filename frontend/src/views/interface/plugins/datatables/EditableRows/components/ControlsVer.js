import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const ControlsVer = ({ tableInstance }) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;
  if (selectedFlatRows.length !== 1) {
    return (
      <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow edit-datatable" disabled>
        <CsLineIcons icon="eye" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">Ver</Tooltip>}>
      <Button onClick={() => setIsOpenAddEditModal(true)} variant="foreground-alternate" className="btn-icon btn-icon-only shadow edit-datatable">
        <CsLineIcons icon="eye" />
      </Button>
    </OverlayTrigger>
  );
};
export default ControlsVer;
