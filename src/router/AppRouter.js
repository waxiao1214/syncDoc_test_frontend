import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getToken } from '../functions/utils';
import Home from '../pages/Home';
import Login from '../pages/Login';

const routes = [
  { path: '/login', component: <Login /> },
  { path: '/', component: <Home /> }
]

export default function AppRouter() {
  const history = useHistory();
  const token = getToken();

  useEffect(() => {
    if(!token) history.push("/login")
  }, [token, history])
  return(
    <React.Fragment>
      {routes.map((route, key) => {
        return <Route 
          exact 
          path={route.path} 
          key={key}
        >
          {route.component}
        </Route>
      })}
    </React.Fragment>
  )
}