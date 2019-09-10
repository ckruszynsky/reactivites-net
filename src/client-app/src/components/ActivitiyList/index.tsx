import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';
import ActivityStore from '../../stores/activityStore';

export const ActivityList = observer(() => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, selectActivity, deleteActivity, submitting, target } = activityStore;
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
                as={Link}
                to={`/activities/${activity.id}`}
                floated="right"
                content="View"
                color="blue"
               />
              <Button
                name={activity.id}
                floated="right"
                content="Delete"
                color="red"
                onClick={evt => deleteActivity(evt, activity.id)}
                loading={target === activity.id && submitting}
              />
              <Label basic content={activity.category} />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
});
