import React from 'react';
import { List } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const Activities: React.FC<{
  activities: IActivity[];
}> = props => (
  <List>
    {props.activities.map((activitiy: IActivity) => (
      <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
    ))}
  </List>
);
