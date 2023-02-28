import React, { useMemo } from 'react';
import { Redirect } from "react-router-dom";

// import redux for auth guard
import { useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

const App = () => { 
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);
  if(isLogin) {
    if (routes) {
      return (
        <Layout>
          <RouteIdentifier routes={routes} fallback={<Loading />} />
        </Layout>
      );
    }
  }
  return <Redirect to="/login"/>;
};

export default App;
