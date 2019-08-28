import './styles.scss';

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { ActivityDetails } from '../../components/ActivityDetails';
import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import { IActivity } from '../../models';

export const Dashboard: React.FC<{ activities: IActivity[] }> = props => {
  return (
    <Container className="dashboardContainer">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <PageHeader as="h2">Activity Dashboard</PageHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment clearing>
              <ActivityList activities={props.activities} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetails />
            <ActivityForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
