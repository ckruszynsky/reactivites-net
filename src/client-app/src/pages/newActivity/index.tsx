import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router';
import {Container, Grid} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';

import {ActivityForm} from '../../components/Activity';
import {PageHeader} from '../../components/PageHeader';
import {ActivityFormValues, IActivityFormValues, IAttendee} from '../../models';
import {RootStoreContext} from '../../stores/rootStore';

interface DetailParams {
  id: string;
}
export const NewActivity: React.FC<RouteComponentProps<DetailParams>> = observer(
  ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {
      submitting,
      loadActivity,
      createActivity,
      editActivity,
    } = rootStore.activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>(new ActivityFormValues());
    const [loading,setloading] = useState(false);
    useEffect(() => {
      if (match.params.id) {
        setloading(true);
        loadActivity(match.params.id).then(
          (activity) => {
            setActivity(new ActivityFormValues(activity!))
          }
        ).finally(()=> setloading(false));
      }
    }, [loadActivity, match.params.id]);

    const onSubmit = (activity:IActivityFormValues) => {
      if (!activity.id) {
        let newActivity = {
          id: uuid(),
          title: activity.title!,
          category:activity.category!,
          description:activity.description!,
          date: activity.date!,
          city: activity.city!,
          venue: activity.venue!,
          attendees:new Array<IAttendee>()
        };
        createActivity(newActivity);
      } else {
        let editedActivity = {
          id: activity.id!,
          title: activity.title!,
          category:activity.category!,
          description:activity.description!,
          date: activity.date!,
          city: activity.city!,
          venue: activity.venue!,
          attendees:activity.attendees!
        }
        editActivity(editedActivity);  
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
                  loading={loading}
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
