import './styles.scss';

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { ActivityList } from '../ActivitiyList';
import { ActivityDetails } from '../ActivityDetails';

export const ActivitiesSection: React.FC<{ activities: IActivity[] }> = props => {
  return (
    <Container className="activityContainer">
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <ActivityList activities={props.activities} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetails />
        </Grid.Column>
      </Grid>
    </Container>
  );
};
