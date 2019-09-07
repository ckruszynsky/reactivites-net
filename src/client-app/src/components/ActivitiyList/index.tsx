import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';

export interface ActivityListProps {
  activities: IActivity[];
  onSelectActivity: (id: string) => void;
  onDeleteActivity: (evt: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
};

export const ActivityList = observer((props:ActivityListProps) => 
  <Item.Group divided>
    {props.activities.map((activity: IActivity) => (
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
              onClick={() => props.onSelectActivity(activity.id)}
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
  </Item.Group>
);
