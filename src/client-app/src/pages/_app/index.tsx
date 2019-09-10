import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import ActivityStore from '../../stores/activityStore';
import { Route, Router, Switch } from '../../util/router';
import { Dashboard } from '../dashboard';
import { Details } from '../details';
import { NewActivity } from '../newActivity';

export const App = observer(() => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/activities" component={Dashboard} />
          <Route exact path="/activities/:id" component={Details} />
          <Route path="/new" component={NewActivity} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Fragment>
    </Router>
  );
});
