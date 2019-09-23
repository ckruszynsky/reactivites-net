import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {Fragment, useContext} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import {ToastContainer} from 'react-toastify';
import {Container} from 'semantic-ui-react';

import {NotFound} from '../../components/Errors';
import {Navbar} from '../../components/Navbar';
import {RootStoreContext} from '../../stores/rootStore';
import {Dashboard} from '../dashboard';
import {Detail} from '../detail';
import {Home} from '../home';
import {Login} from '../login';
import {NewActivity} from '../newActivity';

const App: React.FC<RouteComponentProps> = observer(({location}) => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user, logout} = rootStore.userStore;

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path="/" component={Home} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <Navbar isLoggedIn={isLoggedIn} user={user} logout={logout} />
          <Container className="appContainer">
            <Switch>
              <Route exact path="/activities" component={Dashboard} />
              <Route exact path="/activities/:id" component={Detail} />
              <Route key={location.key} path={["/new", '/manage/:id']} component={NewActivity} />
              <Route path={'/login'} component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
});

export default withRouter(App);