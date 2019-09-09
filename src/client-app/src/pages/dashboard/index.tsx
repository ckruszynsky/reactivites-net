import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useContext } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { ActivityDetails } from '../../components/ActivityDetails';
import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import ActivityStore from '../../stores/activityStore';

export interface IDashboardProps {
  setEditMode: (editMode: boolean) => void;
  onDeleteActivity: (evt: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
  submitting: boolean;
}

export const Dashboard = observer((props: IDashboardProps) => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
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
              <ActivityList
                submitting={props.submitting}
                onDeleteActivity={props.onDeleteActivity}
                target={props.target}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            {selectedActivity && !editMode && <ActivityDetails />}

            {editMode && (
              <ActivityForm
                key={(selectedActivity && selectedActivity.id) || 0}
                activity={selectedActivity}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
