import * as React from 'react';
import { Route, Switch } from 'react-router';
import NavBar from '../components/NavBar';
import Counter from '../pages/Counter';
import Hello from '../pages/Hello';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NoMatch from '../pages/NoMatch';
import Signup from '../pages/Signup';
import { OnlyNotAuthenticated, PrivateRoute } from './private-route';

const routes = (
  <div>
    <NavBar />
    <Switch>      
      <Route exact={true} path="/" component={Home} />
      <OnlyNotAuthenticated path="/login" exact={true} component={Login} />
      <Route exact={true} path="/signup" component={Signup} />
      {/* <PrivateRoute path="/users" exact={true} component={Users} />
      <PrivateRoute path="/users/edit/:id" exact={true} component={SingleUser} />
      <PrivateRoute path="/users/create" exact={true} component={SingleUser} /> */}
      <PrivateRoute exact={true} path="/hello" component={Hello} />
      <PrivateRoute exact={true} path="/counter" component={Counter} />
      <PrivateRoute exact={true} path="/dashboard" component={() => <p>im dashboard</p>} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
