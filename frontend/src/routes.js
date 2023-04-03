/* eslint-disable */
import { lazy } from 'react';
// import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboards = {
  elearning: lazy(() => import('views/dashboards/ElearningDashboard')),
  secciones: lazy(() => import('views/dashboards/Secciones')),
  usuarios: lazy(() => import('views/dashboards/Usuarios')),
  estudiantes: lazy(() => import('views/dashboards/Estudiantes')),
  perfil: lazy(() => import('views/dashboards/ProfileSettings')),
  avisos: lazy(() => import('views/dashboards/Avisos')),
  calificacion: lazy(() => import('views/dashboards/Calificacion')),
  matricula: lazy(() => import('views/dashboards/AdminMatriculas')),
  adminSecciones : lazy(() => import('views/dashboards/AdminSecciones')),
  contacto: lazy(() => import('views/dashboards/Contacto'))

};
const footer = {
  contacto: lazy(() => import('views/dashboards/Contacto'))
}

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/login`,
    },
    {
      path: `${appRoot}/dashboards`,
      icon: 'home-garage',
      label: 'menu.dashboards',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [
        { path: '/elearning', label: 'menu.elearning', component: dashboards.elearning },
        { path: '/secciones', label: 'menu.secciones', component: dashboards.secciones },
        { path: '/usuarios', label: 'menu.usuarios', component: dashboards.usuarios },
        { path: '/estudiantes', label: 'menu.estudiantes', component: dashboards.estudiantes },
        { path: '/perfil', label: 'menu.perfil', component: dashboards.perfil },
        { path: '/avisos', label: 'menu.avisos', component: dashboards.avisos },
        { path: '/calificacion', label: 'menu.calificacion', component: dashboards.calificacion },
        { path: '/matricula', label: 'menu.matricula', component: dashboards.matricula },
        { path: '/secciones-admin', label: 'menu.admin_secciones', component: dashboards.adminSecciones },
        { path: '/contacto', label: 'menu.contacto', component: dashboards.contacto }
        
      ],
    },
  ],
  sidebarItems: [],
  footerItems: [
    {
      path: `${appRoot}/dashboards`,
      icon: 'home-garage',
      label: 'menu.dashboards',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/contacto`,
      subs: [
        { path: '/contacto', label: 'menu.contacto', component: dashboards.contacto },
      ],
    },
  ],
};
export default routesAndMenuItems;