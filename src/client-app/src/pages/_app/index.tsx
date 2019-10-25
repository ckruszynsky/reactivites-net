import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {Fragment, useContext, useEffect} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import {ToastContainer} from 'react-toastify';
import {Container} from 'semantic-ui-react';

import {NotFound} from '../../components/Errors';
import {LoadingIndicator} from '../../components/LoadingIndicator';
import {ModalContainer} from '../../components/Modal/ModalContainer';
import {Navbar} from '../../components/Navbar';
import {RootStoreContext} from '../../stores/rootStore';
import {Dashboard} from '../dashboard';
import {Detail} from '../detail';
import {Home} from '../home';
import {NewActivity} from '../newActivity';
import {Profile} from '../profiles';

const App: React.FC<RouteComponentProps> = observer(({location}) => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user, logout, getUser} = rootStore.userStore;
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;


  //check to see if we have a token, and if we do 
  //then we will go and fetch the user from our api
  //and if we don't then we just set the app loaded
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingIndicator content='Loading Application' />

  return (
    <Fragment>
      <ModalContainer />
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
              <Route path={'/profile/:username'} component={Profile} />                         
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
});

export default withRouter(App);