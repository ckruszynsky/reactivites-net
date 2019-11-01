import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';

import {Chat, Header, Info, Sidebar} from '../../components/Activity';
import {LoadingIndicator} from '../../components/LoadingIndicator';
import {RootStoreContext} from '../../stores/rootStore';

interface DetailsParams {
  id: string;
}

export const Detail: React.FC<RouteComponentProps<DetailsParams>> = observer(
  ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {
      loadActivity, 
      loading, 
      cancelAttendance, 
      attendActivity, 
      processing, 
      addComment,
      createHubConnection,
      stopHubConnection} = rootStore.activityStore;
    const [activity, setActivity] = useState();

    useEffect(() => {
      createHubConnection();
      
      loadActivity(match.params.id).then(act => setActivity(act));
      return () => { stopHubConnection(); }
    },[createHubConnection,stopHubConnection,loadActivity,match.params.id]);

    if (loading || !activity) {
      return <LoadingIndicator content="Loading activity..." />;
    }

    return (
      <Container className="detailsContainer">
        <Grid>
          <Grid.Column width={10}>
            <Header activity={activity}
              onCancelAttendance={cancelAttendance}
              onAttendActivity={attendActivity}
              loading={processing}
            />
            <Info activity={activity} />
            <Chat activity={activity} addComment={addComment}  />
          </Grid.Column>
          <Grid.Column width={6}>
            <Sidebar attendees={activity.attendees} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
);
