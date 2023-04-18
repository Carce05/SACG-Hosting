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
          <Modal.Title as="h5">Colores del sistema</Modal.Title>
          <button type="button" className="btn-close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="scroll-track-visible">
            <OptionGroup label="Color" noContainer>
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
                    label="MORADO CLARO"
                    className="w-50"
                    active={color === THEME_COLOR.LightPurple}
                    onClick={() => handleChange(settingsChangeColor, THEME_COLOR.LightPurple)}
                  >
                    <Card className="rounded-md p-3 mb-1 no-shadow color">
                      <div className="purple-light" />
                    </Card>
                  </OptionItem>
                  <OptionItem
                    label="MORADO OSCURO"
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
          </OverlayScrollbarsComponent>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettingsModal;
