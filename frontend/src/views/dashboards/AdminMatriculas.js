import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState } from 'react-table';
import Table from 'views/interface/plugins/datatables/EditableRows/components/Table';
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsVer from 'views/interface/plugins/datatables/EditableRows/components/ControlsVer';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEditMatricula from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEditMatricula';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { matriculaFiltrar, obtenerMatriculas } from 'store/slices/matricula/matriculaThunk';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReporteMatriculas from './pdf/ReporteMatriculas';
import { obtenerTodasSecciones } from 'store/slices/seccion/seccionThunk';
import axios from "axios";


const AdminMatricula = () => {
  const [data, setData] = useState([]);
  const [mostrarFiltroInforme, setMostrarFiltroInforme] = useState(false);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [anioFiltrar, setAnioFiltrar] = useState(new Date().getFullYear());
  const [tiempoFiltrar, setTiempoFiltrar] = useState('reciente');
  const [aniosFiltroApi, setAniosFiltroApi] = useState([]);
  const [formState, setFormState] = useState({
    anioMostrarInforme: "no-filtrar-anio",
    estadoMostrarInforme: "no-filtrar-estado"
  });

  
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
    dispatch(matriculaFiltrar({
      ...formState,
      [name]: value,
    }))
  };

  const onInputChangeFiltroAnio = ({ target }) => {
    const { value } = target;
    setAnioFiltrar(value)
  };
  const onInputChangeFiltroTiempo = ({ target }) => {
    const { value } = target;
    setTiempoFiltrar(value)
  };
  
  const title = 'Matriculas';
  const description = 'Administración de Matricula';
  const dispatch = useDispatch();
  const { matriculas, matriculasLoading, onShowAlert, matriculasFiltradas, cantidadMatriculasFiltradas, matricularActivado } = useSelector((state) => state.matricula);
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if(matriculas.length > 0){
      if (currentUser.role !== 'Administrador'){
        const matriculasPerUser = matriculas.filter(e => e.encargadoId === currentUser.personalId );
        const matriculasPerYear = matriculasPerUser.filter(e => new Date(e.fechaCreacionMatricula).getFullYear() == anioFiltrar );
        if ( tiempoFiltrar == 'reciente') {
          const mostRecentRows = Object.values(matriculasPerYear.reduce((acc, obj) => {
            if (!acc[obj.cedulaEstudiante] || obj.fechaCreacionMatricula > acc[obj.cedulaEstudiante].fechaCreacionMatricula) {
              acc[obj.cedulaEstudiante] = obj;
            }
            return acc;
          }, {}));
          setData(mostRecentRows);
        } else {
          setData(matriculasPerYear)
        }
      } else {
        const matriculasPerYear = matriculas.filter(e => new Date(e.fechaCreacionMatricula).getFullYear() == anioFiltrar );
        if ( tiempoFiltrar == 'reciente') {
          const mostRecentRows = Object.values(matriculasPerYear.reduce((acc, obj) => {
            if (!acc[obj.cedulaEstudiante] || obj.fechaCreacionMatricula > acc[obj.cedulaEstudiante].fechaCreacionMatricula) {
              acc[obj.cedulaEstudiante] = obj;
            }
            return acc;
          }, {}));
          setData(mostRecentRows);
        } else {
          setData(matriculasPerYear)
        }
      }
      
    } else {
      dispatch(obtenerMatriculas());
      dispatch(obtenerTodasSecciones());
    }
    if (onShowAlert) {
      dispatch(obtenerMatriculas());
      dispatch(obtenerTodasSecciones());
    }
    axios.post("http://localhost:8080/api/matricula/obtenerAnioMatricula",
    {
      role: currentUser.role,
      encargadoId: currentUser.personalId
    })
    .then((res) => {
      setAniosFiltroApi(res.data)
    })
    .catch((err) => {
      console.error(err);
    });
  }, [matriculas, onShowAlert, anioFiltrar, tiempoFiltrar]);

const onRefrescar = () => {
    dispatch(obtenerMatriculas());
    dispatch(obtenerTodasSecciones());
}


const onGenerarInforme = () => {
  setMostrarFiltroInforme(!mostrarFiltroInforme)
}
const onGenerarFiltro = () => {
  setMostrarFiltro(!mostrarFiltro)
}
const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);


  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula Estudiante', accessor: 'cedulaEstudiante', sortable: true, headerClassName: 'text-small text-uppercase w-10' },
      { Header: 'Nombre Completo', accessor: 'nombre', sortable: true, headerClassName: 'text-small text-uppercase w-10' },
      { Header: 'Fecha Creación', accessor: 'fechaCreacionMatricula', sortable: true, headerClassName: 'text-small text-uppercase w-10' },
      { Header: 'Estado Matricula', accessor: 'estadoMatriculaAdmin', sortable: true, headerClassName: 'text-small text-uppercase w-10',
      Cell: ({ cell }) => {
        if (cell.value === "Pendiente") {
          return <p className='matricula-pendiente matricula-estado'>Pendiente</p>
        }
        if (cell.value === "Rechazado") {
          return (
            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">Para más información de porque fue rechazodo, contactar al Administrador</Tooltip>}>
                <p className='matricula-rechazada matricula-estado'>Rechazado</p>
            </OverlayTrigger>
          )
        }
        return <p className='matricula-estado'>Aprobado</p>
      } },
      { Header: 'Sección Asignada', accessor: 'seccionMatriculaAdmin', sortable: true, headerClassName: 'text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          if (!cell.value) {
            return <p className='mb-0'>Pendiente Asignar</p>
          }
          return <p className='mb-0'>{ cell.value }</p>
        }
      },
      
      {
        Header: 'OPCIONES',
        id: 'name',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => (
          <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-edit">{ (currentUser.role === 'Administrador') ? 'Editar' :  'Ver' }</Tooltip>}>
          <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow edit-datatable">
            {
              (currentUser.role === 'Administrador') ?  <CsLineIcons icon="edit" /> :  <CsLineIcons icon="eye" /> 
            }
          </Button>
        </OverlayTrigger>
        ),
      },
    ];
  }, []);

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  return (
    <>
      <HtmlHead title={title} description={description}/>
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
          <div className='form-input-hori'>
              <h1 className="mb-0 pb-0 display-4">{`${ title } | Matriculas del año: ${ anioFiltrar }`}</h1>
              <div className={ (currentUser.role === 'Encargado') ? 'show-element d-inline-block me-0 me-sm-3 float-start float-md-none' : 'hide-element'}>
                  {
                    ( matricularActivado == "true") && <ControlsAdd tableInstance={tableInstance} /> 
                  } 
              </div>
            </div>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>
    
      <Row>
        <Col>
          <div> 
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className='show-element d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground'>
                  <ControlsSearch tableInstance={tableInstance}/>
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className='show-element d-inline-block me-0 me-sm-3 float-start float-md-none'>
                  {
                    ( matricularActivado == "true") && <ControlsAdd tableInstance={tableInstance} /> 
                  } 
                  <ControlsVer tableInstance={tableInstance} />
                </div>
                <Button variant="outline-primary" onClick={ onRefrescar }>
                    Refrescar
                </Button>
              </Col>
            </Row>
            <Button variant="outline-primary" className={ (currentUser.role === 'Administrador') ? 'show-element mr-20 mb-3' : 'hide-element'} onClick={ onGenerarInforme }>
                    Generar Informe
            </Button>
            <Button variant="outline-primary" className='mb-3' onClick={ onGenerarFiltro }>
                    Filtrar Matriculas
            </Button>

            {
              mostrarFiltroInforme && 
              <div className='mostrar-filtro-informe'>
                <h1><b>Cantidad de matriculas en informe:</b> { cantidadMatriculasFiltradas }</h1>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Año a generar reporte
                  </label>
                  <select
                    name="anioMostrarInforme"
                    value={formState.anioMostrarInforme}
                    onChange={onInputChange}
                    className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="no-filtrar-anio">No filtrar por año</option>
                    {
                      aniosFiltroApi.map((item) => (
                        <option value={ item }>{item}</option>
                      ))
                    }
                  </select>

                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Estado a generar reporte
                  </label>
                  <select
                    name="estadoMostrarInforme"
                    value={formState.estadoMostrarInforme}
                    onChange={onInputChange}
                    className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="no-filtrar-estado">No filtrar por estado</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>

                  <Button
                    className='mt-3 mb-2'
                    variant="outline-primary"
                    disabled={ cantidadMatriculasFiltradas > 0 ? false : true }
                  >
                                      <PDFDownloadLink
              document={
                <ReporteMatriculas matriculas={ matriculasFiltradas } filtroSettings={ formState } cantidadMatriculasFiltradas={cantidadMatriculasFiltradas}/>
              }
              fileName="informeMatriculas.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? " Cargando PDF..." : " Imprimir Informe Matriculas"
              }
        </PDFDownloadLink>
                  </Button>


              </div>
            }

            {
              mostrarFiltro && 
              <div className='mostrar-filtro-informe'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Filtrar por año
                  </label>
                  <select
                    name="anioFiltrar"
                    value={anioFiltrar}
                    onChange={onInputChangeFiltroAnio}
                    className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {
                      aniosFiltroApi.map((item) => (
                        <option value={ item }>{item}</option>
                      ))
                    }
                  </select>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Filtrar por tiempo
                  </label>
                  <select
                    name="tiempoFiltrar"
                    value={tiempoFiltrar}
                    onChange={onInputChangeFiltroTiempo}
                    className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                     <option value="reciente">Solo las recientes</option>
                     <option value="todas-matriculas">Todas las matriculas</option>
                  </select>
              </div>
            }

            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          <ModalAddEditMatricula tableInstance={tableInstance} />
        </Col>
      </Row>
    </>
  );
};

export default AdminMatricula;
