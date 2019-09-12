import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { Details } from '../../components/Activity';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PageHeader } from '../../components/PageHeader';
import ActivityStore from '../../stores/activityStore';

interface DetailsParams {
  id: string;
}

export const Detail: React.FC<RouteComponentProps<DetailsParams>> = observer(({match, history}) => {
  const activityStore = useContext(ActivityStore);
  const {currentActivity, loadActivity, loading} = activityStore;
  const handleCancel = () => {
    history.push('/activities');
  }
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loading || !currentActivity) {
    return <LoadingIndicator content="Loading activity..." />;
  }
  return (
    <Container className="detailsContainer">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <PageHeader as="h2">Details</PageHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Details activity={currentActivity} onCancel={handleCancel} />
        </Grid.Row>
      </Grid>
    </Container>
  );
});
