import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { ActivityForm } from '../../components/Activity';
import { PageHeader } from '../../components/PageHeader';
import { IActivityFormValues } from '../../models';
import ActivityStore from '../../stores/activityStore';

interface DetailParams {
  id: string;
}
export const NewActivity: React.FC<RouteComponentProps<DetailParams>> = observer(
  ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {
      currentActivity: initialFormState,
      submitting,
      loadActivity,
      createActivity,
      editActivity,
      clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>({
      id: undefined,
      title: "",
      category: "",
      description: "",
      date:undefined,
      time:undefined,
      city: "",
      venue: ""
    });

    useEffect(() => {
      if (match.params.id && activity.id ) {
        loadActivity(match.params.id).then(
          () => initialFormState && setActivity(initialFormState)
        );
      }
      return () => {
        clearActivity();
      };
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id]);

    const onSubmit = () => {
      if (!activity.id) {
        let newActivity = {
          id: uuid(),
          title: activity.title!,
          category:activity.category!,
          description:activity.description!,
          date: activity.date!,
          city: activity.city!,
          venue: activity.venue!
        };
        createActivity(newActivity).then(() =>
          history.push(`/activities/${newActivity.id}`)
        );
      } else {
        let editedActivity = {
          id: activity.id!,
          title: activity.title!,
          category:activity.category!,
          description:activity.description!,
          date: activity.date!,
          city: activity.city!,
          venue: activity.venue!
        }
        editActivity(editedActivity).then(() => history.push(`/activities/${activity.id}`));
      }
    };

    const onCancel = () => {
      if (activity.id) {
        history.push(`/activities/${activity.id}`);
      } else {
        history.push('/activities');
      }
    }
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
            <Grid.Column width={10}>
              {activity && (
                <ActivityForm
                  activity={activity}
                  handleSubmit={onSubmit}
                  isSubmitting={submitting}
                  handleCancel={onCancel}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
);
