import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';

import { NotFound } from '../../components/Errors';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import ActivityStore from '../../stores/activityStore';
import { Dashboard } from '../dashboard';
import { Detail } from '../detail';
import { Home } from '../home';
import { NewActivity } from '../newActivity';

const App: React.FC<RouteComponentProps> = observer(({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loading) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path="/" component={Home} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <Navbar />
          <Container className="appContainer">
            <Switch>
              <Route exact path="/activities" component={Dashboard} />
              <Route exact path="/activities/:id" component={Detail} />
              <Route key={location.key} path={["/new", '/manage/:id']} component={NewActivity} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
});

export default withRouter(App);