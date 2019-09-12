import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { Chat } from './Chat';
import { Header } from './Header';
import { Info } from './Info';
import { Sidebar } from './Sidebar';


export const Details:React.FC<{
  activity:IActivity;
  onCancel:()=> void;
}> = observer(({activity, onCancel}) => {
  
  return (
   <Grid>
     <Grid.Column width={10}>
      <Header />
      <Info />
      <Chat />
     </Grid.Column>
     <Grid.Column width={6}>
      <Sidebar />
     </Grid.Column>
   </Grid>
  );
});
