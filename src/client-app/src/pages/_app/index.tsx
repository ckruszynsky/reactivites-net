import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import ActivityStore from '../../stores/activityStore';
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
    <Fragment>
      <Navbar />
      <Route path='/activities' component={Dashboard} />
      <Route path='/activities/:id' component={Details} />
      <Route path='/new' component={NewActivity} />
      <Route exact path='/' component={Dashboard} />
    
    </Fragment>
  );
});
