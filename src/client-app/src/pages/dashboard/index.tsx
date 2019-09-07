import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { ActivityDetails } from '../../components/ActivityDetails';
import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import { IActivity } from '../../models';

export interface IDashboardProps{  
    activities: IActivity[];
    onSelectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    onResetSelectedActivity: () => void;
    onCreateActivity: (activity: IActivity) => void;
    onEditActivity: (activity: IActivity) => void;
    onDeleteActivity: (evt:SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target:string;  
}

export const Dashboard = observer((props:IDashboardProps) => {
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
                activities={props.activities}
                onSelectActivity={props.onSelectActivity}
                onDeleteActivity={props.onDeleteActivity}
                submitting={props.submitting}
                target={props.target}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            {props.selectedActivity && !props.editMode && (
              <ActivityDetails
                activity={props.selectedActivity}
                onSetEditMode={props.setEditMode}
                onResetSelectedActivity={props.onResetSelectedActivity}
              />
            )}

            {props.editMode && (
              <ActivityForm
                key={(props.selectedActivity && props.selectedActivity.id) || 0}
                activity={props.selectedActivity}
                onSetEditMode={props.setEditMode}
                onCreateActivity={props.onCreateActivity}
                onEditActivity={props.onEditActivity}
                submitting={props.submitting}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
