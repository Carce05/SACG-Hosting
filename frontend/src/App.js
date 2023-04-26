import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';
import { useLogin } from 'hooks/useLogin';

const App = () => {
  if (localStorage.getItem('loginState') !== null) {
    const { currentUser = '' } = JSON.parse(localStorage.getItem('loginState'));
    const { onCheckLogin } = useLogin();
    const isLogged = onCheckLogin();
      const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogged, userRole: currentUser.role }), [isLogged, currentUser]);
      if(isLogged) {
        if (routes) {
          return (
            <Layout>
              <RouteIdentifier routes={routes} fallback={<Loading />} />
            </Layout>
          );
        }
      }
  }
  return <Redirect to="/login"/>;
};

export default App;