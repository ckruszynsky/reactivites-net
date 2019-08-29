import './styles.scss';

import React from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const ActivityList: React.FC<{
  activities: IActivity[],
  selectActivity:(id:string)=> void
}> = ({activities, selectActivity}) => (

    <Item.Group divided>
      {activities.map((activitiy: IActivity) => (
        <Item key={activitiy.id}>
          <Item.Content>
            <Item.Header as="a">{activitiy.title}</Item.Header>
            <Item.Meta>{activitiy.date}</Item.Meta>
            <Item.Description>
              <div>{activitiy.description}</div>
              <div>
                {activitiy.city}, {activitiy.venue}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button 
                  floated="right" 
                  content="View" 
                  color="blue" 
                  onClick={()=> selectActivity(activitiy.id)}/>
              <Label basic content="Category" />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>  
);
