import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import { ActivitiesSection } from '../../components/ActivitiesSection';
import { Navbar } from '../../components/Navbar';
import { IActivity } from '../../models';

export const App: React.FC<{}> = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <ActivitiesSection activities={activities} />
    </Fragment>
  );
};
