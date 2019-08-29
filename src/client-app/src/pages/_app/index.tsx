import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import { Navbar } from '../../components/Navbar';
import { IActivity } from '../../models';
import { Dashboard } from '../dashboard';

export const App: React.FC<{}> = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity|null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id:string):void => {    
    setSelectedActivity(activities.filter(a=> a.id === id)[0]);
  }

  const handleResetSelectedActivity= ():void => {
    setSelectedActivity(null);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
  
  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />
      <Dashboard activities={activities} 
          onSelectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          onResetSelectedActivity={handleResetSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}/>
    </Fragment>
  );
};
