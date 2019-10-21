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
  ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const {loadActivity, loading, cancelAttendance,attendActivity } = rootStore.activityStore;
    const [activity,setActivity] = useState();

    useEffect(() => {
      loadActivity(match.params.id).then(act => setActivity(act));
    }, [loadActivity, match.params.id]);

    if (loading || !activity) {
      return <LoadingIndicator content="Loading activity..." />;
    }

    return (
      <Container className="detailsContainer">
        <Grid>
          <Grid.Column width={10}>
            <Header activity={activity} onCancelAttendance={cancelAttendance} 
              onAttendActivity={attendActivity} 
              />
            <Info activity={activity} />
            <Chat activity={activity} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Sidebar attendees={activity.attendees} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
);
