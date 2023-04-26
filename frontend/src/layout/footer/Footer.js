import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getFooterItems } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import classNames from 'classnames';
import MainMenuItems from '../nav/main-menu/MainMenuItems';
import axios from "axios";

const Footer = () => {
  const year = new Date().getFullYear();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const { attrMobile, useSidebar, placementStatus } = useSelector((state) => state.menu);
  useEffect(() => {
    document.documentElement.setAttribute('data-footer', 'true');
    return () => {
      document.documentElement.removeAttribute('data-footer');
    };
  }, []);

  const footerItemsMemo = useMemo(
    () =>
      getFooterItems({
        data: routesAndMenuItems.footerItems,
        isLogin,
        userRole: currentUser.role,
      }),
    [isLogin, currentUser, attrMobile, useSidebar]
  );
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/general/643f20fe9a24456baf1c57b1")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  return (
    <footer>
      <p className="mt-3 text-muted" style={{whiteSpace: 'nowrap'}}>Liceo Diurno de Guararí</p>
  <div className="footer-content d-flex flex-column justify-content-center mt-10">
    <div className="d-flex flex-row justify-content-between align-items-center">
      
      <div className="d-flex flex-row align-items-center">
        {data ? (
          <div key={data.id} className="d-flex flex-grow-1 me-3">
            <p className="mb-0 text-muted me-2">Periodo actual:</p>
            <p className="mb-0 text-muted ">{data.periodo}</p>
            <p className="mb-0 text-muted mx-2">del año:</p>
            <p className="mb-0 text-muted me-7">{data.anio}</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        
      </div>
    </div>
  </div>
  <Breadcrumb className="pt-0 pe-0 mb-0 float-end card-text mt-3" style={{whiteSpace: 'nowrap'}}>
          <MainMenuItems menuItems={footerItemsMemo} menuPlacement={placementStatus.view} />
        </Breadcrumb>
    </footer>
  );
};

export default React.memo(Footer);
