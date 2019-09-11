import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { ActivityChat } from '../ActivityChat';
import { ActivityHeader } from '../ActivityHeader';
import { ActivityInfo } from '../ActivityInfo';
import { ActivitySidebar } from '../ActivitySidebar';


export const ActivityDetails:React.FC<{
  activity:IActivity;
  onCancel:()=> void;
}> = observer(({activity, onCancel}) => {
  
  return (
   <Grid>
     <Grid.Column width={10}>
      <ActivityHeader />
      <ActivityInfo />
      <ActivityChat />
     </Grid.Column>
     <Grid.Column width={6}>
      <ActivitySidebar />
     </Grid.Column>
   </Grid>
  );
});
