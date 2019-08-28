import './styles.scss';

import React from 'react';
import { Container, List } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const Activities: React.FC<{
  activities: IActivity[];
}> = props => (
  <Container className="activityContainer">
  <List>
    {props.activities.map((activitiy: IActivity) => (
      <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
    ))}
  </List>
  </Container>
);
