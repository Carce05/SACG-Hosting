import React, { useEffect, useState, Fragment } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from "axios";
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';

const ResetPassword = () => {
  const title = 'Reestablecer contraseña';
  const description = 'Pagina de reestablecimiento de contraseña';
  const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'La contraseña debe de tener al menos 6 caracteres').required('Contraseña requerida'),
    passwordConfirm: Yup.string()
      .required('Es necesario confirmar tu contraseña')
      .oneOf([Yup.ref('password'), null], 'Ambas contraseñas deben coincidir'),
  });
  const initialValues = { password: '', passwordConfirm: '' };
  const onSubmit = (values) => console.log('submit form', values);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {handleChange, values, touched, errors } = formik;


	const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

  
  useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (err) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/reset-password";
		} catch (ec) {
			if (
				ec.response &&
				ec.response.status >= 400 &&
				ec.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("Error al reestablcer contraseña");
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
          <h2 className="cta-1 mb-0 text-primary">¿Desea cambiar su contraseña?</h2>
          <h2 className="cta-1 text-primary">¡Restablézcala aquí!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Por favor ingrese su nueva contraseña</p>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled">
              <CsLineIcons icon="lock-off" />
              <Form.Control 							type="password"
							placeholder="Contraseña"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <div className="mb-3 filled">
              <CsLineIcons icon="lock-on" />
              <Form.Control type="password" name="passwordConfirm" onChange={handleChange} value={password} placeholder="Confirmar Contraseña" />
              {errors.passwordConfirm && touched.passwordConfirm && <div className="d-block invalid-tooltip">{errors.passwordConfirm}</div>}
            </div>
            <Button size="lg" type="submit">
              Reestablecer
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

export default ResetPassword;
