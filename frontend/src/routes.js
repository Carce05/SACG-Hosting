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
        { path: '/elearning', label: 'menu.elearning', icon: 'home', component: dashboards.elearning },
        { path: '/perfil', label: 'menu.perfil', icon: 'user', component: dashboards.perfil }
      
        
        
        
      ],
    },
    {
      path: `${appRoot}/dashboards`,
      icon: 'news',
      label: 'menu.matricular-modulo',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [
        { path: '/matricula', label: 'menu.matricula', icon : 'content',  component: dashboards.matricula },
        { path: '/estudiantes', label: 'menu.estudiantes', icon : 'clock',  component: dashboards.estudiantes },
      ],
    },

    {
      path: `${appRoot}/dashboards`,
      icon: 'book',
      label: 'menu.notas',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [
        { path: '/calificacion', label: 'menu.calificacion', icon: 'note', component: dashboards.calificacion },
        { path: '/secciones-admin', label: 'menu.admin_secciones', icon: 'folders', component: dashboards.adminSecciones },
        { path: '/secciones', label: 'menu.secciones', icon: 'folders', component: dashboards.secciones },
      ],
    },

    {
      path: `${appRoot}/dashboards`,
      icon: 'shield',
      label: 'menu.admin',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [

        { path: '/avisos', label: 'menu.avisos', icon: 'notification', component: dashboards.avisos },
        { path: '/usuarios', label: 'menu.usuarios', icon : 'user', component: dashboards.usuarios }
        
      ],
    },

    


    { path: '/contacto', label: 'menu.contacto', icon: 'phone', component: dashboards.contacto },

  ],
  sidebarItems: [],
  footerItems: [
    { path: '/contacto', label: 'menu.contacto', icon: 'phone', component: dashboards.contacto },
  ],
};
export default routesAndMenuItems;