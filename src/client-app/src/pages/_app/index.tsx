import React, { Fragment, useEffect, useState } from 'react';

import agent from '../../api/agent';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Navbar } from '../../components/Navbar';
import { IActivity } from '../../models';
import { Dashboard } from '../dashboard';

export const App: React.FC<{}> = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string): void => {
    setEditMode(false);
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleResetSelectedActivity = (): void => {
    setSelectedActivity(null);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
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

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];

        response.forEach(act => {
          act.date = act.date.split(".")[0];
          activities.push(act);
        });

        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }
  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />
      <Dashboard
        activities={activities}
        onSelectActivity={handleSelectActivity}
        selectedActivity={selectedActivity}
        onResetSelectedActivity={handleResetSelectedActivity}
        onEditActivity={handleEditActivity}
        onCreateActivity={handleCreateActivity}
        onDeleteActivity={handleDeleteActivity}
        editMode={editMode}
        setEditMode={setEditMode}
        submitting={submitting}
      />
    </Fragment>
  );
};
