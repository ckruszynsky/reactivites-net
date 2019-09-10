import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { ActivityDetails } from '../../components/ActivityDetails';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import ActivityStore from '../../stores/activityStore';

interface DetailsParams {
  id: string;
}

export const Details: React.FC<RouteComponentProps<DetailsParams>> = observer(({ match }) => {
  const activityStore = useContext(ActivityStore);
  const { currentActivity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);

  if (loadingInitial || !currentActivity) {
    return <LoadingIndicator content="Loading activity..." />;
  }
  return (
    <Container className="detailsContainer">
      <ActivityDetails activity={currentActivity} />
    </Container>
  );
});
