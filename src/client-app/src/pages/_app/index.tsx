import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';

import agent from '../../api/agent';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import { IActivity } from '../../models';
import ActivityStore from '../../stores/activityStore';
import { Dashboard } from '../dashboard';

export const App = observer(()=> {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectActivity = (id: string): void => {
    setEditMode(false);
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleResetSelectedActivity = (): void => {
    setSelectedActivity(null);
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (evt: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(evt.currentTarget.name);

    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }
  return (
    <Fragment>
      <Navbar />
      <Dashboard
        activities={activityStore.activities}
        onSelectActivity={handleSelectActivity}
        onResetSelectedActivity={handleResetSelectedActivity}
        onEditActivity={handleEditActivity}
        onDeleteActivity={handleDeleteActivity}
        setEditMode={setEditMode}
        submitting={submitting}
        target={target}
      />
    </Fragment>
  );
});

