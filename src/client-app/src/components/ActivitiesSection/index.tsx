import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { Activities } from '../Activities';

export const ActivitiesSection: React.FC<{ activities: IActivity[] }> = props => {
  return (
    <Container className="activityContainer">
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <Activities activities={props.activities} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
