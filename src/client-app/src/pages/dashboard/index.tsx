import './styles.scss';

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { ActivityDetails } from '../../components/ActivityDetails';
import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import { IActivity } from '../../models';

export const Dashboard: React.FC<{ activities: IActivity[], 
  selectActivity: (id:string)=>void, 
  selectedActivity:IActivity|null}> = ({activities,selectActivity,selectedActivity}) => {
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
              <ActivityList activities={activities} selectActivity={selectActivity} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            { selectedActivity && <ActivityDetails activity={selectedActivity} />}
            <ActivityForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
