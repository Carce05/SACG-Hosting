import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useSelector } from 'react-redux';

import axios from "axios";

const SelectorEstudiante = (props) => {
  const [options, setOptions] = useState();

  const title = 'Seleccionar Estudiante';
  const description = 'Página para seleccionar un estudiante a cargo';

  const { currentUser, isLogin } = useSelector((state) => state.auth);

  // const usuario  = userInfo?.email;
  const usuario  = currentUser.email;

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`);
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          value: value.cedula,
          label: `${value.nombre} ${value.apellido} ( ${value.cedula} )`,
        });
      });
      // Update the options state
      setOptions([ 
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);

  const { label, name, ...rest } = props;

  const initialValues = { email: '' };

  const formik = useFormik({ initialValues });
  const { handleSubmit, handleChange, option, touched, errors } = formik;
  const { setSelectedOption } = useState(null);

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-60">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Bienvenido al Sistema Academico</h1>
            <h1 className="display-3 text-white">del Liceo Diurno de Guararí</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
          Ven y sigue formado parte de la Familia del Liceo Diurno de Guararí.
            Consultas al correo: lic.diurnodeguarari@mep.go.cr   
            Teléfono: 2237-4033
          </p>
          {/* <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
          <img src="/img/logo/image2vector.svg" alt="Logo" width="75" height="75"/>
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Seleccione su estudiante a cargo para ingresar al sistema.</h2>          
        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Select classNamePrefix="react-select" 
                    options={options} 
                    value={option} 
                    onChange={setSelectedOption} 
                    placeholder="Seleccione" 
              />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <Button size="lg" type="submit">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default SelectorEstudiante;
