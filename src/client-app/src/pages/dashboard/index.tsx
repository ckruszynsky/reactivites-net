import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { PageHeader } from '../../components/PageHeader';
import ActivityStore from '../../stores/activityStore';

export const Dashboard = observer(() => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,    
    deleteActivity,
    submitting,
    target
  } = activityStore;

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
              <ActivityList activities={activitiesByDate} 
              onDelete={deleteActivity}
              target={target}
              submitting={submitting} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Filters</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
