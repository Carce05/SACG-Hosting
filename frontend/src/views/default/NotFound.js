import React from 'react';
import { NavLink } from 'react-router-dom';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';

const NotFound = () => {
  const title = '404 Not Found';
  const description = '404 Not Found Page';

  const rightSide = (
    <div className="sw-lg-80 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-60 px-5">
        <div className="sh-11">
          <NavLink to="/">
          <img src="/img/logo/image2vector.svg" alt="Logo" width="75" height="75"/>
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">¡Parece que ha ocurrido un error!</h2>
          <h2 className="display-2 text-primary">404 Página no encontrada</h2>
        </div>
        <div className="mb-5">
        
          <br/>
          <p className="h6">
            Si crees que es un error, por favor comunicate con nosotros a traves de los siguientes canales de comunicación: 
            
          </p>
          <br/>
          <p>
          Correo electrónico:  lic.diurnodeguarari@mep.go.cr
          </p>
          <p>
          Teléfono: 2237-4033.
          </p>
        </div>
        <div>
          <NavLink to="/" className="btn btn-icon btn-icon-start btn-primary">
            <CsLineIcons icon="arrow-left" /> <span>Volver al Inicio</span>
          </NavLink>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage right={rightSide} />
    </>
  );
};

export default NotFound;
