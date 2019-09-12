import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { Chat, Header, Info, Sidebar } from '../../components/Activity';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import ActivityStore from '../../stores/activityStore';

interface DetailsParams {
  id: string;
}

export const Detail: React.FC<RouteComponentProps<DetailsParams>> = observer(
  ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { currentActivity, loadActivity, loading } = activityStore;

    const handleCancel = () => {
      history.push("/activities");
    };
    useEffect(() => {
      loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (loading || !currentActivity) {
      return <LoadingIndicator content="Loading activity..." />;
    }
    return (
      <Container className="detailsContainer">
        <Grid>
          <Grid.Column width={10}>
            <Header activity={currentActivity} />
            <Info activity={currentActivity} />
            <Chat activity={currentActivity} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Sidebar activity={currentActivity} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
);
