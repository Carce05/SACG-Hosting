import React, { useEffect, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

import HtmlHead from 'components/html-head/HtmlHead';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from 'auth/authSlice';
import { useLogin } from 'hooks/useLogin';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { onUserLogin, onCheckLogin } = useLogin();

  useEffect(() => {
    if(onCheckLogin()) {
      history.push("/dashboards");
    }
  }, [])

  const title = 'Inicio de Sesión';
  const description = 'Pagina de Inicio de Sesión';
  const [error, setError] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Se requiere la identificación'),
    password: Yup.string().min(6, 'Se debe de tener almenos 6 caracteres').required('Se requiere la contraseña'),
  });
  const initialValues = { email: '', password: '' };
  const onSubmit = async ({ email,password }) => {
    const rawResponse = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    

    const { status, usuario } = await rawResponse.json();

    if (status){
      setError(false);
      dispatch(setCurrentUser(usuario));
      history.push("/dashboards");
      onUserLogin(usuario)
    } else {
      setError(true);
    }
  } 

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

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
           <center>
            <img src="/img/logo/image2vector.svg" alt="Logo" width="75" height="75"/>
            </center>
          </NavLink>
        </div>
        <div className="mb-5">
          <center>
          <h2 className="cta-1 mb-0 text-primary">Sistema Acádemico</h2>
          <h2 className="cta-1 text-primary">Liceo Diurno de Guararí</h2>
          </center>
        </div>
        <div className="mb-5">
          <p className="h6">Por favor digita tus credenciales para iniciar sesión</p>
          
          {/* 
           <p className="h6"> 
            Si no tienes una cuenta creada, por favor <NavLink to="/register">registrate</NavLink> .
          </p>
        */}
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Correo" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Contraseña" />
              
              
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Restablecer
              </NavLink>
              
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
              
            </div>

            <Button size="lg" type="submit">
              Iniciar sesión
            </Button>

            <p className="h6"> </p>
            <p className="h6"> </p>
            <p className="h6">**En caso de no poseer una cuenta por favor contactar al administrador</p>
            {
              error && 'LOGIN INCORECTO'
            }
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

export default Login;
