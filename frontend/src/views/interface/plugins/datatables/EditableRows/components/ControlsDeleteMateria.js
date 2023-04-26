import React, { useState } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiSACG from 'api/apiSACG';

const ControlsDeleteMateria = ({ tableInstance, setDMS }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    selectedFlatRows,
    data,
    setData,
    state: { selectedRowIds },
  } = tableInstance;

  let dmsId = "";


  if (selectedFlatRows.length === 1) {
    dmsId = selectedFlatRows[0].original._id;
  }

  const onConfirmDelete  = async () => {
    try{

       await axios.delete(apiSACG.concat(`/docentes_materias_secciones/${dmsId}`))
      .then(response => {
        setData(data.filter((x, index) => selectedRowIds[index] !== true));
      })
      .catch(error => {
        console.log(error);
      });

      toast.success('¡Materia Eliminada!') , { className:'success' };
      
      setShowModal(false);

      const response = await axios.get(apiSACG.concat(`/docentes_materias_secciones/`));
      const resultsDMS = [];

      /* eslint no-underscore-dangle: 0 */
      response.data.forEach((val) => {
        resultsDMS.push({
          _id: val._id,
          docente: val.docente,
          materia: val.materia,
          seccion: val.seccion
        });
      });

      const resultsUpdate = resultsDMS.filter(x => x.seccion === data[0].seccion);

      setDMS([ 
        ...resultsDMS
      ])

      setData([ 
        ...resultsUpdate
      ])  

    } catch {

    }


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
        <Modal.Body>¿Está seguro de que desea eliminar la materia?</Modal.Body>
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
export default ControlsDeleteMateria;
