import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const ControlsAddMateria = ({ tableInstance }) => {
  const { toggleAllPageRowsSelected, setIsOpenAddMateriaModal } = tableInstance;
  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setIsOpenAddMateriaModal(true);
  };

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-add">Agregar</Tooltip>}>
      <Button onClick={addButtonClick} variant="foreground-alternate" className="btn-xl btn-icon-only shadow add-datatable ">
        <CsLineIcons icon="plus"/>
      </Button>
    </OverlayTrigger>
  );
};
export default ControlsAddMateria;
