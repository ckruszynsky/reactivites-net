import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Activities } from '../../components/Activities';
import { Navbar } from '../../components/Navbar';
import { IActivity } from '../../models';

export const App: React.FC<{}> = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
     axios.get<IActivity[]>('http://localhost:5000/api/activities')
     .then(response => {
       setActivities(response.data);
     })
  },[]);

  return (
    <>
      <Navbar />
      <Activities activities={activities}></Activities>
    </>
  );
};

