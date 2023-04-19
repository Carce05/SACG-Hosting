import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Card, Figure, Modal } from 'react-bootstrap';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, RADIUS, THEME_COLOR } from 'constants.js';
import { menuChangeBehaviour } from 'layout/nav/main-menu/menuSlice';
import { settingsChangeColor, settingsChangeLayout, settingsChangeNavColor, settingsChangeRadius } from 'settings/settingsSlice';

const OptionGroup = ({ label = '', children, noContainer = false }) => (
  <div className="mb-5">
    <label className="mb-3 d-inline-block">{label}</label>
    {noContainer ? children : <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">{children}</div>}
  </div>
);
const OptionItem = ({ label = '', className = 'w-50', active = false, onClick = () => {}, children }) => (
  <div onClick={onClick} className={classNames('cursor-pointer flex-grow-1 option col', className, { active })}>
    {children}
    <div className="text-muted text-part">
      <span className="text-extra-small align-middle">{label}</span>
    </div>
  </div>
);

const SettingsModal = ({ handleClose, show = false }) => {
  const dispatch = useDispatch();
  const { color, layout, radius, navColor } = useSelector((state) => state.settings);
  const { behaviour } = useSelector((state) => state.menu);

  const handleChange = (action, payload) => {
    dispatch(action(payload));
  };

  return (
    <>
      <Modal
        show={show}
        id="settings"
        onHide={handleClose}
        className="modal-right scroll-out-negative"
        dialogClassName="full"
        aria-labelledby="settings"
        tabIndex="-1"
        scrollable
      >
        <Modal.Header>
          <Modal.Title as="h5">Ajustes de Tema</Modal.Title>
          <button type="button" className="btn-close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">
            <OptionGroup label="COLOR GENERAL" noContainer>
              <>
                <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                  <OptionItem
                    label="AZUL CLARO"
                    active={color === THEME_COLOR.LightBlue}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightBlue)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="blue-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem label="AZUL OSCURO" active={color === THEME_COLOR.DarkBlue} onClick={() => handleChange(settingsChangeColor, THEME_COLOR.DarkBlue)}>
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="blue-dark" />
                    </Card>
                  </OptionItem>
                </div>
                <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                  <OptionItem
                    label="VERDE CLARO"
                    active={color === THEME_COLOR.LightGreen}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightGreen)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="green-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem
                    label="VERDE OSCURO"
                    active={color === THEME_COLOR.DarkGreen}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.DarkGreen)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="green-dark" />
                    </Card>
                  </OptionItem>
                </div>
                <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                  <OptionItem
                    label="ROSA CLARO"
                    active={color === THEME_COLOR.LightPink}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightPink)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="pink-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem label="ROSA OSCURO" active={color === THEME_COLOR.DarkPink} onClick={() => handleChange(settingsChangeColor, THEME_COLOR.DarkPink)}>
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="pink-dark" />
                    </Card>
                  </OptionItem>
                </div>
                <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                  <OptionItem
                    label="PURPURA CLARO"
                    className="w-50"
                    active={color === THEME_COLOR.LightPurple}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightPurple)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="purple-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem
                    label="PURPURA CLARO"
                    active={color === THEME_COLOR.DarkPurple}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.DarkPurple)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="purple-dark" />
                    </Card>
                  </OptionItem>
                </div>
                <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                  <OptionItem label="ROJO CLARO" active={color === THEME_COLOR.LightRed} onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightRed)}>
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="red-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem label="ROJO OSCURO" active={color === THEME_COLOR.DarkRed} onClick={() => handleChange(settingsChangeColor, THEME_COLOR.DarkRed)}>
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="red-dark" />
                    </Card>
                  </OptionItem>
                </div>
              </>
            </OptionGroup>
            <OptionGroup label="COLOR DEL MENÚ">
              <>
                <OptionItem
                  label="BASICO"
                  className="w-33"
                  active={navColor === NAV_COLOR.Default}
                  onClick={() => handleChange(settingsChangeNavColor, NAV_COLOR.Default)}
                >
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
                <OptionItem
                  label="CLARO"
                  className="w-33"
                  active={navColor === NAV_COLOR.Light}
                  onClick={() => handleChange(settingsChangeNavColor, NAV_COLOR.Light)}
                >
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary figure-light top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
                <OptionItem
                  label="OSCURO"
                  className="w-33"
                  active={navColor === NAV_COLOR.Dark}
                  onClick={() => handleChange(settingsChangeNavColor, NAV_COLOR.Dark)}
                >
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary figure-dark top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
              </>
            </OptionGroup>
            <OptionGroup label="COMPORTAMIENTO DEL MENÚ">
              <>
                <OptionItem
                  label="ANCLADO"
                  active={behaviour === MENU_BEHAVIOUR.Pinned}
                  onClick={() => handleChange(menuChangeBehaviour, MENU_BEHAVIOUR.Pinned)}
                >
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary left large" />
                    <Figure className="figure-secondary right small" />
                  </Card>
                </OptionItem>
                <OptionItem
                  label="DESANCLADO"
                  active={behaviour === MENU_BEHAVIOUR.Unpinned}
                  onClick={() => handleChange(menuChangeBehaviour, MENU_BEHAVIOUR.Unpinned)}
                >
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary left" />
                    <Figure className="figure-secondary right small" />
                  </Card>
                </OptionItem>
              </>
            </OptionGroup>
            <OptionGroup label="VISTAS">
              <>
                <OptionItem label="FLUIDA" active={layout === LAYOUT.Fluid} onClick={() => handleChange(settingsChangeLayout, LAYOUT.Fluid)}>
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
                <OptionItem label="ENMARCADA" active={layout === LAYOUT.Boxed} onClick={() => handleChange(settingsChangeLayout, LAYOUT.Boxed)}>
                  <Card className="rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom small" />
                  </Card>
                </OptionItem>
              </>
            </OptionGroup>
            <OptionGroup label="BORDES">
              <>
                <OptionItem
                  label="CIRCULAR"
                  className="w-33"
                  active={radius === RADIUS.Rounded}
                  onClick={() => handleChange(settingsChangeRadius, RADIUS.Rounded)}
                >
                  <Card className="radius-rounded rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
                <OptionItem
                  label="NORMAL"
                  className="w-33"
                  active={radius === RADIUS.Standard}
                  onClick={() => handleChange(settingsChangeRadius, RADIUS.Standard)}
                >
                  <Card className="radius-regular rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
                <OptionItem label="PLANO" active={radius === RADIUS.Flat} onClick={() => handleChange(settingsChangeRadius, RADIUS.Flat)}>
                  <Card className="radius-flat rounded-md p-3 mb-1 no-shadow">
                    <Figure className="figure-primary top" />
                    <Figure className="figure-secondary bottom" />
                  </Card>
                </OptionItem>
              </>
            </OptionGroup>
          </OverlayScrollbarsComponent>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettingsModal;
