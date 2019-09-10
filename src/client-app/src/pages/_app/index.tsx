import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import ActivityStore from '../../stores/activityStore';
import { Dashboard } from '../dashboard';
import { Details } from '../details';
import { NewActivity } from '../newActivity';

const App:React.FC<RouteComponentProps> = observer(({location}) => {
  const activityStore = useContext(ActivityStore);
  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }
  return (    
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/activities" component={Dashboard} />
          <Route exact path="/activities/:id" component={Details} />
          <Route key={location.key} path={["/new",'/manage/:id']} component={NewActivity} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Fragment>    
  );
});

export default withRouter(App);