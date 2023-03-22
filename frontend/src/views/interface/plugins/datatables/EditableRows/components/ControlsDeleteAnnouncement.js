import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";

const ControlsDeleteAnnouncement = ({ tableInstance }) => {
  const {
    selectedFlatRows,
    data,
    setData,
    state: { selectedRowIds },
  } = tableInstance;
  const onClick = () => {
    const {_id: id} = selectedFlatRows[0].original;
    axios.delete(`http://localhost:8080/api/comunicados/${id}`)
      .then(response => {
        setData(data.filter((x, index) => selectedRowIds[index] !== true));
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (selectedFlatRows.length === 0) {
    return (
      <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow delete-datatable" disabled>
        <CsLineIcons icon="bin" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Delete</Tooltip>}>
      <Button onClick={onClick} variant="foreground-alternate" className="btn-icon btn-icon-only shadow delete-datatable">
        <CsLineIcons icon="bin" />
      </Button>
    </OverlayTrigger>
  );
};
export default ControlsDeleteAnnouncement;
