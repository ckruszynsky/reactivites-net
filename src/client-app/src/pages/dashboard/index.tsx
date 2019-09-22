import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import { List } from '../../components/Activity';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PageHeader } from '../../components/PageHeader';
import { RootStoreContext } from '../../stores/rootStore';

export const Dashboard = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities,loading} = rootStore.activityStore;
  const {activitiesByDate} = rootStore.activityStore;
 
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }

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
            <List activities={activitiesByDate} />
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Filters</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
