import { Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
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
import ControlsEdit from 'views/interface/plugins/datatables/EditableRows/components/ControlsEdit';
import ControlsDelete from 'views/interface/plugins/datatables/EditableRows/components/ControlsDelete';
import ControlsSearch from 'views/interface/plugins/datatables/EditableRows/components/ControlsSearch';
import ModalAddEdit from 'views/interface/plugins/datatables/EditableRows/components/ModalAddEdit';
import TablePagination from 'views/interface/plugins/datatables/EditableRows/components/TablePagination';
import axios from "axios";
import { useFormik } from 'formik';


const dummyData = [
  { id: 1, name: 'Basler Brot', sales: 21, stock: 392310440, category: 'Sourdough@gmail.com', tag: 'New' },
  { id: 2, name: 'Bauernbrot', sales: 63, stock: 129234013, category: 'Multigrain@gmail.com', tag: 'Done' },
  { id: 3, name: 'Kommissbrot', sales: 23, stock: 561017657, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 4, name: 'Lye Roll', sales: 97, stock: 127580420, category: 'Sourdough@gmail.com', tag: '' },
  { id: 5, name: 'Panettone', sales: 56, stock: 789313762, category: 'Sourdough@gmail.com', tag: 'Done' },
  { id: 6, name: 'Saffron Bun', sales: 98, stock: 129074548, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 7, name: 'Ruisreikäleipä', sales: 45, stock: 904716276, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 8, name: 'Rúgbrauð', sales: 80, stock: 797307649, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 9, name: 'Yeast Karavai', sales: 34, stock: 680078801, category: 'Multigrain@gmail.com', tag: '' },
  { id: 10, name: 'Brioche', sales: 33, stock: 378937746, category: 'Sourdough@gmail.com', tag: '' },
  { id: 11, name: 'Pullman Loaf', sales: 45, stock: 461638720, category: 'Multigrain@gmail.com', tag: '' },
  { id: 12, name: 'Soda Bread', sales: 11, stock: 348536477, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 13, name: 'Barmbrack', sales: 85, stock: 591276986, category: 'Sourdough@gmail.com', tag: '' },
  { id: 14, name: 'Buccellato di Lucca', sales: 12, stock: 980925057, category: 'Multigrain@gmail.com', tag: '' },
  { id: 15, name: 'Toast Bread', sales: 21, stock: 220171422, category: 'Multigrain@gmail.com', tag: '' },
  { id: 16, name: 'Cheesymite Scroll', sales: 45, stock: 545847219, category: 'Sourdough@gmail.com', tag: '' },
  { id: 17, name: 'Baguette', sales: 45, stock: 553121944, category: 'Sourdough@gmail.com', tag: '' },
  { id: 18, name: 'Guernsey Gâche', sales: 19, stock: 371226430, category: 'Multigrain@gmail.com', tag: '' },
  { id: 19, name: 'Bazlama', sales: 85, stock: 384036275, category: 'Whole Wheat@gmail.com', tag: '' },
  { id: 20, name: 'Bolillo', sales: 33, stock: 484876903, category: 'Whole Wheat@gmail.com', tag: '' },
];

const Secciones = (props) => {
  const [value, setValue] = useState();
  const [materias, setMaterias] = useState();
  const [secciones, setSecciones] = useState();
  const [seccion, setSeccion] = useState([]);
  const { label, name, ...rest } = props;
  const initialValues = { email: '' };
  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, materia, seccionn, touched, errors } = formik;
  const { setSelectedMateria, setSelectedSeccionn } = useState(null);
  

  const docente  = '1-1828-0064';
  

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`http://localhost:8080/api/docentes_materias_secciones/DocenteAsignado/${docente}`);
      const resultsMaterias = []
      const resultsSecciones = []
      let contador = 0;
      // Store results in the results array
      data.forEach((val) => {
        resultsMaterias.forEach((dup) => {
          contador = 0;
          if (val.materia === dup.materia) {
            contador+=1;
          }
        })
        if (contador === 0)
        resultsMaterias.push({
          materia: val.materia,
          label: `${val.materia}`,
        });

      });
      data.forEach((val) => {
        resultsSecciones.push({
          seccion: val.seccion,
          materia: val.materia,
          label: `${val.seccion}`,
        });
      });
      // Update the options state
      setMaterias([ 
        ...resultsMaterias
      ])
      setSecciones([ 
        ...resultsSecciones
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);
  


  const handleMateria = (id) => {
    const dt = secciones.filter(x => x.materia === id.materia);
    setSeccion(dt);
  }


  const title = 'Mis Secciones';
  const description = 'Elearning Portal School Dashboard Page';

  const columns = React.useMemo(() => {
    return [
      { Header: 'Cédula', accessor: 'stock', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Nombre',
        accessor: 'name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
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
      { Header: 'Nota', accessor: 'sales', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Correo', accessor: 'category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Button variant="outline-primary">Nota</Button>;
        },
      },
    ];
  }, []);

  const [data, setData] = React.useState(dummyData);
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
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            {/* <BreadcrumbList items={breadcrumbs} /> */}
          </Col>
          {/* Title End */}
        </Row>
      </div>
      
      <Row className="row-cols-1 row-cols-lg-5 g-2 mb-5">
        <Col>
          <Card className="h-100">
            <Card.Body className="mb-5">
              <p className="text-primary heading mb-8">Materia</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={materias} 
                    value={materia} 
                    onChange={handleMateria} 
                    placeholder="Seleccione" 
                  />
                </Col>          
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
          <Card.Body className="mb-5">
              <p className="text-primary heading mb-8">Sección</p>
              <div className="d-flex flex-column flex-md-row flex-lg-column align-items-center mb-n5 justify-content-md-between justify-content-center text-center text-md-start text-lg-center">
                <Col xs="12" lg="12">
                  <Select classNamePrefix="react-select" 
                    options={seccion} 
                    value={seccionn} 
                    onChange={setSelectedSeccionn} 
                    placeholder="Seleccione" 
                  />
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Timetable End */}
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
              <h2 className="small-title">Estudiantes</h2>
              <NavLink to="/quiz/result" className="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small">
                <span className="align-bottom">Ver Todos</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
              </NavLink>
          </div>
          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch tableInstance={tableInstance} />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} /> <ControlsDelete tableInstance={tableInstance} />
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize tableInstance={tableInstance} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination tableInstance={tableInstance} />
              </Col>
            </Row>
          </div>
          <ModalAddEdit tableInstance={tableInstance} />
        </Col>
      </Row>
    </>
  );
};

export default Secciones;
