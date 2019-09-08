import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useContext } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ActivityList } from '../../components/ActivitiyList';
import { ActivityDetails } from '../../components/ActivityDetails';
import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import { IActivity } from '../../models';
import ActivityStore from '../../stores/activityStore';

export interface IDashboardProps{  
    activities: IActivity[];
    onSelectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    onResetSelectedActivity: () => void;
    onEditActivity: (activity: IActivity) => void;
    onDeleteActivity: (evt:SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target:string;  
}

export const Dashboard = observer((props:IDashboardProps) => {
  const activityStore = useContext(ActivityStore);
  const {editMode, selectedActivity} = activityStore;
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
                onDeleteActivity={props.onDeleteActivity}
                submitting={props.submitting}
                target={props.target}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            {selectedActivity && !editMode && (
              <ActivityDetails
                onSetEditMode={props.setEditMode}
                onResetSelectedActivity={props.onResetSelectedActivity}
              />
            )}

            {editMode && (
              <ActivityForm
                key={(selectedActivity && selectedActivity.id) || 0}
                activity={selectedActivity}
                onSetEditMode={props.setEditMode}
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
