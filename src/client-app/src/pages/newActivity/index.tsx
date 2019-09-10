import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { ActivityForm } from '../../components/ActivityForm';
import { PageHeader } from '../../components/PageHeader';
import { IActivity } from '../../models';
import ActivityStore from '../../stores/activityStore';

interface DetailParams {
  id: string;
}
export const NewActivity: React.FC<RouteComponentProps<DetailParams>> = observer(
  ({ match }) => {
    const activityStore = useContext(ActivityStore);
    const {
      currentActivity: initialFormState,
      submitting,
      loadActivity,
      cancelFormOpen,
      createActivity,
      editActivity,
      clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: ""
    });

    useEffect(() => {
      if (match.params.id) {
        loadActivity(match.params.id).then(
          () => initialFormState && setActivity(initialFormState)
        );
      }
      return () => {
        clearActivity();
      };
    }, [loadActivity, clearActivity, match.params.id, initialFormState]);

    const onInputChange = (
      event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = event.currentTarget;
      setActivity({ ...activity, [name]: value });
    };

    const onSubmit = () => {
      if (activity.id.length === 0) {
        let newActivity = { ...activity, id: uuid() };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    };
    return (
      <Container className="newActivityContainer">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <PageHeader as="h2">
                {activity.id && `Edit Activity`}
                {!activity.id && `New Activity`}
              </PageHeader>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {activity && (
                <ActivityForm
                  activity={activity}
                  handleInputChange={onInputChange}
                  handleSubmit={onSubmit}
                  isSubmitting={submitting}
                  handleCancel={cancelFormOpen}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
);
