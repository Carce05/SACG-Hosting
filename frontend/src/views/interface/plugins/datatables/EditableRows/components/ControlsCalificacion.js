import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from "axios";

const ControlsCalificacion = ({ tableInstance, calificaciones }) => {
  const { selectedFlatRows, setIsOpenAddEditModal } = tableInstance;

  async function getCali() {
    // Fetch data
    const response = await axios.get('http://localhost:8080/api/calificaciones');
    const resultsCalificaciones = []
    // Store results in the results array

    /* eslint no-underscore-dangle: 0 */
    response.data.forEach((val) => {
      resultsCalificaciones.push({
        id: val._id,
        estudiante: val.estudiante,
        materia: val.materia,
        cotidiano: val.cotidiano,
        tarea: val.tarea,
        examen1: val.examen1,
        examen2: val.examen2,
        proyecto: val.proyecto,
        asistencia: val.asistencia,
        total: val.total,
        observaciones: val.observaciones,
        anio: val.anio,
        trimestre: val.trimestre,
      });
    });
  calificaciones = resultsCalificaciones;
  setIsOpenAddEditModal(true);

  }

  if (selectedFlatRows.length !== 1) {
    return (
      <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow edit-datatable" disabled>
        <CsLineIcons icon="diploma" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">Nota</Tooltip>}>
      <Button onClick={() => getCali()} variant="foreground-alternate" className="btn-icon btn-icon-only shadow edit-datatable">
        <CsLineIcons icon="diploma" />
      </Button>
    </OverlayTrigger>
  );


};
export default ControlsCalificacion;
