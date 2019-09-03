import './styles.scss';

import React from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const ActivityList: React.FC<{
  activities: IActivity[],
  onSelectActivity: (id: string) => void,
  onDeleteActivity: (id: string) => void,
  submitting:boolean
}> = ({activities, onSelectActivity, onDeleteActivity, submitting}) => (

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
              onClick={() => onSelectActivity(activitiy.id)}
              loading={submitting} />
            <Button
              floated="right"
              content="Delete"
              color="red"
              onClick={() => onDeleteActivity(activitiy.id)}
              loading={submitting} />
            <Label basic content={activitiy.category} />
          </Item.Extra>
        </Item.Content>
      </Item>
    ))}
  </Item.Group>
);
