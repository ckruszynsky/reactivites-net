import './styles.scss';

import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';

interface ActivityListProps {
  activities: IActivity[];
  onDelete: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
  submitting: boolean;
}
export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onDelete,
  target,
  submitting
}) => {
  return (
    <Item.Group divided>
      {activities.map((activity: IActivity) => (
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
                onClick={evt => onDelete(evt, activity.id)}
                loading={target === activity.id && submitting}
              />
              <Label basic content={activity.category} />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};
