import React from 'react';
import { StaticContext } from 'react-router';
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';
import {useAuth} from '../use-auth'

interface AppRouterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentFactory<any, any>,
  path: string,
  isPrivate: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any
}

const AppRoutes = ({component: Component, path, isPrivate, ...rest}: AppRouterProps): React.ReactElement => {
  const userDetails = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderRoute(isPrivate: boolean, props: JSX.IntrinsicAttributes | RouteComponentProps<any, StaticContext, unknown>) {
    if ( isPrivate && !Boolean(userDetails.user)) {
      return <Redirect to={{pathname: '/login'}} />
    } else {
      return <Component {...props} />;
      }
  }

  return (
    <Route
      path={path}
      render={props =>
        (renderRoute(isPrivate, props))
      }
      { ...rest }
    />
  )
};

export default AppRoutes;
