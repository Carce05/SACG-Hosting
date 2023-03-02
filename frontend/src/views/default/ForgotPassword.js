
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from "axios";
import { useFormik } from 'formik';
import React,  { useState } from 'react';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
// const bitacora = require ('...../backend/controllers/bitacora');

const ForgotPassword = () => {
  const title = 'Restablecer Contraseña';
  const description = 'Página para restablecer contraseña';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Se requiere el correo electrónico'),
  });
  const initialValues = { email: '' };
  const onSubmit = (values) => console.log('submit form', values);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleChange, values, touched, errors } = formik;

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/reset-password`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (ec) {
			if (
				ec.response &&
				ec.response.status >= 400 &&
				ec.response.status <= 500
			) {
				setError(ec.response.data.message);
				setMsg("Usuario no registrado en el sistema");

			}else{
        setError(ec.response.data.message);
        setMsg("Correo de reestablecimiento de contraseña enviado exitosamente");
      }
      
		}
	};

	
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
          <h2 className="cta-1 mb-0 text-primary">¿Olvidó su contraseña?</h2>
          <h2 className="cta-1 text-primary">¡Restablézcala aquí!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Por favor ingrese su correo electrónico, pronto recibirá un enlace para restablecer su contraseña.</p>

        </div>
        <div>
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="email"
					        placeholder="Email"
					        name="email"
					        onChange={(e) => setEmail(e.target.value)}
					        value={email}
					        required />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
              {error && <div className={formik.error_msg}>{error}</div>}
				      {msg && <div className={formik.success_msg}>{msg}</div>}  
            </div>
            <Button size="lg" type="submit">
              Enviar correo
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

export default ForgotPassword;
