import { Row, Col, Card, Button, Badge, Dropdown, Form, Alert } from 'react-bootstrap';
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
import ControlsPageSize from 'views/interface/plugins/datatables/EditableRows/components/ControlsPageSize';
import ControlsAdd from 'views/interface/plugins/datatables/EditableRows/components/ControlsAdd';
import ControlsVer from 'views/interface/plugins/datatables/EditableRows/components/ControlsVer';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEditMatricula from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEditMatricula';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { matriculaFiltrar, obtenerMatriculas } from 'store/slices/matricula/matriculaThunk';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReporteMatriculas from './pdf/ReporteMatriculas';


const AdminMatricula = () => {
  const [data, setData] = useState([]);
  const [mostrarFiltroInforme, setMostrarFiltroInforme] = useState(false);
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
  
  const title = 'Matriculas';
  const description = 'Administración de Matricula';
  const dispatch = useDispatch();
  const { matriculas, matriculasLoading, onShowAlert, matriculasFiltradas, cantidadMatriculasFiltradas } = useSelector((state) => state.matricula);
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if(matriculas.length > 0){
      if (currentUser.role !== 'Administrador'){
        const matriculasPerUser = matriculas.filter(e => e.encargadoId === currentUser.personalId );
        setData(matriculasPerUser);
      } else {
        setData(matriculas);
      }
      
    } else {
      dispatch(obtenerMatriculas());
    }
    if (onShowAlert) {
      dispatch(obtenerMatriculas());
    }
  }, [matriculas, onShowAlert]);

const onRefrescar = () => {
    dispatch(obtenerMatriculas());
}


const onGenerarInforme = () => {
  setMostrarFiltroInforme(!mostrarFiltroInforme)
}



  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula Encargado', accessor: 'encargadoId', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Nombre Completo', accessor: 'nombreCompleto', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nacionalidad',
        accessor: 'nacionalidad',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {cell.value}
            </a>
          );
        },
      },    
      { Header: 'Centro Educativo Procedencia', accessor: 'centroEducativoProcedencia', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      { Header: 'Estado Matricula', accessor: 'estadoMatriculaAdmin', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10',
      Cell: ({ cell }) => {
        if (cell.value === "Pendiente") {
          return <p className='matricula-pendiente matricula-estado'>Pendiente</p>
        }
        if (cell.value === "Rechazado") {
          return <p className='matricula-rechazada matricula-estado'>Rechazado</p>
        }
        return <p className='matricula-estado'>Aprobado</p>
      } },
      { Header: 'Sección', accessor: 'seccionMatriculaAdmin', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20',
        Cell: ({ cell }) => {
          if (!cell.value) {
            return <p className='mb-0'>Pendiente Asignar</p>
          }
          return <p className='mb-0'>{ cell.value }</p>
        }
      },

      
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      },
    ];
  }, []);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const tableInstance = useTable(
    { columns, data, setData, isOpenAddEditModal, setIsOpenAddEditModal, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const breadcrumbs = [{ to: '', text: 'Home' }];

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
          <div className='form-input-hori'>
              <h1 className="mb-0 pb-0 display-4">{(currentUser.role === 'Administrador') ? title : 'Agregar Nueva'}</h1>
              <div className={ (currentUser.role === 'Encargado') ? 'show-element d-inline-block me-0 me-sm-3 float-start float-md-none' : 'hide-element'}>
                    <ControlsAdd tableInstance={tableInstance} />
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
                <div className={ (currentUser.role === 'Administrador') ? 'show-element d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground' : 'hide-element' }>
                  <ControlsSearch tableInstance={tableInstance}/>
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className={ (currentUser.role === 'Administrador') ? 'show-element d-inline-block me-0 me-sm-3 float-start float-md-none' : 'hide-element'}>
                  <ControlsAdd tableInstance={tableInstance} />  <ControlsVer tableInstance={tableInstance} />
                </div>
                <Button variant="outline-primary" className={ (currentUser.role === 'Administrador') ? 'show-element' : 'hide-element'} onClick={ onRefrescar }>
                    Refrescar
                </Button>
              </Col>
             
              <div className={ (currentUser.role !== 'Administrador') ? 'show-element d-inline-block me-0 me-sm-3 float-start float-md-none' : 'hide-element'}>
                <h3 className={ (currentUser.role !== 'Administrador') ? 'show-element d-inline-block mb-10 pb-0 mr-3' : 'hide-element'}>Tus Matriculas</h3> <ControlsVer tableInstance={tableInstance} />
              </div>
            </Row>
            <Button variant="outline-primary" className={ (currentUser.role === 'Administrador') ? 'show-element' : 'hide-element'} onClick={ onGenerarInforme }>
                    Mostrar Filtros Informe
            </Button>

            {
              mostrarFiltroInforme && 
              <div className='mostrar-filtro-informe'>
                <h1><b>CANTIDAD MATRICULAS FILTRADAS:</b> { cantidadMatriculasFiltradas }</h1>
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
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
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
                <ReporteMatriculas matriculas={ matriculasFiltradas } filtroSettings={ formState } />
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
