import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import ActivityStore from '../../stores/activityStore';
import { Dashboard } from '../dashboard';

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
      <Dashboard />
    </Fragment>
  );
});
