import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';

import {Chat, Header, Info, Sidebar} from '../../components/Activity';
import {LoadingIndicator} from '../../components/LoadingIndicator';
import {RootStoreContext} from '../../stores/rootStore';

interface DetailsParams {
  id: string;
}

export const Detail: React.FC<RouteComponentProps<DetailsParams>> = observer(
  ({match,history}) => {
    const rootStore = useContext(RootStoreContext);
    const { currentActivity, loadActivity, loading } = rootStore.activityStore;

    useEffect(() => {
      loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history]);
  

    if (loading) {
      return <LoadingIndicator content="Loading activity..." />;
    }

    if(!currentActivity){
      return <h2>Activity not found.</h2>
    }

    return (
      <Container className="detailsContainer">
        <Grid>
          <Grid.Column width={10}>
            <Header activity={currentActivity} />
            <Info activity={currentActivity} />
            <Chat  />
          </Grid.Column>
          <Grid.Column width={6}>
            <Sidebar attendees={currentActivity.attendees} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
);
