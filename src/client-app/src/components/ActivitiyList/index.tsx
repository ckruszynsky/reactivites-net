import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useContext } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';
import ActivityStore from '../../stores/activityStore';

export interface ActivityListProps {
  onDeleteActivity: (evt: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
};

export const ActivityList = observer((props:ActivityListProps) => {
  const activityStore =useContext(ActivityStore);
  const {activitiesByDate, selectActivity} = activityStore;
  return (
  <Item.Group divided>
    {activitiesByDate.map((activity: IActivity) => (
      <Item key={activity.id}>
        <Item.Content>
          <Item.Header as="a">{activity.title}</Item.Header>
          <Item.Meta>{activity.date}</Item.Meta>
          <Item.Description>
            <div>{activity.description}</div>
            <div>
              {activity.city}, {activity.venue}
            </div>
          </Item.Description>
          <Item.Extra>
            <Button
              floated="right"
              content="View"
              color="blue"
              onClick={() => selectActivity(activity.id)}
            />
            <Button
              name={activity.id}
              floated="right"
              content="Delete"
              color="red"
              onClick={evt => props.onDeleteActivity(evt, activity.id)}
              loading={props.target === activity.id && props.submitting}
            />
            <Label basic content={activity.category} />
          </Item.Extra>
        </Item.Content>
      </Item>
    ))}
  </Item.Group>);
});
