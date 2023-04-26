import React, { useEffect, useMemo} from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getFooterItems } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import classNames from 'classnames';
import MainMenuItems from '../nav/main-menu/MainMenuItems';

const Footer = () => {
  const year = new Date().getFullYear();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
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

  return (
    <footer>
      <div className="footer-content">
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <p className="mb-0 text-muted text-medium">Liceo de Guararí {year} </p> 
            </Col>
            <Col sm="6" className="d-none d-sm-block">
              <Breadcrumb className="pt-0 pe-0 mb-0 float-end">
                <MainMenuItems menuItems={footerItemsMemo} menuPlacement={placementStatus.view} />
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
