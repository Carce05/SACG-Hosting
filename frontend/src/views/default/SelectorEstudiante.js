import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import Select from 'react-select';
import { setCurrentUser } from 'auth/authSlice';
import AsyncSelect from 'react-select/async';

import axios from "axios";

const SelectorEstudiante = (props) => {
  const [options, setOptions] = useState([]);

  const title = 'Seleccionar Estudiante';
  const description = 'Página para seleccionar un estudiante a cargo';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Se requiere la identificación'),
  });

  const usuario  = 'mau@gmail.com';

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`);
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          value: value.cedula,
          label: value.nombre,
        });
      });
      // Update the options state
      setOptions([
        {value: 'Select a company', label: ''}, 
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);


  const { label, name, ...rest } = props;

  // console.log(options.nombre);

  const initialValues = { email: '' };

    /*
    const rawResponse = fetch(, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const estudiante = JSON.parse(rawResponse[0]);
    
    console.log(estudiante);
    // const nombre = estudiante.nombre;
    */
   
    /*
    const respuesta = async function ()  {
      const response = await fetch(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`)
  
      const data = await response.json()
  
      // const respuesta = JSON.parse(data);
      
       const nombre = data[0].nombre.toString();

      // console.log(data[0].nombre);
      return nombre;
  }

  let name = await respuesta();
  console.log(name);
  */

  // const resultado = llenar();
  // console.log(resultado);

  /*
  useEffect(() => {
    fetch(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`)
       .then((response) => response.json())
       .then((data) => {
          console.log(this.data);
          setValue(this.data);

       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
 */


/*
 useEffect(() => {
  const fetchata = async () => {

      const response = await fetch(
        `http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`);
         const data = await response.json();

         // use only 3 sample data
         setValue( data.slice( 0,1) )
     
  }

  // Call the function
  fetchata();
}, []);
*/


/*
 function callApi() {
  fetch(`http://localhost:8080/api/estudiantes/EstudiantesAsocidados/${usuario}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => console.log(data[0].nombre) ) // Displays the firstName from the API response
}
*/




  const estudiantes = [
    { value: '1-1828-0064', label: '' },
    { value: '1-1221-4354', label: 'Christopher Arce (1-1221-4354)' },
  ];


    
  



  const formik = useFormik({ initialValues, validationSchema });
  const { handleSubmit, values, touched, errors } = formik;

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
          <h2 className="cta-1 mb-0 text-primary">Seleccione su estudiante a cargo</h2>
          <h2 className="cta-1 text-primary">para ingresar al sistema.</h2>
        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Select classNamePrefix="react-select" 
                    options={options} 
                    value={Option} 
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
