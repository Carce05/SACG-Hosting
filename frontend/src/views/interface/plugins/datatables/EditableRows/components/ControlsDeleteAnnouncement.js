import React, { useState } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ControlsDeleteAnnouncement = ({ tableInstance, announcementId  }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    selectedFlatRows,
    data,
    setData,
    state: { selectedRowIds },
  } = tableInstance;

  const onConfirmDelete  = () => {
    const {_id: id} = selectedFlatRows[0].original;
    axios.delete(`http://localhost:8080/api/comunicados/${id}`)
      .then(response => {
        setData(data.filter((x, index) => selectedRowIds[index] !== true));
        toast.success('¡Aviso eliminado con exitosamente!'),{className:'success'};})
      .catch(error => {
        console.log(error);
      });
  };
  const onCancelDelete = () => {
    setShowModal(false);
  };

  const onDeleteButtonClick = () => {
    setShowModal(true);
  };

  if (selectedFlatRows.length === 0) {
    return (
      <Button variant="foreground-alternate" className="btn-xl btn-icon-only shadow delete-datatable" disabled>
        <CsLineIcons icon="bin" />
      </Button>
    );
  }

  return (
    <>
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Eliminar</Tooltip>}>
        <Button onClick={onDeleteButtonClick} variant="foreground-alternate" className="btn-xl btn-icon-only shadow delete-datatable">
          <CsLineIcons icon="bin" />
        </Button>
      </OverlayTrigger>
      <Modal show={showModal} onHide={onCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar el aviso?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ControlsDeleteAnnouncement;
